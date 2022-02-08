import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocEtudiant } from 'src/app/Object/docEtudiant';
import { Documents } from 'src/app/Object/Documents';
import { Etudiant } from 'src/app/Object/Etudiant';
import { EtudiantService } from 'src/app/Service/etudiant.service';

@Component({
  selector: 'app-cours-reply',
  templateUrl: './cours-reply.component.html',
  styleUrls: ['./cours-reply.component.css']
})
export class CoursReplyComponent implements OnInit {

  cours!: Documents;
  Etudiant!: Etudiant;
  File!: FileList;
  nombre: number = 0;
  titre: string = "";
  description: string = "";
  filename: string = "";
  lastDocEtudiant!: DocEtudiant;
  constructor(private EtudiantService: EtudiantService, private router: Router) { }

  ngOnInit(): void {
    this.getSelectedCours();
  }

  getSelectedCours() {
    let it = this.EtudiantService.selectedCours;
    if (it) {
      this.cours = this.EtudiantService.selectedCours;
    } else {
      this.router.navigate(['/Etudiant/Cours']);
    }
  }

  getEtudiant() {
    let student = this.EtudiantService.Etudiants;
    if (student) {
      this.Etudiant = student;
    }
    else {
      this.EtudiantService.getEtudiant().subscribe
        ((res) => {
          this.Etudiant = res;
        },
          (err) => {
            console.log(err.error)
          })
    }

  }

  SaveResponse() {
    let d = new DocEtudiant(this.titre, this.description, new Date(), this.filename,"", this.Etudiant, this.EtudiantService.selectedCours, false,);
    this.EtudiantService.SendCoursReply(d).subscribe(
      (res) => {
        this.lastDocEtudiant = res;
        console.log(this.lastDocEtudiant);
        if (this.nombre != 0) {
          this.SaveFile();
        }
      },
      (err) => {
        console.log(err.error)
      }
    )

  }

  SaveFile() {
    const fd = new FormData();
    console.log("send file")
    fd.append('file', this.File[0], this.File[0].name);
    this.EtudiantService.SendCoursResponseFile(fd).subscribe
      (
        (res) => {
          alert("Reponse envoyer");
          this.router.navigate(['/Etudiant/Cours']);
        },
        (err) => {
          alert("Echec de l'envoie du fichier")
          console.log(err.error);
        }
      )
  }

  SelectFile(event: any) {
    this.File = event.target.files;
    this.nombre = this.File.length;
    console.log(this.nombre);
  }

  UnselectCours() {
    let it: any = undefined;
    this.EtudiantService.selectedCours = it;
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.UnselectCours();
  }



}
