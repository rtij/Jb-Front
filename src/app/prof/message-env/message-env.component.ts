import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/Object/Etudiant';
import { MessageEtudiant } from 'src/app/Object/MessageEtudiant';
import { MsgEnseingnant } from 'src/app/Object/MsgEnseingant';
import { Professeur } from 'src/app/Object/Professeur';

import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-message-env',
  templateUrl: './message-env.component.html',
  styleUrls: ['./message-env.component.css']
})
export class MessageEnvComponent implements OnInit {

  constructor(private ProfService: ProfService) { }
  ngOnInit(): void {
    this.getprof();
  }

  MessageEtudiant: MessageEtudiant[] = []
  ProfSendMessage: MsgEnseingnant[] = [];
  selectedMessage!: MessageEtudiant;
  selectedProfesseur!: Professeur;
  selectedEtudiant!: Etudiant;
  selectedMessageP!:MsgEnseingnant;
  filename: string = "";

  getprof() {
    let p = this.ProfService.Prof;
    if (p) {
      this.getEtudiantSendedMessage();
      this.getResponsabilte();
    } else {
      this.ProfService.getProf().subscribe((res) => {
        this.getEtudiantSendedMessage();
        this.getResponsabilte();
      })
    }
  }
  // Etudiant Message
  getEtudiantSendedMessage() {
      this.ProfService.getEtudiantSendedMessage().subscribe(
        (res) => {
          this.MessageEtudiant = this.ProfService.SendedMessageEtudiant;
          this.getEtudiantLastSendedMessage();
        },
        (err) => {
          console.log(err.error);
        }
      )
  }

  getEtudiantLastSendedMessage() {
    setTimeout(() => {
      this.ProfService.getLastSendedMessage().subscribe((res)=>{
        let n = res;
        if(n != this.MessageEtudiant[0]){
          this.getEtudiantSendedMessage();
        }else{
          this.getEtudiantLastSendedMessage();
        }
      },(err)=>{
        console.log(err.error);
      })
    }, 2000)
  }


  selectPMessage(Message:MsgEnseingnant){
    this.selectedProfesseur = Message.idexpediteur;
    this.selectedMessageP = Message;
  }


  selectMessage(MessageEtudiant: MessageEtudiant) {
    this.selectedMessage = MessageEtudiant;
    this.selectedProfesseur = MessageEtudiant.idprofesseur;
    this.filename = MessageEtudiant.filename;
    this.selectedEtudiant = MessageEtudiant.idetudiant;
  }

  // Prof Message
  getResponsabilte() {
    let r = this.ProfService.ResponsabiliteListe;
    if (r != []) {
      this.getProfSendMessage();
    }
  }

  getProfSendMessage() {
    if (this.ProfService.ProfSendMessage.length != 0) {
      this.ProfSendMessage = this.ProfService.ProfSendMessage
    } else {
      this.ProfService.getProfSendMessage().subscribe(
        (res) => {
          this.ProfSendMessage = res;
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  getLastProfSendMessage() {

  }
  

}
