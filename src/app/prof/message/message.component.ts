import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/Object/Etudiant';
import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private ProfService:ProfService) { }

  ngOnInit(): void {
    this.getEtudiant();
  }
  
  Etudiants!: Etudiant[];
  getEtudiant() {
    this.ProfService.getEtudiant().subscribe(
      (res) => {
        this.Etudiants= res;
      },
      (err) => {
        console.log(err.error)
      }
    );
  }
}
