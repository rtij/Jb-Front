import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { find } from 'rxjs';
import { Choix } from 'src/app/Object/Choix';
import { ExamQuestion } from 'src/app/Object/ExamQuestion';
import { ExamReponse } from 'src/app/Object/ExamReponse';
import { ExamTitre } from 'src/app/Object/ExamTitre';
import { DateFormate, DateToShortDate, getMinutes, GetResultTime, getSecond, getTimeHours, TimerDown, TimerUp } from 'src/app/Object/Function';
import { ServerTimes, TimeDiff } from 'src/app/Object/Times/ServerTimes';
import { EtudiantService } from 'src/app/Service/etudiant.service';

import { ExamEtudiant } from '../../Object/ExamEtudiant';

@Component({
  selector: 'app-exam-p',
  templateUrl: './exam-p.component.html',
  styleUrls: ['./exam-p.component.css']
})
export class ExamPComponent implements OnInit {
  Exam!: ExamTitre;
  ActuTime!: Time;
  ActuDate!: Date;
  serverTime!: Time;
  CoolDown!: Time;
  timesUp: boolean;
  DateString: string = "";
  examQuestion: ExamQuestion[] = [];
  data: any = [];
  index: number = 0;
  examEtudiant!: ExamEtudiant;
  choiceIndex: number = 0;
  constructor(private EtudiantService: EtudiantService, private router: Router) {
    this.timesUp = false;
  }

  ngOnInit(): void {
    this.getSelectedExam();
  }

  // GetData function
  getSelectedExam() {
    const exam = this.EtudiantService.selectedExam;
    if (exam) {
      this.EtudiantService.EtudiantExamStart(exam).subscribe(
        (res) => {
          this.examEtudiant = res;
          this.Exam = exam;
          this.getTime();
        }
      )
    }
    else {
      this.router.navigate(['/Etudiant/Examen']);
    }
  }

  // Time function

  getTime() {
    this.EtudiantService.getTime().subscribe
      ((res) => {
        this.ActuDate = res;
        let actualDate: any = GetResultTime(this.ActuDate);
        let examTime: any = this.Exam.debut;
        let a = new ServerTimes(getTimeHours(actualDate), getMinutes(actualDate), getSecond(actualDate));
        let b = new ServerTimes(getTimeHours(examTime), getMinutes(examTime), getSecond(examTime));
        let diffToStart: any = TimeDiff(a, b);
        let c = new ServerTimes(getTimeHours(this.Exam.duree), getMinutes(this.Exam.duree), getSecond(this.Exam.duree));
        this.CoolDown = diffToStart;

        if (this.CoolDown > this.Exam.duree) {
          let n:any = null;
          this.CoolDown = n;
          this.router.navigate(['/Etudiant/Examen']);
        }
        this.TimeCounter();
      },
        (err) => console.log(err.error))
  }

  TimeCounter() {
    setTimeout(() => {
      this.CoolDown = TimerUp(this.CoolDown);
      let a = this.CoolDown.toString();
      if (this.CoolDown.toString() == this.Exam.duree.toString()) {
        this.timesUp = true;
      }
      this.TimeCounter();
    }, 1000);
  }


  SetSelectChoice(question: ExamQuestion, choix: Choix) {
    // Check choice liste
    let idQ = question.idexamQuestion;
    const idchoix = choix;
    let d: any = { idQ, idchoix }
    if (question.idtype.idtype == 2) {
      let r = this.data.find((item: any) => {
        return item.idQ == question.idexamQuestion;
      });
      if (r) {
        this.data = this.data.filter((item: any) => {
          return item.idQ != question.idexamQuestion;
        });
        this.data.push(d);
      } else {
        this.data.push(d);
      }
    }
    else {
      const idchoix = choix;
      let d: any = { idQ, idchoix }

      let result = this.data.find((item: any) => {
        return item.idchoix.idchoix == choix.idchoix;
      });
      if (result) {
        this.data = this.data.filter((item: any) => {
          return item.idchoix.idchoix != choix.idchoix;
        });
      } else {
        this.data.push(d);
      }
    }
  }



  // Send Response function
  Finish() {
    if (confirm("Voulez vous vraiment terminer l'examen?")) {
      this.SendResponse();
    }
  }


  CheckSelectedChoice() {
    let question = this.Exam.idexamQuestion[this.index];
    // find the choice on data
    // if find return true
    let cl = question.questionChoice.length;
    if (this.choiceIndex < cl) {
      let r = this.data.find((item: any) => {
        return item.idchoix.idchoix == question.questionChoice[this.choiceIndex].idchoix;
      });
      if (r) {
        let response = new ExamReponse(this.examEtudiant, "", question, question.questionChoice[this.choiceIndex]);
        this.EtudiantService.SendQuestionResponse(response).subscribe(
          (res) => {
            this.choiceIndex = this.choiceIndex + 1;
            this.CheckSelectedChoice();
          }
        )
      } else {
        this.choiceIndex = this.choiceIndex + 1;
        this.CheckSelectedChoice();
      }
    }
    else {
      this.choiceIndex = 0;
      this.index = this.index + 1;
      this.SendResponse();
    }
  }

  SendResponse() {
    let question = this.Exam.idexamQuestion[this.index];
    let l = this.Exam.idexamQuestion.length;
    if (this.index < l) {
      let id: any = question.idtype.idtype;
      if (id == 1) {
        let r = new ExamReponse(this.examEtudiant, question.reponse, question);
        this.EtudiantService.SendQuestionResponse(r).subscribe(
          (res) => {
            this.index = this.index + 1;
            this.SendResponse();
          }
        )
      }
      else {
        // Send All selected Choice for this question
        // check and upload selected choice
        this.CheckSelectedChoice();
      }
    }
    else {
      alert("Reponse sauvegardé");
      this.CoolDown = this.Exam.duree;
      this.timesUp = true;
    }
  }


  // Destruct data
  unselectExam() {
    const it: any = null;
    this.EtudiantService.selectedExam = it;
  }
  ngOnDestroy() {
    this.unselectExam();
  }

}
