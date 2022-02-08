import { Component, OnInit } from '@angular/core';
import { MessageEtudiant } from 'src/app/Object/MessageEtudiant';
import { Professeur } from 'src/app/Object/Professeur';
import { EtudiantService } from 'src/app/Service/etudiant.service';

@Component({
  selector: 'app-message-env',
  templateUrl: './message-env.component.html',
  styleUrls: ['./message-env.component.css']
})
export class MessageEnvComponent implements OnInit {

  MessageEtudiant: MessageEtudiant[] = [];
  selectedProfesseur!: Professeur;
  filename: string = "";
  selectedMessage!: MessageEtudiant;
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
    let l = this.EtudiantService.SendedMessage;
    if (l.length != 0) {
      this.MessageEtudiant = l;
      this.getLastMessage();
    } else {
      this.EtudiantService.getSendedMessageEtudiant().subscribe(
        (res) => {
          this.MessageEtudiant = this.EtudiantService.SendedMessage;
          this.getLastMessage();
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
  }

  selectMessage(MessageEtudiant: MessageEtudiant) {
    this.selectedMessage = MessageEtudiant;
    this.filename = MessageEtudiant.filename;
    this.selectedProfesseur = MessageEtudiant.idprofesseur;
  }

  getLastMessage(){
    setTimeout(
      ()=>{
        this.EtudiantService.getLastSendedMessage().subscribe
        ((res)=>{
          let n = res;
          if(this.MessageEtudiant[0].idmessage != n){
            this.EtudiantService.SendedMessage = [];
            this.getMessage();
          }else{
            this.getLastMessage();
          }
        },
        (err)=>{
          console.log(err.error)
        }
        )
      },2000
    )
  }
}
