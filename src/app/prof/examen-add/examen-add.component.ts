import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Choix } from 'src/app/Object/Choix';
import { ExamQuestion } from 'src/app/Object/ExamQuestion';
import { ExamTitre } from 'src/app/Object/ExamTitre';
import { DateFormate, DateToShortDate } from 'src/app/Object/Function';
import { Module } from 'src/app/Object/Module';
import { ModuleProfesseur } from 'src/app/Object/ModuleProfesseur';
import { QuestionType } from 'src/app/Object/QuestionType';
import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-examen-add',
  templateUrl: './examen-add.component.html',
  styleUrls: ['./examen-add.component.css']
})
export class ExamenAddComponent implements OnInit {

  constructor(private ProfService: ProfService) { }

  ngOnInit(): void {
    this.getModuleProf();
    this.getLastExam();
    this.GetQuestionType();
  }

  ProfesseurModule: ModuleProfesseur[] = [];
  module!: Module;
  examAdd: boolean = false;
  selectedModule!: ModuleProfesseur;
  titre!: string;
  id!: number;
  idType!: number;
  Duree!: Time;
  DateDiffusion!: Date;
  diffusion: string = "";
  heureDeb!: Time;
  Exam!: ExamTitre;
  QuestionT: QuestionType[] = [];
  choix: string = "";
  Question: string = "";
  index: number = 0;
  questionNumber: number = 1;
  choiceListe: string[] = [];
  choiceFound: boolean = false;
  validChoiceNumber: boolean = false;
  QuestionListe: ExamQuestion[] = [];
  lastQuestion!: ExamQuestion;
  selectedQuestion!: ExamQuestion;

  // Get Data function

  setModule() {
    const result = this.ProfesseurModule.find((item) => {
      return item.idprofesseurModule == this.id;
    });
    if (result) {
      this.selectedModule = result;
      this.module = result.idmodule;
    }
  }

  getModuleProf() {
    this.ProfService.getCours().subscribe(
      (res) => {
        this.ProfesseurModule = res;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
  getLastExam() {
    this.ProfService.getLastExam().subscribe(
      (res) => {
        this.Exam = res;
        this.Exam.diffusion = DateToShortDate(this.Exam.diffusion);
        this.diffusion = DateFormate(this.Exam.diffusion);
        this.examAdd = true;
      },
      (err) => {
        console.log(err.error);
      }
    )
  }
  // Action function

  AddExamTitre() {
    const exam = new ExamTitre(this.titre, this.Duree.toString(), this.heureDeb, this.Duree, this.selectedModule.idparcours, this.selectedModule.idprofesseur, this.selectedModule.idmodule, this.DateDiffusion, this.selectedModule.idniveau);
    this.ProfService.createExam(exam).subscribe(
      (res) => {
        this.examAdd = true;
        this.Exam = res;
      },
      (err) => {
        console.log(err.error);
      }
    )
  }
  GetQuestionType() {
    this.ProfService.getQuestionType().subscribe(
      (res) => {
        this.QuestionT = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  // Add Question function
  seType() {
    if (this.idType >= 2) {
      this.validChoiceNumber = false;
    }
    else {
      this.validChoiceNumber = true;
    }
  }


  addChoices(c: any) {
    this.choiceListe.push(this.choix);
    c.reset();
    if (this.choiceListe.length >= 2) {
      this.validChoiceNumber = true;
    }
  }

  findChoice() {
    const result = this.choiceListe.find((item) => {
      return this.choix == item;
    });
    if (result) {
      this.choiceFound = true;
    }
    else {
      this.choiceFound = false;
    }
  }
  removeChoice(choice: string) {
    this.choiceListe = this.choiceListe.filter((item) => {
      return item != choice;
    });
    if (this.choiceListe.length < 2) {
      this.validChoiceNumber = false;
    }
  }
  SaveChoice() {
    this.ProfService.Addchoice(this.choiceListe[this.index], this.lastQuestion).subscribe(
      (res) => {
        this.index = this.index + 1;
        if (this.index <= this.choiceListe.length - 1) {
          this.SaveChoice();
        }
        else {
          this.ProfService.GetlastQuestion(this.Exam).subscribe(
            (res) => {
              this.QuestionListe.push(res);
              this.choiceListe = [];
              this.index = 0;
            },
            (err) => {
              console.log(err.error);
            }
          )
        }
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
  AddQuestion(f: any) {
    const questionT: any = this.QuestionT.find((item) => {
      return item.idtype == this.idType;
    });
    if (this.selectedQuestion) {
      this.EditQuestion();
    } else {
      const choix: Choix[] = []
      const question = new ExamQuestion(this.Exam, this.questionNumber, this.Question, questionT, choix);
      this.ProfService.AddQuestion(question).subscribe(
        (res) => {
          this.lastQuestion = res;
          this.questionNumber = this.questionNumber + 1;
          if (this.idType >= 2) {
            this.SaveChoice();
            f.reset();;
          }
          else {
            f.reset();
            this.ProfService.GetlastQuestion(this.Exam).subscribe(
              (res) => {
                this.QuestionListe.push(res);
              },
              (err) => {
                console.log(err.error);
              }
            )
          }
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
  }

  // Remove Question function

  removeQuestionChoice() {
    this.ProfService.RemoveChoix(this.selectedQuestion.questionChoice[this.index]).subscribe((res) => {
      this.index = this.index + 1;
      if (this.index <= this.selectedQuestion.questionChoice.length - 1) {
        this.removeQuestionChoice();
      }
      else {
        this.index = 0;
        this.RemoveQuestion();
      }
    })
  }

  RemoveQuestion() {
    this.ProfService.RemoveQuestion(this.selectedQuestion).subscribe(
      (res) => {
        this.QuestionListe = this.QuestionListe.filter((item) => {
          return item != this.selectedQuestion;
        });
        this.index = 0;
        alert("Suppréssion effectuer");
      }
    )
  }

  AskremoveQuestion(Question: ExamQuestion) {
    if (confirm("Voulez vous vraiment supprimer cette question?")) {
      this.selectedQuestion = Question;
      const idT: any = this.selectedQuestion.idtype.idtype;
      if (idT > 1) {
        this.index = 0;
        this.removeQuestionChoice();
      }
      else {
        this.RemoveQuestion();
      }
    }
  }

  selectQuestion(Question: ExamQuestion) {
    this.selectedQuestion = Question;
    const idT: any = this.selectedQuestion.idtype.idtype;
    this.idType = idT;
    this.choiceListe = [];
    this.selectedQuestion.questionChoice.forEach((item) => {
      this.choiceListe.push(item.choix);
    });
    this.Question = this.selectedQuestion.question;
  }

  // Edit Question function
  EditQuestion() {
    // Send the modif first
    const questionT = this.QuestionT.find((item) => {
      return item.idtype == this.idType;
    });
    if (questionT) {
      const idTselectedQuestion: any = this.selectedQuestion.idtype.idtype;
      // check change type
      if (idTselectedQuestion > 1) {
        if (this.idType == 1) {
          this.index = 0;
          this.removeQuestionChoice();
        }
        else {
          // function to check removed choice
          this.index = 0;
          this.checkRemovedChoice();
        }
      }
      else {
        if (this.idType > 1) {
          // add choice
        }
      }
    }
  }
  checkRemovedChoice() {
    const choice = this.selectedQuestion.questionChoice[this.index];
    const resutlt = this.choiceListe.find((item) => {
      return item == choice.choix;
    });
    if (!resutlt) {
      this.ProfService.RemoveChoix(choice).subscribe(
        (res) => {
          if (this.index <= this.selectedQuestion.questionChoice.length - 1) {
            this.index = this.index + 1;
            this.checkRemovedChoice();
          }
          else{
            this.index = 0;
            this.checkAddedChoice();
          }
        }
      )
    }
  }

  checkAddedChoice(){
    const result = this.selectedQuestion.questionChoice.find((item)=>{
      return this.choiceListe[this.index] == item.choix;
    });
    if(!result){
      this.ProfService.Addchoice(this.choiceListe[this.index],this.selectedQuestion).subscribe(
        (res)=>{
          if(this.index<= this.selectedQuestion.questionChoice.length - 1){
            this.index = this.index + 1;
            this.checkAddedChoice();
          }
        },
        (err)=>{
          console.log(err.error);
        }
      )
    }
  }
}
