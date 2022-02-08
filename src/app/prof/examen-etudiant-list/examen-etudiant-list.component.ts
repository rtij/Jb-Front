import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Etudiant } from 'src/app/Object/Etudiant';
import { ExamEtudiant } from 'src/app/Object/ExamEtudiant';
import { ExamTitre } from 'src/app/Object/ExamTitre';
import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-examen-etudiant-list',
  templateUrl: './examen-etudiant-list.component.html',
  styleUrls: ['./examen-etudiant-list.component.css']
})
export class ExamenEtudiantListComponent implements OnInit {

  constructor(private ProfService: ProfService, private router: Router) { }
  Exam!: ExamTitre;
  Etudiant: ExamEtudiant[] = [];
  ngOnInit(): void {
    this.getSelectedExam();
  }

  getSelectedExam() {
    let s =
      this.ProfService.selectedExam;
    if (s) {
      this.Exam = s;
      this.getEtudiantList();
    }
    else {
      this.router.navigate(['/Professeur/Examen']);
    }
  }

  getEtudiantList() {
    this.ProfService.getExamEtudiantList(this.Exam).subscribe
      (
        (res) => {
          this.Etudiant = res;
        },
        (err) => {
          console.log(err.error)
        }
      )
  }
  selectEtudiant(ExamEtudiant: ExamEtudiant) {
    let it = ExamEtudiant;
    this.ProfService.selectExamEtudiant(it);
    let i:any = this.ProfService.selectedExamEtudiant;
    if(i){
     this.router.navigate(['/Professeur/Examen/Reponse'])
    }
  }
 
}
