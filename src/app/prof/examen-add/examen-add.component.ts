import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  ProfesseurModule: ModuleProfesseur[] = [];
  module!: Module;
  examAdd: boolean;
  selectedModule!: ModuleProfesseur;
  titre!: string;
  id!: number;
  idType!: number;
  Duree!: Time;
  DateDiffusion!: Date;
  diffusion: string;
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
  action: string = "Enregistrer";
  ngOnInit(): void {
    this.getModuleProf();
    this.GetQuestionType();
  }


  constructor(private ProfService: ProfService, private router: Router) {
    this.diffusion = "";
    this.examAdd = false;
  }

  // Get Data function
  getSelectedExam(){
    const it= this.ProfService.selectedExam;
    if(it){
      this.examAdd = true;
      this.Exam = it;
      console.log(this.Exam);
      this.diffusion = DateFormate(it.diffusion);
      this.QuestionListe = this.Exam.idexamQuestion;
      const idniveau:any = this.Exam.idniveau.idniveau;
      const idparcours:any = this.Exam.idparcours.idparcours;
      const idmodule:any = this.Exam.idmodule.idmodule;
      const result:any = this.ProfesseurModule.find((item)=>{
        return item.idmodule == idmodule && item.idniveau == idniveau && item.idparcours == idparcours
      });
      this.selectedModule = result;
      console.assert(result,"result not found");
    }
  }

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
        this.getSelectedExam();
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
 
  // Action function
  AddExamTitre(b:any) {
    if (this.action == "Modifier") {
      this.SaveEditExam(b);
    }
    else {
      const exam = new ExamTitre(this.titre, this.Duree.toString(), this.heureDeb, this.Duree, this.selectedModule.idparcours, this.selectedModule.idprofesseur, this.selectedModule.idmodule, this.DateDiffusion, this.selectedModule.idniveau,[]);
      this.ProfService.createExam(exam).subscribe(
        (res) => {
          this.examAdd = true;
          this.Exam = res;
          this.Exam.diffusion = DateToShortDate(this.Exam.diffusion);
          this.diffusion = DateFormate(this.Exam.diffusion);
          b.reset();
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
  }

  EditExam() {
    this.examAdd = false;
    this.titre = this.Exam.titre;
    this.Duree = this.Exam.duree;
    this.heureDeb = this.Exam.debut;
    this.DateDiffusion = this.Exam.diffusion;
    this.action = "Modifier";
    const result:any = this.ProfesseurModule.find(
      (item)=>{
        return item.idmodule.idmodule == this.Exam.idmodule.idmodule;
      }
    );
    console.log(result);
    this.selectedModule = result;
  }

  EditAnnulation() {
    this.examAdd = true;
    this.action = "Enregistrer";
  }

  SaveEditExam(b:any) {
    this.Exam.titre = this.titre;
    this.Exam.duree = this.Duree;
    this.Exam.debut = this.heureDeb;
    this.Exam.idmodule = this.selectedModule.idmodule;
    this.Exam.idniveau = this.selectedModule.idniveau;
    this.Exam.idparcours = this.selectedModule.idparcours;
    this.Exam.dureeI = this.Duree.toString();
    this.Exam.diffusion = this.DateDiffusion;
    this.ProfService.EditExam(this.Exam).subscribe(
      (res) => {
        this.Exam = res;
        this.examAdd = true;
        this.Exam.diffusion = DateToShortDate(this.Exam.diffusion);
        this.diffusion = DateFormate(this.Exam.diffusion);
        b.reset();
      }, err => { console.log(err.error) }
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
              this.QuestionListe = this.QuestionListe.sort((a, b) => a.numQuestion - b.numQuestion);
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
              this.QuestionListe = this.QuestionListe.sort((a, b) => a.numQuestion - b.numQuestion);
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

  SetFinish() {
    this.ProfService.SetExamFinished(this.Exam).subscribe((res) => {
      this.router.navigate(['/prof/Examen']);
    },
      (err) => {
        console.log(err.error);
      });
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
        this.QuestionListe = this.QuestionListe.sort((a, b) => a.numQuestion - b.numQuestion);
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
    const questionN = this.QuestionListe.indexOf(this.selectedQuestion);
    alert(questionN);
    const idT: any = this.selectedQuestion.idtype.idtype;
    this.idType = idT;
    this.choiceListe = [];
    this.selectedQuestion.questionChoice.forEach((item) => {
      this.choiceListe.push(item.choix);
    });
    this.Question = this.selectedQuestion.question;
  }

  RemoveExam() {
    this.ProfService.RemoveExam(this.Exam).subscribe(
      (res) => {
        alert('Suppréssion effectuer');
        this.router.navigate(['/prof/Examen']);
      }
    )
  }

  AskForRemoveExam() {
    if (confirm("Voulez-vous vraiment annuler cette examen ?")) {
      this.RemoveExam();
    }
  }

  ngOnDestroy(){
    this.ProfService.UnsetSelectedExam();
  }

}
