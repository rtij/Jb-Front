import { Component, OnInit } from '@angular/core';
import { MessageEtudiant } from 'src/app/Object/MessageEtudiant';
import { EtudiantService } from 'src/app/Service/etudiant.service';

@Component({
  selector: 'app-etudiant-message',
  templateUrl: './etudiant-message.component.html',
  styleUrls: ['./etudiant-message.component.css']
})
export class EtudiantMessageComponent implements OnInit {

  constructor(private EtudiantService: EtudiantService) { }
  MessageEtudiant: MessageEtudiant[] = [];
  conversation:MessageEtudiant[] = [];
  selectedMessage!:MessageEtudiant;
  File!: FileList;
  ngOnInit(): void {
    this.getEtudiant();
  }

  getEtudiant(){
    const etudiant = this.EtudiantService.sendEtudiant();
    if(etudiant){
      this.getMessage();
    }
    else{
      this.EtudiantService.getEtudiant().subscribe(
        (res)=>{
          this.getMessage();
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

  selectMessage(){

  }

  uploadFile() {
    const fd = new FormData();
    fd.append('file', this.File[0], this.File[0].name);
    console.log(fd);
    //  Service to upload file
  }
}
