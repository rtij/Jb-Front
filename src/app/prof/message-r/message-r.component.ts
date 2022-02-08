import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/Object/Etudiant';
import { MessageEtudiant } from 'src/app/Object/MessageEtudiant';
import { MsgEnseingnant } from 'src/app/Object/MsgEnseingant';
import { Professeur } from 'src/app/Object/Professeur';
import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-message-r',
  templateUrl: './message-r.component.html',
  styleUrls: ['./message-r.component.css']
})
export class MessageRComponent implements OnInit {

  constructor(private ProfService: ProfService) { }

  ngOnInit(): void {
    this.getprof();
  }

  MessageEtudiant: MessageEtudiant[] = []
  ProfReceivedMessage: MsgEnseingnant[] = [];
  selectedMessage!: MessageEtudiant;
  selectedMessageP!:MsgEnseingnant;
  selectedProfesseur!: Professeur;
  selectedEtudiant!: Etudiant;
  filename: string = "";

  getprof() {
    let p = this.ProfService.Prof;
    if (p) {
      this.getEtudiantReceivedMessage();
      this.getResponsabilte();
    } else {
      this.ProfService.getProf().subscribe((res) => {
        this.getEtudiantReceivedMessage();
        this.getResponsabilte();
      })
    }
  }
  // Etudiant Message
  getEtudiantReceivedMessage() {
      this.ProfService.getEtudiantReceivedMessage().subscribe(
        (res) => {
          this.MessageEtudiant = this.ProfService.ReceivedMessageEtudiant;
          this.getEtudiantLastReceiveMessage();
        },
        (err) => {
          console.log(err.error);
        }
      )
  }

  getEtudiantLastReceiveMessage() {
    setTimeout(() => {
      this.ProfService.getLastReceivedMessage().subscribe((res) => {
        let n = res;
        if (n != this.MessageEtudiant[0]) {
          this.getEtudiantReceivedMessage();
        }
        else {
          this.getEtudiantLastReceiveMessage();
        }
      },
       (err) => console.log(err.error)
      )
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
    this.ProfService.GetResponsabilite().subscribe(
      (res)=>{
        let r = res;
        if(r.length != 0 ){
          this.getProfReceivedMessage();
        }
      }
    )
  }

  getProfReceivedMessage() {
    this.ProfService.getProfReceivedMessage().subscribe(
        (res) => {
          this.ProfReceivedMessage = res;
          this.getLastProfReceivedMessage();
        },
        (err) => {
          console.log(err.error)
        }
      )
  }

  getLastProfReceivedMessage() {
    setTimeout(()=>{
      this.ProfService.getLastProfReceiveMessage().subscribe(
        (res)=>{
          let n = res;
          if(n != this.ProfReceivedMessage[0].idmsgEnseignant){
            this.getProfReceivedMessage();
          }else{
            this.getLastProfReceivedMessage();
          }
        }
      )
    },2000)
  }
}
