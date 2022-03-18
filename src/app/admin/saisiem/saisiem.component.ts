import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { Article } from 'src/Object/Article';
import { DetailsMvt } from 'src/Object/Detmvt';
import { HistoStock } from 'src/Object/Histostock';
import { Histoe } from 'src/Object/Histostocke';
import { Mouvement } from 'src/Object/Mvt';
import { fade } from 'src/Object/MyAnimations';
import { Stocke } from 'src/Object/Stocke';
import { Users } from 'src/Object/Users';

@Component({
  selector: 'app-saisiem',
  templateUrl: './saisiem.component.html',
  styleUrls: ['./saisiem.component.css'], animations: [fade]
})
export class SaisiemComponent implements OnInit {

  constructor(private AdminService: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getArticleListe();
    this.getUserListe();
  }
  // Data list
  UserL: Users[] = [];
  Articles: Article[] = [];

  // Variables
  next: boolean = false;
  action: string = "";
  idDestinataire: string = "";
  livreur: string = "";
  RefDoc: string = "";
  Origine: string = "";
  idsource: string = "";
  qte: number = 0;
  index: number = 0;
  destinatairef: string = "";
  SelectedUserS!: Users;
  SelectedUserD!: Users;
  SelectedA!: Article;
  issource: boolean = false;
  aretourner: boolean = false;
  dateM!: Date;
  dateR!: Date;
  usages: string = "";
  couleur: string = "";
  typea: string = "";
  Mouvement!: Mouvement;
  DetListe: DetailsMvt[] = [];
  Article!:Article;
  Stocke!:Stocke;

  Next() {
    this.next = true;
  }

  Prev() {
    this.next = false;
  }

  getUserListe() {
    let l = this.AdminService.UserListe;
    if (l.length != 0) {
      this.UserL = l;
      this.filterUserListe();
    } else {
      this.AdminService.getUserListe().subscribe(
        (res) => {
          this.UserL = res;
          this.filterUserListe();
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  filterUserListe() {
    this.UserL = this.UserL.filter((item) => {
      return item.idtypeu.destypeu == 'Simple';
    });
  }

  getArticleListe() {
    let l = this.AdminService.Artilcles;
    if (l.length != 0) {
      this.Articles = l
    } else {
      this.AdminService.getArticleListe().subscribe(
        (res) => {
          this.Articles = res;
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  setSource() {
    if (this.SelectedUserS) {
      let a: any = null;
      this.SelectedUserS = a;
    } else {

    }
  }

  SelectArticle() {

  }

  SaveMvt() {
    this.index = 0;
    let s: any = null;

    if (this.Origine != 'Equipe') {
      this.SelectedUserS = s;
    } else {
      this.idsource = "";
    }
    if (this.destinatairef != 'Equipe') {
      this.SelectedUserD = s;
    } else {
      this.idDestinataire = "";
    }
    let m = new Mouvement(this.action, this.dateM, this.Origine, this.idsource, this.SelectedUserS, this.SelectedUserD, this.destinatairef, this.livreur, this.RefDoc, this.idDestinataire,[]);
    this.AdminService.SaveMvt(m).subscribe
      (
        (res) => {
          this.Mouvement = res;
          this.SaveDetMvt();
        },
        (err) => {
          console.log(err.error)
        }
      )


  }

  AddDet() {
    let n: any = null;
    if (this.SelectedA.type != 'Matériels') {
      this.couleur = "";
      if (!this.aretourner) {
        this.dateR = n;
      }
    }
    let d = new DetailsMvt(this.Mouvement, this.usages, this.SelectedA, this.qte, this.couleur, this.dateR, this.aretourner, false);
    this.DetListe.push(d);
    this.Reset();

  }

  Reset() {
    let n: any = null;
    this.usages = "";
    this.qte = 0;
    this.couleur = "";
    this.dateR = n;
    this.aretourner = n;
    this.SelectedA = n;
  }


  SaveDetMvt() {
    if (this.index < this.DetListe.length) {
      this.DetListe[this.index].idmvt = this.Mouvement;
      this.AdminService.SaveDetMvt(this.DetListe[this.index]).subscribe
        ((res) => {
          this.CheckUpdateStock();
          this.toastr.info('Details '+this.index+ ' Enregistrer' );
        },
          (err) => {
            console.log(err.error)
          })
    } else {
      this.toastr.success("Enregistrement effectuer");
      this.Reset();
      this.ReInitialize();
      this.next = false;
      this.DetListe = [];
      this.index = 0;
    }
  }

  CheckUpdateStock(){
    let r:boolean = false;
    if(this.Origine == 'Tandem'){
      r = true
    }
   // check destinataire
   if(this.destinatairef == 'Tandem'){
     r = true;
   }
   if(!r){
     this.checkUpdateStockEquipe();
   }else{
     this.UpdateStock();
   }
  }

  UpdateStock() {
    // check source
    let qte = 0;
    if(this.Origine == 'Tandem'){
       qte = 0 -  this.DetListe[this.index].qte;
    }
    // check destinataire
    if(this.destinatairef == 'Tandem'){
      qte = this.DetListe[this.index].qte;
    }
    let article:Article  = this.DetListe[this.index].idarticle;
    this.AdminService.UpdateStock(qte, article).subscribe(
      (res)=>{
        this.Article = res;
        article = res;
        this.SavehistoStock(article,qte);
      },
      (err)=>{
        console.log(err.error)
      }
    )
  }

  checkUpdateStockEquipe(){
    let r:boolean = false;
    if(this.Origine == 'Equipe'){
    let qte =  0 -  this.DetListe[this.index].qte;
      this.UpdateStockEquipe(this.SelectedUserS,qte);
      r = true;
    }
    if(this.destinatairef == 'Equipe'){
      this.UpdateStockEquipe(this.SelectedUserD,  this.DetListe[this.index].qte);
      r = true;
    }
    if(!r){
      this.index = this.index + 1;
      this.SaveDetMvt();
    }
  }

  UpdateStockEquipe(Users:Users, Qte:number){
    let e:any = Users.idequipe;
    let s = new Stocke(e,this.DetListe[this.index].idarticle,Qte);
    this.AdminService.UpdateStockEquipe(s).subscribe(
      (res)=>{
        this.Stocke = res;
        this.SaveHistoStockEquipe();
      },
      (err)=>{
        console.log(err.error);
      }
    )
    
  }

  SavehistoStock(Article:Article, qte:number){
    let qtes:number = 0;
    let qtee:number = 0;
    if(qte<0){
      qtes = - (qte)
    }else{
      qtee = qte;
    }
    let h = new HistoStock(new Date(), qtes,Article.qte, qtee, Article);
    this.AdminService.SaveHistoStock(h).subscribe(
      (res)=>{
        this.checkUpdateStockEquipe();
      },  
      (err)=>{
        console.log(err.error)
      }
    )
  }

  

  SaveHistoStockEquipe() {
    let qtes = 0;
    let qtee = 0;
    if(this.Origine == 'Equipe'){
      qtes =  this.DetListe[this.index].qte;
    }
    if(this.destinatairef == 'Equipe'){
      qtee = this.DetListe[this.index].qte;
    }
    let h:Histoe = new Histoe(new Date(), qtee, qtes, this.Stocke.qte, this.Stocke);
    this.AdminService.saveHistoStockE(h).subscribe(
      (res)=>{
        this.index = this.index + 1;
        this.SaveDetMvt();  
      },
      (err)=>{
        console.log(err.error);
      }
    )
  }

  RemoveDetails(DetM: DetailsMvt) {
    this.DetListe = this.DetListe.filter((item) => {
      return item != DetM;
    });
  }

  ReInitialize() {
    let n:any = null;
    this.action = "";
    this.issource = false;
    this.next = false;
    this.RefDoc = "";
    this.livreur ="";
    this.SelectedUserD = n;
    this.SelectedUserS = n;
    this.dateM = n;
    this.destinatairef = "";
    this.idDestinataire = "";
    this.idsource = "";
    this.Origine = "";
  }

  // 
}
