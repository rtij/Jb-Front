import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { Article } from 'src/Object/Article';
import { fade } from 'src/Object/MyAnimations';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'], animations: [fade]
})
export class ArticleComponent implements OnInit {

  constructor(private Adminservice: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getArticleListe();
  }
  selectedArticle!: Article;
  type: string = "";
  designation: string = "";
  prixu: number = 0;
  Articles: Article[] = [];
  qte:number = 0;
  show: boolean = false;


  getArticleListe() {
    let l = this.Adminservice.Artilcles;
    if (l.length != 0) {
      this.Articles = l;
    } else {
      this.Adminservice.getArticleListe().subscribe
        ((res) => {
          this.Articles = res;
        },
          (err) => {
            console.log(err.error)
          })
    }
  }

  modifier(){
    if(!this.selectedArticle){
      this.toastr.warning("Selectionner un article d'abord");
    }else{
      this.show = true;
    }
  }

  SaveData() {
    if (this.selectedArticle) {
      this.UpdateArticle()
    }else{
      this.SaveArticle();
    }
  }

  SaveArticle() {
    let a = new Article(this.designation,this.type,this.qte,this.prixu,false);
    this.Adminservice.createArticle(a).subscribe(
      (res)=>{
        this.toastr.success("Enregistrement effectuer");
        this.Articles = res;
        this.Reset();
        this.show = false;
      },
      (err) => {
        console.log(err.error)
      }
    )
  }


  UpdateArticle() {
    this.selectedArticle.type = this.type;
    this.selectedArticle.prixu = this.prixu;
    this.selectedArticle.designation = this.designation;
    this.Adminservice.updateArticle(this.selectedArticle).subscribe(
      (res) => {
        this.toastr.success("Modification terminer");
        this.Articles = res;
        this.Reset();
        this.show  = false;
      },
      (err) => {
        console.log(err.error)
      }
    )
  }

  showBox() {
    this.Reset();
    this.show = true;
  }

  hideBox() {
    this.Reset();
    this.show = false;
  }
  Reset() {
    let a: any = null;
    this.selectedArticle = a;
    this.designation ="";
    this.qte = 0;
    this.prixu = 0;
    this.type = "";
  }

  SelectArticle(Article:Article){
    this.selectedArticle = Article;
    this.prixu = this.selectedArticle.prixu;
    this.designation = this.selectedArticle.designation;
    this.type = this.selectedArticle.type;
  }

  DeleteArticle(){
    if(!this.selectedArticle){
      this.toastr.warning("Selectionner un article d'abord");
    }else{
      if(confirm("Voulez vous vraiment supprimer cette article")){
        this.selectedArticle.issup = true;
        this.Adminservice.updateArticle(this.selectedArticle).subscribe(
          (res)=>{
            this.toastr.success("Suppréssion effectuer");
            this.Reset();
          },
          (err)=>{
            console.log(err.error);
          }
        )
      }
    }
  }
}
