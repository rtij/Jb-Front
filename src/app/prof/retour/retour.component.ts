import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocEtudiant } from 'src/app/Object/docEtudiant';
import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-retour',
  templateUrl: './retour.component.html',
  styleUrls: ['./retour.component.css']
})
export class RetourComponent implements OnInit {

  constructor(private ProfService:ProfService,private router:Router) { }
  DocEtudiant!:DocEtudiant;


  ngOnInit(): void {
    this.getReply();
  }


  getReply(){
    let s = this.ProfService.selectedDocEtudiant;
    if(!s){
      this.router.navigate(['/Professeur/cours/cours-reply-list']);
    }
    else{
      this.DocEtudiant = s;
      this.setVue();
    }
  }

  setVue()
  {
    this.ProfService.SetDocViewed().subscribe
    ((res)=>{

    },
    (err)=>{
      console.log(err.error);
    }
    )
  }
}
