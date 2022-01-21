import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamTitre } from 'src/app/Object/ExamTitre';
import {DateToShortDate } from 'src/app/Object/Function';
import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  constructor(private ProfService:ProfService,private router:Router) { }

  ngOnInit(): void {
    this.getExamListe();
  }
  selectedExam!:ExamTitre;
  ExamTitreListe:ExamTitre[]=[];
 
  getExamListe(){
    this.ProfService.getExamListe().subscribe(
      (res)=>{
        this.ExamTitreListe =  res;
        this.ExamTitreListe.forEach((item)=>{
          item.diffusion =  DateToShortDate(item.diffusion)
        });
      },
      (err)=>{
        console.log(err.error)
      }
    )
  }

  RemoveExam(Exam:ExamTitre){
    if(confirm("Voulez vous vraiment supprimer cet examen")){
      this.ProfService.RemoveExam(Exam).subscribe(
        (res)=>{
          this.ExamTitreListe = this.ExamTitreListe.filter((item)=>{
            return item != Exam
          });
        },err=>console.log(err.error)
      )
    }
    
  }

  selectExam(Exam:ExamTitre){
    this.ProfService.SetSelectedExam(Exam);
    this.router.navigate(['/prof/Examen/Examen-add']);
  }
}
