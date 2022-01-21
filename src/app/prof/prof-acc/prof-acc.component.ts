import { Component, OnInit } from '@angular/core';
import { Documents } from 'src/app/Object/Documents';
import { ProfService } from 'src/app/prof.service';
import { DateToShortDate } from 'src/app/Object/Function';
import { ModuleProfesseur } from 'src/app/Object/ModuleProfesseur';
import { DocLien } from 'src/app/Object/DocLien';
@Component({
  selector: 'app-prof-acc',
  templateUrl: './prof-acc.component.html',
  styleUrls: ['./prof-acc.component.css']
})
export class ProfAccComponent implements OnInit {

  constructor(private professeurService: ProfService) { }

  ngOnInit(): void {
    this.getCours();
    this.getDocs();
    this.getModule();
  }
  ModuleProf!: ModuleProfesseur[];
  Docs!: Documents[];
  Doc!: Documents[];
  selectedDoc!: Documents;
  search: string = "";
  Module!: ModuleProfesseur[];
  docLien: DocLien[] = [];
  File!: FileList;
  nombre: number = 0;
  index: number = 0;
  titre:string="";

  getDocs() {
    this.professeurService.getDocs().subscribe((res) => {
      this.Doc = res;
      this.Docs = res;
      this.Doc.map((item) => {
        if (item.aRendre) {
          item.aRendre = DateToShortDate(item.aRendre);
        }
        item.creation = DateToShortDate(item.creation);
        item.expiration = DateToShortDate(item.expiration);
        item.diffusion = DateToShortDate(item.diffusion);
      });
    },
      (err) => {
        console.log(err.error);
      }
    );
  }

  getModule() {
    this.professeurService.getCours().subscribe(
      (res) => {
        this.Module = res;
      },
      (err) => {
        console.log(err.error)
      }
    );
  }
  getCours() {
    this.professeurService.getCours().subscribe((res) => {
      this.ModuleProf = res;
    },
      (err) => {
        console.log(err.error);
      }
    );
  }
  selectCours(docs: Documents) {
    this.Doc = this.Docs;
    this.selectedDoc = docs;
    this.titre = docs.titre;
    this.Doc = this.Doc.filter((item) => {
      return item == docs
    });
  }

  showAll() {
    this.Doc = this.Docs;
    this.titre = "";
    const it:any =null;
    this.selectedDoc = it;
  }
  
  deleteDoc(it: Documents) {
    if (confirm("Voulez-vous vraiment supprimer cette doument?")) {
      this.selectedDoc = it;
      this.selectedDoc.suppr = true;
      this.professeurService.RemoveDoc(this.selectedDoc).subscribe(
        (res) => {
          this.Doc = res;
          this.Docs = res;
          this.Doc.map((item) => {
            if (item.aRendre) {
              item.aRendre = DateToShortDate(item.aRendre);
            }
            item.creation = DateToShortDate(item.creation);
            item.expiration = DateToShortDate(item.expiration);
            item.diffusion = DateToShortDate(item.diffusion);
          });
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
  }
  
  selectDoc(it: Documents) {
    this.selectedDoc = it;
  }


  onSelectFile(event: any) {
    this.File = event.target.files;
    this.nombre = this.File.length;
  }

  uploadFile() {
    const fd = new FormData();
    fd.append('file', this.File[this.index], this.File[this.index].name);
    console.log(fd);
    this.professeurService.UploadDoc(fd,this.selectedDoc.iddocument!).subscribe(
      (res) => {
        console.log(res);
        if (this.index < this.nombre) {
          this.index = this.index + 1;
          this.uploadFile();
        }
      },
      (err) => {
        console.log(err.error);
      }
    )
  }

  removeDoclien(it: DocLien) {
    this.professeurService.RemoveDocLien(it).subscribe((res)=>{
      this.Doc = res;
      this.Docs = res;
      this.Doc.map((item) => {
        if (item.aRendre) {
          item.aRendre = DateToShortDate(item.aRendre);
        }
        item.creation = DateToShortDate(item.creation);
        item.expiration = DateToShortDate(item.expiration);
        item.diffusion = DateToShortDate(item.diffusion);
      });
      const doc = this.Docs.find((item)=>{
        return item.iddocument == this.selectedDoc.iddocument;
      });
      if(doc){
        this.selectedDoc = doc;
      }
      alert("Fichier supprimer");
    },(err)=>{
      console.log(err.error);
    }
    )
  }
}
