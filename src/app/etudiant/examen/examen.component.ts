import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Etudiant } from 'src/app/Object/Etudiant';
import { ExamTitre } from 'src/app/Object/ExamTitre';
import { DateFormate, DateToShortDate, FormateDate, GetResultTime, getTimeLocaleTime } from 'src/app/Object/Function';
import { EtudiantService } from 'src/app/Service/etudiant.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  constructor(private EtudiantService:EtudiantService,private router:Router) { }

  ngOnInit(): void {
    this.getEtudiant();
    this.getTime();
  }

  ExamListe:ExamTitre[] = [];
  selectedExam!:ExamTitre;
  ActuTime!:Time;
  ActuDate!:Date;
  serverTime!:Time;
  DateString:string="";

  getEtudiant(){
    const etu = this.EtudiantService.sendEtudiant();
    if(etu){
      this.getExamListe();
    }
    else{
      this.EtudiantService.getEtudiant().subscribe(
        (res)=>{
          this.getExamListe();
        }
      )
    }
  }

  getExamListe(){
    this.EtudiantService.getExamEtudiant().subscribe
    ((res)=>{
      this.ExamListe = res;
    },
    (err)=>{
      console.log(err.error);
    }
    )
  }

  selectExam(exam:ExamTitre){
    this.selectedExam = exam;
    this.EtudiantService.selectedExam = exam;
    this.router.navigate(['Cours/Reply']);
  }

  getTime(){
    this.EtudiantService.getTime().subscribe
    ((res)=>{
      console.log(res);
      this.DateString = DateFormate(res);
      this.serverTime = GetResultTime(res); 
      this.ActuTime = this.serverTime;
      console.log(this.ActuTime);
      console.log("this is the actual hours"+ this.ActuTime.hours);

    },
    (err)=>console.log(err.error))
  }

  MyTime(){
   
  }

}
