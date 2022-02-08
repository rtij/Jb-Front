import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/Object/Etudiant';
import { MessageEtudiant } from 'src/app/Object/MessageEtudiant';
import { ModuleProfesseur } from 'src/app/Object/ModuleProfesseur';
import { Professeur } from 'src/app/Object/Professeur';
import { Responsabilite } from 'src/app/Object/Responsabilite';
import { EtudiantService } from 'src/app/Service/etudiant.service';

@Component({
  selector: 'app-etudiant-message',
  templateUrl: './etudiant-message.component.html',
  styleUrls: ['./etudiant-message.component.css']
})
export class EtudiantMessageComponent implements OnInit {

  constructor(private EtudiantService: EtudiantService) { }
  MessageEtudiant: MessageEtudiant[] = [];
  conversation: MessageEtudiant[] = [];
  selectedMessage!: MessageEtudiant;
  ProfesseurListe: ModuleProfesseur[] = [];
  File!: FileList;
  ResponsableListe: Responsabilite[] = [];
  selectedProfesseur!: Professeur;
  message: string = "";
  url: string = "";
  filename = "";
  nombre: number = 0;
  validMessage: boolean = false;
  Etudiant!: Etudiant;
  ProfList: Professeur[] = [];
  ngOnInit(): void {
    this.getEtudiant();
  }

  getEtudiant() {
    const etudiant = this.EtudiantService.sendEtudiant();
    if (etudiant) {
      this.getProfesseur();
    }
    else {
      this.EtudiantService.getEtudiant().subscribe(
        (res) => {
          this.getProfesseur();
        }
      )
    }

  }

  getMessage() {
    this.EtudiantService.getMessageEtudiant().subscribe(
      (res) => {
        this.MessageEtudiant = res;
      },
      (err) => {
        console.log(err.error);
      }
    )
  }

  getResponsable() {
    const responsable = this.EtudiantService.ResponsableListe;
    if (responsable.length != 0) {
      this.ResponsableListe = responsable;
      this.AddResponsableListe();
    }
    else {
      this.EtudiantService.getResponsable().subscribe
        ((res) => {
          this.ResponsableListe = res;
          this.AddResponsableListe();
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
      this.SetProfesseurListe();

      this.getResponsable();
    }
    else {
      this.EtudiantService.getEtudiantProfs().subscribe
        ((res) => {
          this.ProfesseurListe = res;
          this.SetProfesseurListe();
          this.getResponsable();
        },
          (err) => {
            console.log(err.error)
          });
    }
  }

  SetProfesseurListe() {
    this.ProfesseurListe.forEach((item) => {
      this.ProfList.push(item.idprofesseur)
    });
  }

  AddResponsableListe() {
    this.ResponsableListe.forEach((item) => {
      this.ProfList.push(item.idprofesseur);
    });
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

  SendMessage() {
    let message = "";
    const fd = new FormData();
    if (this.validMessage) {
      message = this.message;
      this.EtudiantService.SendMessage(this.selectedProfesseur, message).subscribe(
        (res) => {

          let file: any = "";
          if (this.File) {
            file = this.File[0];
          }
          if (file) {
            fd.append('file', file);
            this.EtudiantService.SendMessageFile(this.selectedProfesseur, fd).subscribe(
              (res) => {
                alert("Message envoyé");
                document.getElementById('dismissM')?.click();
                let a: any = undefined;
                this.File = a;
                this.filename = "";
              }
            )
          }
          else {
            alert("Message envoyé");
            document.getElementById('dismissM')?.click();
            this.message = "";
            this.filename = "";
          }
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
  }

  uploadFile() {
    const fd = new FormData();
    fd.append('file', this.File[0], this.File[0].name);
    console.log(fd);
    //  Service to upload file
  }
}
