import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocEtudiant } from 'src/app/Object/docEtudiant';
import { Documents } from 'src/app/Object/Documents';
import { Etudiant } from 'src/app/Object/Etudiant';
import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-cours-reply',
  templateUrl: './cours-reply.component.html',
  styleUrls: ['./cours-reply.component.css']
})
export class CoursReplyComponent implements OnInit {

  constructor(private profService: ProfService, private router: Router) { }
  Etudiant: Etudiant[] = [];
  Documents!: Documents;
  DocEtudiant: DocEtudiant[] = [];
  ngOnInit(): void {
    this.getSelectedCours();
  }

  getSelectedCours() {
    let c = this.profService.selectedCours;
    if (c) {
      this.Documents = c;
      this.getDocEtudiantList();
    }
    else {
      this.router.navigate(['/Professeur/cours'])
    }
  }

  getDocEtudiantList() {
    this.profService.GetCoursReply().subscribe
      (
        (res) => {
          this.DocEtudiant = res;
        },
        (err) => {
          console.log(err.error)
        }
      )
  }

  selectEtudiant(DocEtudiant:DocEtudiant) {
    this.profService.selectedDocEtudiant = DocEtudiant;
    let d = this.profService.selectedDocEtudiant;
    if(d){
      this.router.navigate(['/Professeur/cours/Reponse']);
    }
  }
}
