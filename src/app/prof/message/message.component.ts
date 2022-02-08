import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/Object/Etudiant';
import { getTimeLocaleTime } from 'src/app/Object/Function';
import { MessageEtudiant } from 'src/app/Object/MessageEtudiant';
import { ModuleProfesseur } from 'src/app/Object/ModuleProfesseur';
import { MsgEnseingnant } from 'src/app/Object/MsgEnseingant';
import { Parcours } from 'src/app/Object/Parcours';
import { Professeur } from 'src/app/Object/Professeur';
import { Responsabilite } from 'src/app/Object/Responsabilite';
import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  data: string[] = [];
  constructor(private ProfService: ProfService) { }
  ngOnInit(): void {
    this.getModuleProf();
  }
  nom: string = "";
  Etudiants: Etudiant[] = [];
  Professeurs: Professeur[] = [];
  ProfesseurListe: ModuleProfesseur[] = [];
  selectedEtudiant!: Etudiant;
  fullname: string = "";
  selectedProfesseur!: Professeur;
  MessageEtudiant!: MessageEtudiant;
  Responsabilite: Responsabilite[] = [];
  index: number = 0;
  message: string = "";
  url: string = "";
  File!: FileList;
  filename = "";
  nombre: number = 0;
  validMessage: boolean = false;
  EtudiantListe: Etudiant[] = [];
  R: boolean = false;


  getProf() {
    let p = this.ProfService.Prof;
    if (p) {
      this.getProfesseurResponsabilite();
    } else {
      this.ProfService.getProf().subscribe
        ((res) => {
          this.getProfesseurResponsabilite();
        })
    }
  }

  // Add EtudiantListe from mdoule
  getModuleProf() {
    let l = this.ProfService.EtudiantFinalListe;
    if (l.length != 0) {
      this.Etudiants = l;
      this.AddEtudiantListe();
      this.getProf();
    } else {

      let m = this.ProfService.ProfCours;
      if (m.length != 0) {
        this.getCoursEtudiant();
      }
      this.ProfService.getCours().subscribe(
        (res) => {
          this.getCoursEtudiant();
        }
      )
    }
  }

  getCoursEtudiant() {
    let m = this.ProfService.ProfCours;
    if (this.index < m.length) {
      this.ProfService.getEtudiantCours(this.ProfService.ProfCours[this.index]).subscribe
        (
          (res) => {
            this.EtudiantListe = res;
            this.CheckEtudiantListe();
          }
        )
    } else {
      this.index = 0;
      this.getProf();
    }
  }

  CheckEtudiantListe() {
    this.EtudiantListe.forEach((item) => {
      let r = this.Etudiants.find((etu) => {
        return etu.idetudiant == item.idetudiant
      });
      if (!r) {
        this.Etudiants.push(item);
      }
    });
    this.index = this.index + 1;
    if (this.R) {
      this.getEtudiantResponsable();
    } else {
      this.getCoursEtudiant();
    }
  }


  checkProfesseurListe() {
    this.ProfesseurListe.forEach((item) => {
      let r = this.Professeurs.find((p) => {
        return p.idprofesseur == item.idprofesseur.idprofesseur;
      });
      if (!r) {
        this.Professeurs.push(item.idprofesseur);
      }
    });
    this.index = this.index + 1;
    this.getProfesseurListe();
  }

  AddEtudiantListe() {
    this.Etudiants.forEach((item) => {
      let fullname = item.nom.trim() + " " + item.prenom.trimEnd();
      this.data.push(fullname);
    });
  }

  AddProfesseurListe() {
    this.Professeurs.forEach((item) => {
      let fullname = item.nom.trim() + " " + item.prenom.trimEnd();
      this.data.push(fullname);
    });
  }




  // Add by responsabilite
  getProfesseurResponsabilite() {
    // Set professeur Liste from responsabilite
    this.ProfService.GetResponsabilite().subscribe((res) => {
      if (res != []) {
        let l = this.ProfService.EtudiantFinalListe;
        if (l.length == 0) {
          this.Responsabilite = res;
          this.R = true;
          this.getEtudiantResponsable();
        } else {
          this.getProfesseurListe();
        }
      }
      // this.getProfesseurListe();

    })
  }

  getEtudiantResponsable() {
    let r = this.ProfService.ResponsabiliteListe;
    if (this.index < r.length) {
      this.ProfService.getEtudiantByParcours(r[this.index].idparcours).subscribe
        (
          (res) => {
            this.EtudiantListe = res;
            this.CheckEtudiantListe();
          }, (err) => {
            console.log(err.error)
          }
        )
    } else {
      this.index = 0;
      this.AddEtudiantListe();
      this.ProfService.EtudiantFinalListe = this.Etudiants;
      this.getProfesseurListe();
    }
  }


  getProfesseurListe() {
    let l = this.ProfService.ProfesseurFinalListe;
    if (l.length != 0) {
      this.Professeurs = l;
      this.AddProfesseurListe();
    } else {
      let r = this.ProfService.ResponsabiliteListe;
      if (this.index < r.length) {
        this.ProfService.getProfbyParcours(r[this.index].idparcours).subscribe
          ((res) => {
            this.ProfesseurListe = res;
            this.checkProfesseurListe();
          })
      } else {
        this.index = 0;
        this.AddProfesseurListe();
      }
    }

  }

  // 
  FindSelectedName() {
    let r: any = null;
    this.selectedProfesseur = r;
    this.selectedEtudiant = r;
    this.Etudiants.forEach((item) => {
      let fullname = item.nom.trim() + " " + item.prenom.trimEnd();
      if (fullname === this.fullname) {
        this.selectedEtudiant = item;
      }
    });
    if (!this.selectedEtudiant) {
      this.Professeurs.forEach((item) => {
        let fullname = item.nom.trim() + " " + item.prenom.trimEnd();
        if (fullname === this.fullname) {
          this.selectedProfesseur = item;
        }
      });
    }
  }

  // Sending Message
  SendMessage() {
    if (this.selectedEtudiant) {
      this.SendEtudiantMessage();
    }
    else {
      this.SendProfMessage();
    }
  }



  onSelectFile(event: any) {
    this.File = event.target.files;
    this.nombre = this.File.length;
    console.log(this.nombre);
    this.filename = this.File[0].name;
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

  SendEtudiantMessage() {
    let message = "";
    const fd = new FormData();
    this.ValidateMessage();
    if (this.validMessage) {
      message = this.message;
      this.ProfService.selectedEtudiant = this.selectedEtudiant;
      this.ProfService.SendEtudiantMessage(message).subscribe(
        (res) => {
          if (!this.File) {
            alert("Message envoyé");
            document.getElementById('dismissM')?.click();
          } else {
            let file: any = "";
            file = this.File[0];
            fd.append('file', file);
            this.ProfService.SendEtudiantMessageFile(fd).subscribe(
              (res) => {
                alert("Message envoyé");
                document.getElementById('dismissM')?.click();
              }
            )
          }
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
  }

  SendProfMessage() {
    let m = new MsgEnseingnant(this.message, new Date(), getTimeLocaleTime(new Date()), this.selectedProfesseur, this.ProfService.Prof, false);
    this.ProfService.SendProfMessage(m).subscribe((res) => {
      let a: any = null;
      this.selectedProfesseur = a;
      this.message = "";
      alert("Message envoyer");
      document.getElementById('#dismissM')?.click();
    });
  }
}
