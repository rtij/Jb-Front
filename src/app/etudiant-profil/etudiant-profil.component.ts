import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Etudiant } from '../Object/Etudiant';
import { ModuleProfesseur } from '../Object/ModuleProfesseur';
import { Professeur } from '../Object/Professeur';
import { Responsabilite } from '../Object/Responsabilite';
import { EtudiantService } from '../Service/etudiant.service';

@Component({
  selector: 'app-etudiant-profil',
  templateUrl: './etudiant-profil.component.html',
  styleUrls: ['./etudiant-profil.component.css']
})
export class EtudiantProfilComponent implements OnInit {

  constructor(private EtudiantService: EtudiantService,private router:Router) { }
  Etudiant!: Etudiant;
  mdp: string = "";
  confMdp: string = "";
  ProfesseurListe: ModuleProfesseur[] = [];
  ResponsableListe: Responsabilite[] = [];
  selectedProfesseur!:Professeur;
  message:string = "";
  url:string = "";
  ngOnInit(): void {
    this.getEtudiant();
  }

  // getDataFunction
  getEtudiant() {
    this.Etudiant = this.EtudiantService.sendEtudiant();
    if (!this.Etudiant) {
      this.EtudiantService.getEtudiant().subscribe(
        (res) => {
          this.Etudiant = res;
          this.getResponsable();
          this.getProfesseur();
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
    else {
      this.getResponsable();
      this.getProfesseur();
    }
  }

  getResponsable() {
    const responsable = this.EtudiantService.getResponsableListe();
    if (responsable.length != 0) {
      this.ResponsableListe = responsable;
      if(responsable[0].idparcours != this.Etudiant.idparcours && responsable[0]){
        this.EtudiantService.getResponsable().subscribe
          ((res) => {
            this.ResponsableListe = res;
          },
            (err) => {
              console.log(err.error);
            }
          )
      }
    }
    else {
      this.EtudiantService.getResponsable().subscribe
        ((res) => {
          this.ResponsableListe = res;
        },
          (err) => {
            console.log(err.error);
          }
        )
    }
  }

  getProfesseur() {
    const professeurListe = this.EtudiantService.ModuleProfesseurListe;
    if (professeurListe.length != 0) {
      this.ProfesseurListe = professeurListe
      if(professeurListe[0].idparcours != this.Etudiant.idparcours && professeurListe[0].idniveau !=  this.Etudiant.idniveau){
        this.EtudiantService.getEtudiantProfs().subscribe
        ((res) => {
          this.ProfesseurListe = res;
        },
          (err) => {
            console.log(err.error)
          });
      }
    }
    else {
      this.EtudiantService.getEtudiantProfs().subscribe
        ((res) => {
          this.ProfesseurListe = res;
        },
          (err) => {
            console.log(err.error)
          });
    }
  }

  // action function 
  modifMdp(r: any) {
    this.EtudiantService.ModifMdp(this.mdp).subscribe(
      (res) => {
        alert("Modification effectuer");
        r.reset();
        this.confMdp = "";
        this.mdp = "";
      }
    )
  }

  selectProfesseur(Prof:Professeur){
    this.selectedProfesseur = Prof; 
  }

  SendMessage(){
    this.EtudiantService.SendMessage(this.selectedProfesseur,this.message).subscribe(
      (res)=>{
        this.router.navigate(['/Etudiant/Message']);
      },
      (err)=>{
        console.log(err.error);
      }
    )
  }
}
