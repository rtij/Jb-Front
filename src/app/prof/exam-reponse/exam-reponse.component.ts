import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Choix } from 'src/app/Object/Choix';
import { ExamEtudiant } from 'src/app/Object/ExamEtudiant';
import { ExamQuestion } from 'src/app/Object/ExamQuestion';
import { ExamReponse } from 'src/app/Object/ExamReponse';
import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-exam-reponse',
  templateUrl: './exam-reponse.component.html',
  styleUrls: ['./exam-reponse.component.css']
})
export class ExamReponseComponent implements OnInit {

  ExamEtudiant!: ExamEtudiant;
  data = [1, 3, 4, 5, 6, 8];
  odd = [2, 4, 6, 8]
  constructor(private ProfService: ProfService, private router: Router) { }

  ngOnInit(): void {
    this.getSelectedExamAndEtudiant();
  }

  getSelectedExamAndEtudiant() {
    let etudiant = this.ProfService.selectedExamEtudiant;
    let exam = this.ProfService.selectedExam;
    if (!exam) {
      this.router.navigate(['/Professeur/Examen']);
    }
    else {
      if (!etudiant) {
        this.router.navigate(['/Professeur/Examen/ListeParticipant']);
      }
      else {
        this.getReponse();
      }
    }
  }

  getReponse() {
    this.ExamEtudiant = this.ProfService.selectedExamEtudiant;
  }

  SetChoiceSelected(choix:Choix){
    let r = this.ExamEtudiant.idexamReponse.find(
      (item)=>{
        return item.idchoix?.idchoix == choix.idchoix;
      }
    )
    console.log(r);
    if(r){
      return true;
    }
    return false;
  }

}
