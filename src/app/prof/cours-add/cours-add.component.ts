import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocLien } from 'src/app/Object/DocLien';
import { Documents } from 'src/app/Object/Documents';
import { ModuleProfesseur } from 'src/app/Object/ModuleProfesseur';
import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-cours-add',
  templateUrl: './cours-add.component.html',
  styleUrls: ['./cours-add.component.css']
})
export class CoursAddComponent implements OnInit {

  constructor(private ProfService: ProfService, private router: Router) { }

  ngOnInit(): void {
    this.getModule();
  }
  Module!: ModuleProfesseur[];
  diffusion!: Date;
  expiration!: Date;
  aRendre!: Date;
  titre!: string;
  description!: string;
  type!: string;
  module!: ModuleProfesseur;
  docLien: DocLien[] = [];
  File!: FileList;
  nombre: number = 0;
  index: number = 0;
  last: number = 0;
  id!: number;

  setModule() {
    const result = this.Module.find((item) => {
      return item.idprofesseurModule == this.id;
    });
    if (result) {
      this.module = result;
    }
  }


  getModule() {
    this.ProfService.getCours().subscribe(
      (res) => {
        this.Module = res;
        if (this.Module.length = 1) {
          this.module = this.Module[0];
        }
      },
      (err) => {
        console.log(err.error)
      }
    );
  }

  addCours() {
    const document = new Documents(this.aRendre, this.module.idmodule, this.module.idniveau, this.module.idparcours, this.expiration, this.diffusion, new Date(), this.description, this.titre, this.type, this.docLien, false);
    console.log(document);
    this.ProfService.AddDocs(document).subscribe(
      (res) => {
        this.getLast();
      },
      (err) => {
        console.log(err.error);
      }
    )
  }
  showType() {
    alert(this.type);
  }

  onSelectFile(event: any) {
    this.File = event.target.files;
    this.nombre = this.File.length;
    console.log(this.nombre);
  }


  uploadFile() {
    const fd = new FormData();
    fd.append('file', this.File[this.index], this.File[this.index].name);
    console.log(fd);
    this.ProfService.UploadDoc(fd, this.last).subscribe(
      (res) => {
        if (this.index < this.nombre -1) {
          this.index = this.index + 1;
          this.uploadFile();
          console.log(this.index);
        }
        else {
          alert("Enregistrement effectuer");
          this.router.navigate(['/prof']);
        }
      },
      (err) => {
        console.log(err.error);
      }
    )
  }

  getLast() {
    this.ProfService.getLastID().subscribe(
      (res) => {
        this.last = res;
        this.uploadFile();
      },
      (err) => {
        console.log(err.error);
      }
    )
  }
}
