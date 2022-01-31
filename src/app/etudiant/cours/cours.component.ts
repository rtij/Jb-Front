import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Documents } from 'src/app/Object/Documents';
import { Etudiant } from 'src/app/Object/Etudiant';
import { DateToShortDate } from 'src/app/Object/Function';
import { Module } from 'src/app/Object/Module';
import { ModuleProfesseur } from 'src/app/Object/ModuleProfesseur';
import { EtudiantService } from 'src/app/Service/etudiant.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  search: string;
  Documents: Documents[] = [];
  AllCours: Documents[] = [];
  module: Module[] = [];
  Etudiant!: Etudiant;
  selectedModule!: Module;
  ModuleProfesseur: ModuleProfesseur[] = [];
  constructor(private EtudiantService: EtudiantService,private router:Router) {
    this.search = "";
  }

  ngOnInit(): void {
    this.getEtudiant();
  }

  // GetData function
  getEtudiant() {
    const student = this.EtudiantService.sendEtudiant();
    if (!student) {
      this.EtudiantService.getEtudiant().subscribe(
        (res) => {
          this.Etudiant = res;
          this.getProfesseur();
          this.getCours();
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
    else {
      this.Etudiant = student;
      this.getProfesseur();
      this.getCours();
    }
  }

  getProfesseur() {
    const moduleProf = this.EtudiantService.ModuleProfesseurListe;
    if (moduleProf.length != 0) {
      if (moduleProf[0].idparcours.idparcours != this.Etudiant.idparcours.idparcours) {
        this.EtudiantService.getEtudiantProfs().subscribe
          ((res) => {
            this.ModuleProfesseur = res;
            this.ModuleProfesseur.map((item) => {
              this.SetModuleListe(item);
            });
          },
            (err) => {
              console.log(err.error)
            })
      }
      this.ModuleProfesseur = moduleProf;
      this.ModuleProfesseur.map((item) => {
        this.SetModuleListe(item);
      });
    }
    else {
      this.EtudiantService.getEtudiantProfs().subscribe
        ((res) => {
          this.ModuleProfesseur = res;
          this.ModuleProfesseur.map((item) => {
            this.SetModuleListe(item);
          });
        },
          (err) => {
            console.log(err.error)
          })
    }
  }

  getCours() {
    const doc:Documents[] = this.EtudiantService.getDocuments();
    if(doc.length != 0){
      this.AllCours = doc;
      this.Documents = doc;
      this.FormateCours();
    }
    else{
      this.EtudiantService.getCours().subscribe
      ((res) => {
        this.AllCours = res;
        this.Documents = res;
        this.FormateCours();
      },
        (err) => {
          console.log(err.error)
        })
    }
  }
  // Action function
  
  FormateCours()
  {
    this.Documents.map((item) => {
      if (item.aRendre) {
        item.aRendre = DateToShortDate(item.aRendre);
      }
      item.creation = DateToShortDate(item.creation);
      item.expiration = DateToShortDate(item.expiration);
      item.diffusion = DateToShortDate(item.diffusion);
    });
  }

  ResetListe() {
    this.Documents = this.AllCours;
  }

  SelectModule(Module: Module) {
    this.selectedModule = Module;
    this.Documents = this.AllCours.filter((item) => {
      return item.idmodule.idmodule == Module.idmodule;
    });
  }

  SetModuleListe(Document: ModuleProfesseur) {
    const result: any = this.module.find((item) => {
      return item.idmodule == Document.idmodule.idmodule
    });
    if (!result) {
      this.module.push(Document.idmodule);
    }
  }

  showAll() {
    this.Documents = this.AllCours;
    const it: any = null;
    this.selectedModule = it;
  }

  SelectCours(doc:Documents){
    this.EtudiantService.selectedCours = doc;
    let it = this.EtudiantService.selectedCours;
    if(it){
      this.router.navigate(['/Etudiant/Cours/Reply']);    
    }
  }
}
