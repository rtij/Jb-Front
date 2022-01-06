import { Component, OnInit } from '@angular/core';
import { ModuleProfesseur } from 'src/app/Object/ModuleProfesseur';
import { Parcours } from 'src/app/Object/Parcours';
import { Professeur } from 'src/app/Object/Professeur';
import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css']
})
export class EnseignantComponent implements OnInit {

  constructor(private profService:ProfService) { }

  ngOnInit(): void {
    this.getProfListe();
  }
  ModuleProf!:ModuleProfesseur[];
  Prof:Professeur[]=[];
  parcours!:Parcours;
  

  getProfListe(){
    this.profService.getEnseignant().subscribe(
      (res)=>{
        this.ModuleProf = res;
        this.ModuleProf.forEach((el)=>{
          const result = this.Prof.find((item)=>{
            return el.idprofesseur.idprofesseur == item.idprofesseur;
          });
          if(!result){
            this.Prof.push(el.idprofesseur);
          }
        });
      },
      (err)=>{

      }
    )
  }

}
