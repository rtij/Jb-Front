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

  constructor(private EtudiantService: EtudiantService, private router: Router) { }
  Etudiant!: Etudiant;
  mdp: string = "";
  confMdp: string = "";
  ProfesseurListe: ModuleProfesseur[] = [];
  ResponsableListe: Responsabilite[] = [];
  selectedProfesseur!: Professeur;
  message: string = "";
  url: string = "";
  File!: FileList;
  filename = "";
  nombre: number = 0;
  validMessage: boolean = false;
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
      if (responsable[0].idparcours != this.Etudiant.idparcours && responsable[0]) {
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
      if (professeurListe[0].idparcours != this.Etudiant.idparcours && professeurListe[0].idniveau != this.Etudiant.idniveau) {
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
        document.getElementById('dismiss')?.click();
        r.reset();
        this.confMdp = "";
        this.mdp = "";
      }
    )
  }

  onSelectFile(event: any) {
    this.File = event.target.files;
    this.nombre = this.File.length;
    console.log(this.nombre);
    this.filename = this.File[0].name;
  }

  selectProfesseur(Prof: Professeur) {
    this.selectedProfesseur = Prof;
  }

  // Check Valid message
  ValidateMessage() {
    let message = "";
    message = this.message.trim();
    if (message.length == 0) {
      this.validMessage = false;
    }
    else {
      this.validMessage = true;
    }
  }

  SendMessage() {
    let message = "";
    const fd = new FormData();
    if (this.validMessage) {
      message = this.message;
      this.EtudiantService.SendMessage(this.selectedProfesseur, message).subscribe(
        (res) => {
          alert("Message envoyé");
          document.getElementById('dismissM')?.click();
          this.message = "";
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
    let file: any = "";
    if (this.File) {
      file = this.File[0];
    }
    if (file) {
      fd.append('file', file);
      this.EtudiantService.SendMessageFile(this.selectedProfesseur, fd).subscribe(
        (res) => {
          alert("Message envoyé");
          let a: any = undefined;
          this.File = a;
          this.filename ="";
        }
      )
    }

  }
}
