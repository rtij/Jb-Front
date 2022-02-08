import { Component, OnInit } from '@angular/core';
import { MessageEtudiant } from 'src/app/Object/MessageEtudiant';
import { Professeur } from 'src/app/Object/Professeur';
import { EtudiantService } from 'src/app/Service/etudiant.service';

@Component({
  selector: 'app-message-r',
  templateUrl: './message-r.component.html',
  styleUrls: ['./message-r.component.css']
})
export class MessageRComponent implements OnInit {

  MessageEtudiant: MessageEtudiant[] = [];
  selectedMessage!: MessageEtudiant;
  selectedProfesseur!: Professeur;
  filename: string = "";
  constructor(private EtudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.getEtudiant();
  }


  getEtudiant() {
    const etudiant = this.EtudiantService.sendEtudiant();
    if (etudiant) {
      this.getMessage();
    }
    else {
      this.EtudiantService.getEtudiant().subscribe(
        (res) => {
          this.getMessage();
        }
      )
    }
  }

  getMessage() {
    let l = this.EtudiantService.ReceivedMessage;
    if (l.length != 0) {
      this.MessageEtudiant = l;
    } else {
      this.EtudiantService.getReceivedMessageEtudiant().subscribe(
        (res) => {
          this.MessageEtudiant = res;
          this.AskLastMessage();
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
  }


  selectMessage(MessageEtudiant: MessageEtudiant) {
    this.selectedMessage = MessageEtudiant;
    this.filename = MessageEtudiant.urlfile;
    this.selectedProfesseur = MessageEtudiant.idprofesseur;
  }

  AskLastMessage() {
    setTimeout(
      () => {
        this.EtudiantService.getLastReceivedMessage().subscribe
          ((res) => {
            let n = res;
            if (this.MessageEtudiant[0].idmessage != n
            ) {
              this.EtudiantService.ReceivedMessage = [];
              this.getMessage();
            } 
            else {
              this.AskLastMessage();
            }
          },
            (err) => {
              console.log(err.error)
            }
          )
      }, 2000
    )
  }


}
