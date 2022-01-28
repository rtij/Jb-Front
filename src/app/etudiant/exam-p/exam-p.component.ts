import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExamTitre } from 'src/app/Object/ExamTitre';
import { DateFormate, DateToShortDate, GetResultTime, TimerDown, TimerUp } from 'src/app/Object/Function';
import { EtudiantService } from 'src/app/Service/etudiant.service';

@Component({
  selector: 'app-exam-p',
  templateUrl: './exam-p.component.html',
  styleUrls: ['./exam-p.component.css']
})
export class ExamPComponent implements OnInit {

  constructor(private EtudiantService:EtudiantService) { }
  Exam!:ExamTitre;
  ActuTime!:Time;
  ActuDate!:Date;
  serverTime!:Time;
  CoolDown!:Time;
  timesUp:boolean = true;
  DateString:string="";
  ngOnInit(): void {
    this.getSelectedExam();
  }

  getSelectedExam(){
    const exam = this.EtudiantService.ExamListe[0];
    if(exam){
      this.Exam = exam;
      
    }
    this.getTime();
  }

  unselectExam(){
    const it:any  = null;
    this.EtudiantService.selectedExam  = it;
  }

  ngOnDestroy(){
    this.unselectExam();   
  }

  getTime(){
    this.EtudiantService.getTime().subscribe
    ((res)=>{
     this.ActuDate = res;
     this.DateString = DateFormate( DateToShortDate(this.ActuDate));
     this.serverTime = GetResultTime( this.ActuDate);
     this.ActuDate = DateToShortDate(this.ActuDate);
     this.CoolDown = this.Exam.duree;
    this.TimeCounter();
    },
    (err)=>console.log(err.error))
  }

  
  TimeCounter(){
    setTimeout(()=>{
      this.CoolDown = TimerDown(this.CoolDown);
      let it:any = this.serverTime;
      it = it.toString();
      if(it == "00:00:00"){
        this.timesUp = true;
      }
      this.TimeCounter();
      },1000);
  }
}
