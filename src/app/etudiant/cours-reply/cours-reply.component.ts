import { Component, OnInit } from '@angular/core';
import { EtudiantService } from 'src/app/Service/etudiant.service';

@Component({
  selector: 'app-cours-reply',
  templateUrl: './cours-reply.component.html',
  styleUrls: ['./cours-reply.component.css']
})
export class CoursReplyComponent implements OnInit {

  constructor(private EtudiantService:EtudiantService) { }

  ngOnInit(): void {
  }

  getSelectedCours(){
    
  }

  getEtudiant(){

  }


}
