import { Component, OnInit } from '@angular/core';
import { getTimeLocaleTime } from 'src/app/Object/Function';
import { ModuleProfesseur } from 'src/app/Object/ModuleProfesseur';
import { MsgEnseingnant } from 'src/app/Object/MsgEnseingant';
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
    this.getProf();
  }
  Prof!:Professeur;
  ModuleProf!:ModuleProfesseur[];
  ProfListe:Professeur[]=[];
  ListeT:ModuleProfesseur[] = [];
  parcours!:Parcours;
  selectedProfesseur!:Professeur;
  message:string="";
  index:number = 0;

  getProf(){
    let p = this.profService.Prof;
    if(p){
      this.getProfesseurResponsabilite();
    }else{
      this.profService.getProf().subscribe((res)=>{
        this.getProfesseurResponsabilite();
      },
      (err)=>{
        console.log(err.error)
      })
    }

  }
  
  getProfesseurResponsabilite() {
    // Set professeur Liste from responsabilite
    this.profService.GetResponsabilite().subscribe((res) => {
      if (res != []) {
          this.getProfListe();
      }
      // this.getProfesseurListe();

    })
  }


  getProfListe() {
    let l = this.profService.ProfesseurFinalListe;
    if (l.length != 0) {
      this.ProfListe = l;
    } else {
      let r = this.profService.ResponsabiliteListe;
      if (this.index < r.length) {
        this.profService.getProfbyParcours(r[this.index].idparcours).subscribe
          ((res) => {
            this.ListeT = res;
            this.checkProfesseurListe();
          })
      } else {
        this.index = 0;
      }
    }
  }

  checkProfesseurListe() {
    this.ListeT.forEach((item) => {
      let r = this.ProfListe.find((p) => {
        return p.idprofesseur == item.idprofesseur.idprofesseur;
      });
      if (!r) {
        this.ProfListe.push(item.idprofesseur);
      }
    });
    this.index = this.index + 1;
    this.getProfListe();
  }


  SelectProfesseur(Professeur:Professeur){
    this.selectedProfesseur = Professeur;
  }

  SendMessage(){
    let m =  new MsgEnseingnant(this.message,new Date(),getTimeLocaleTime(new Date()),this.selectedProfesseur,this.Prof,false);
    this.profService.SendProfMessage(m).subscribe((res)=>{
      let a:any = null;
      this.selectedProfesseur = a;
      this.message = "";
      alert("Message envoyer");
      document.getElementById('#dismissM')?.click();
    });
  }
}
