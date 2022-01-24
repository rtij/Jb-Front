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
  Exam!:ExamTitre;
  ActuTime!:Time;
  ActuDate!:Date;
  serverTime!:Time;
  CoolDown!:Time;
  timesUp:boolean;
  DateString:string="";
  
  constructor(private EtudiantService:EtudiantService) { 
    this.timesUp = false;
  }
  
  ngOnInit(): void {
    this.getSelectedExam();
  }

  getSelectedExam(){
    const exam = this.EtudiantService.ExamListe[0];
    if(exam){
      this.Exam = exam;
      console.log(this.Exam);
    }
    this.getTime();
  }

  unselectExam(){
    const it:any  = null;
    this.EtudiantService.selectedExam  = it;
  }

  
  getTime(){
    this.EtudiantService.getTime().subscribe
    ((res)=>{
     this.ActuDate = res;
    this.TimeCounter();
    },
    (err)=>console.log(err.error))
  }

  
  TimeCounter(){
    setTimeout(()=>{
      this.CoolDown = TimerDown(this.CoolDown);
      this.TimeCounter();
      },1000);
  }


  ngOnDestroy(){
    this.unselectExam();   
  }

}
