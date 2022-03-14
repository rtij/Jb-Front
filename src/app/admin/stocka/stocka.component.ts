import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Article } from 'src/Object/Article';

@Component({
  selector: 'app-stocka',
  templateUrl: './stocka.component.html',
  styleUrls: ['./stocka.component.css']
})
export class StockaComponent implements OnInit {

  constructor(private AdminService:AdminService) { }

  ngOnInit(): void {
    this.getArticle();
  
  }
  Articles:Article[] = [];
  search:string="";

  getArticle(){
    let l = this.AdminService.Artilcles;
    if(l.length != 0){
      this.Articles = l
    }else{
      this.AdminService.getArticleListe().subscribe(
        (res)=>{
          this.Articles = res;
          this.UpdateArticle();
        },
        (err)=>{
          console.log(err.error)
        }
      )
    }
  }


  UpdateArticle(){
    setTimeout(()=>{
      this.AdminService.getArticleListe().subscribe(
        (res)=>{
          this.Articles = res;
          this.UpdateArticle();
        },
        (err)=>{
          console.log(err.error)
        }
      )
    },60000
    )
  }
}
