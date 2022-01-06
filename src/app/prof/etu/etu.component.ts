import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/Object/Etudiant';
import { Niveau } from 'src/app/Object/Niveau';
import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-etu',
  templateUrl: './etu.component.html',
  styleUrls: ['./etu.component.css']
})
export class EtuComponent implements OnInit {

  constructor(private profService: ProfService) { }

  ngOnInit(): void {
    this.getEtudiant();
  }
  result!:Etudiant[];
  Etudiants!: Etudiant[];
  Niveau: Niveau[] = [];
  index: number = 0;
  parcours:string="";
  nom:string ="";
  getEtudiant() {
    this.profService.getEtudiant().subscribe(
      (res) => {
        this.result = res;
        this.result.forEach((el) => {
          const a = this.Niveau.find((item) => {
            return item.idniveau == el.idniveau.idniveau;
          });
          if (!a) {
            this.Niveau.push(el.idniveau);
          }
        });
        this.Etudiants = this.result.filter((item)=>{
          return item.idniveau.idniveau == this.Niveau[this.index].idniveau;
        });
        this.parcours = this.Etudiants[0].idparcours.nom;
        this.nom = this.Niveau[this.index].nom;
      },
      (err) => {
        console.log(err.error)
      }
    );
  }
  selectNiveau(Niveau:Niveau){
    this.index = this.Niveau.indexOf(Niveau);
    this.Etudiants = this.result.filter((item)=>{
      return item.idniveau.idniveau == this.Niveau[this.index].idniveau
    });
    this.nom = this.Niveau[this.index].nom;
  }
}
