import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/Object/Etudiant';
import { Niveau } from 'src/app/Object/Niveau';
import { Parcours } from 'src/app/Object/Parcours';
import { ParcoursN } from 'src/app/Object/ParcoursNiveau';
import { Responsabilite } from 'src/app/Object/Responsabilite';
import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-etu',
  templateUrl: './etu.component.html',
  styleUrls: ['./etu.component.css']
})
export class EtuComponent implements OnInit {

  constructor(private profService: ProfService) { }

  ngOnInit(): void {
    this.getProf();
  }
  result: Etudiant[] = [];
  Etudiants: Etudiant[] = [];
  selectedEtudiant!: Etudiant;
  Niveau: Niveau[] = [];
  index: number = 0;
  parcours: string = "";
  nom: string = "";
  message: string = "";
  url: string = "";
  File!: FileList;
  filename = "";
  nombre: number = 0;
  validMessage: boolean = false;
  Responsabilite: Responsabilite[] = [];
  EtudiantListe: Etudiant[] = [];
  // EtudiantR list
  ParcoursL: Parcours[] = [];
  data: ParcoursN[] = [];
  selectedParcoursN!:ParcoursN;
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
        this.Etudiants = this.result.filter((item) => {
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

  checkNiveau() {
    this.result.forEach((el) => {
      const a = this.Niveau.find((item) => {
        return item.idniveau == el.idniveau.idniveau;
      });
      if (!a) {
        this.Niveau.push(el.idniveau);
      }
    });
  }

  // Get Etudiant by parcours and niveau
  getProf() {
    let p = this.profService.Prof;
    if (p) {
      this.getProfesseurResponsabilite();
    } else {
      this.profService.getProf().subscribe
        ((res) => {
          this.getProfesseurResponsabilite();
        })
    }
  }


  // Add Etudiant by Responsabilite liste
  getProfesseurResponsabilite() {
    // Set professeur Liste from responsabilite
    this.profService.GetResponsabilite().subscribe((res) => {
      if (res != []) {
        let l = this.profService.EtudiantResponsabiliteListe;
        if (l.length == 0) {
          this.Responsabilite = res;
          this.getEtudiantResponsable();
        } else {
          this.result = l;
        }
      }
    })
  }

  checkParcoursListe(Parcours: Parcours) {
    let r = this.ParcoursL.find((item) => {
      return item.idparcours == Parcours.idparcours
    });
    if (r) {
      return true;
    } else {
      this.ParcoursL.push(Parcours);
    }
    return false;
  }

  // GetEtudiantBy moduleprof parcours
  getEtudiantResponsable() {
    let r = this.profService.ResponsabiliteListe;

    if (this.index < r.length) {
      if (this.checkParcoursListe(r[this.index].idparcours) == false) {
        this.ParcoursL.push(r[this.index].idparcours);
        this.profService.getEtudiantByParcours(r[this.index].idparcours).subscribe
          (
            (res) => {
              this.EtudiantListe = res;
              this.CheckEtudiantListe();
            }, (err) => {
              console.log(err.error)
            }
          )
      } else {
        this.index = this.index + 1;
        this.getEtudiantResponsable();
      }
    } else {
      this.index = 0;
      this.profService.EtudiantResponsabiliteListe = this.result;
      this.getNiveauAndParcours();
    }
  }

  CheckEtudiantListe() {
    this.EtudiantListe.forEach((item) => {
      let r = this.Etudiants.find((etu) => {
        return etu.idetudiant == item.idetudiant
      });
      if (!r) {
        this.Etudiants.push(item);
      }
    });
    this.index = this.index + 1;
    this.getEtudiantResponsable();
  }

  getNiveauAndParcours() {
    this.result.forEach((item) => {
      let r = this.data.find((it)=>{
        return it.parcours.idparcours == item.idparcours.idparcours
      });
      if(!r){
        this.data.push(new ParcoursN(item.idparcours,[item.idniveau]));
      }else{
        let n = r.Niveau.find((niv)=>{
          return item.idniveau.idniveau == niv.idniveau
        });
        if(!n){
          r.Niveau.push(item.idniveau);
        }
      }
    });
    this.parcours = this.data[0].parcours.nom;
    this.nom = this.data[0].Niveau[0].nom;
    this.selectedParcoursN = this.data[0];
    this.Niveau = this.selectedParcoursN.Niveau;
    this.Etudiants = this.result.filter((item)=>{
      return item.idparcours.nom == this.parcours && item.idniveau.nom == this.nom
    });
  }

  // On change function

  SetEtudiant(){
    let ParcoursN = this.selectedParcoursN;
    this.parcours = ParcoursN.parcours.nom;
    this.nom = ParcoursN.Niveau[0].nom;
    this.Etudiants = this.result.filter((item)=>{
      return item.idparcours.nom == this.parcours && item.idniveau.nom == this.nom
    });
  }


  // On change select

  selectNiveau(Niveau: Niveau) {
    this.index = this.Niveau.indexOf(Niveau);
    this.Etudiants = this.result.filter((item) => {
      return item.idniveau.idniveau == this.Niveau[this.index].idniveau
    });
    this.nom = this.Niveau[this.index].nom;
  }

  selectEtudiant(Etudiant: Etudiant) {
    this.selectedEtudiant = Etudiant;
    this.profService.selectedEtudiant = Etudiant;
  }

  // Message Function
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
      this.profService.SendEtudiantMessage(message).subscribe(
        (res) => {
          if (!this.File[0]) {
            alert("Message envoyé");
          }
          document.getElementById('dismissM')?.click();
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
    let file: any = "";
    if (this.File) {
      file = this.File[0];
    }
    if (file) {
      fd.append('file', file);
      this.profService.SendEtudiantMessageFile(fd).subscribe(
        (res) => {
          alert("Message envoyé");
        }
      )
    }
  }
}
