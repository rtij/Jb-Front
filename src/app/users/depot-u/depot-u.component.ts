import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { Article } from 'src/Object/Article';
import { Depotu } from 'src/Object/Depotu';
import { Stocke } from 'src/Object/Stocke';
import { Tsena } from 'src/Object/Tsena';
import { Users } from 'src/Object/Users';

@Component({
  selector: 'app-depot-u',
  templateUrl: './depot-u.component.html',
  styleUrls: ['./depot-u.component.css']
})
export class DepotUComponent implements OnInit {

  constructor(private UserService: UserService, private Toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUser();
    this.getTsenaListe();
    this.getStock();
  }
  // Data
  User!: Users;
  Articles: Article[] = [];
  TsenaL: Tsena[] = [];
  selectedTsena!: Tsena;
  Stocke: Stocke[] = [];
  Urnes: Stocke[] = [];
  // Variable
  SelectedArticle!: Article;
  responsable: string = "";
  tel1: string = "";
  tel2: string = "";
  tel3: string = "";
  adrt: string = "";
  adrt2: string = "";
  nomp: string = "";
  nomt: string = "";
  dateno!: Date;
  dated!: Date;
  heured!: Time;
  nb: number = 1;
  jourf: string = "";
  typet: string = "";
  reperage: string = "";
  niveau: string = "";
  hfermeture!: Time;
  houverture!: Time;
  numu: string = "";
  nbenv: number = 0;
  nbaff: number = 0;
  place: string = "";
  ouvert: boolean = false;
  datef!: Date;
  codet!: number;

  getUser() {
    let u = this.UserService.User;
    if (u) {
      this.User = u;
      this.getStock();
    } else {
      this.UserService.getUser().subscribe(
        (res) => {
          this.getStock();
          this.User = res;
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  VerifyQte(){
    if(this.SelectedArticle){
      if(this.nb <= this.SelectedArticle.qte){
        return true;
      }
    }
    return false;
  }

  FindTsena() {
    if (this.codet) {
      let r = this.TsenaL.find((item) => {
        return item.codet == this.codet;
      });
      if (r) {
        this.selectedTsena = r;
        this.houverture = this.selectedTsena.houverture;
        this.hfermeture = this.selectedTsena.hfermeture;
        this.tel1 = this.selectedTsena.tel1
        this.tel2 = this.selectedTsena.tel2;
        this.tel3 = this.selectedTsena.tel3;
        this.adrt = this.selectedTsena.adrt;
        this.adrt2 = this.selectedTsena.adrt2;
        this.datef = this.selectedTsena.datef;
        this.reperage = this.selectedTsena.reperage;
        this.nomp = this.selectedTsena.proprietaire;
        this.nomt = this.selectedTsena.nomt;
        this.jourf = this.selectedTsena.jourf;
        this.dateno = this.selectedTsena.datef;
      }
    }
  }


  SaveData(e: any) {
    if (!this.selectedTsena) {
      this.SaveTsena(e);
    } else {
      this.SaveDepot(e, this.selectedTsena);
    }
  }

  getTsenaListe() {
    let l = this.UserService.Tsena;
    if (l.length != 0) {
      this.TsenaL = l;
    } else {
      this.UserService.getTsenaListe().subscribe(
        (res) => {
          this.TsenaL = res;
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
  }

  SaveDepot(f: any, Tsena: Tsena) {
    let d = new Depotu("Dépot urnes", this.dated, this.heured, this.SelectedArticle.designation, this.numu, this.nb, this.place, Tsena, this.User, this.nbenv, this.nbaff);
    this.UserService.SaveDepot(d).subscribe(
      (res) => {
        this.UpdateEquipeStock();
        f.reset();
      },
      (err) => {
        console.log(err.error)
      }
    )
  }


  SaveTsena(f: any) {
    let u: any = this.User;
    let t = new Tsena(this.nomt, this.nomp, this.responsable, this.typet, this.reperage, u.idequipe?.localite, u.idequipe?.faritany, u.idequipe?.zonea, u.idequipe?.quartierv, this.adrt, this.adrt2, this.tel1, this.tel2, this.tel3, this.niveau, this.hfermeture, this.houverture, this.jourf, this.datef, this.ouvert, u.idequipe.idvillei);
    this.UserService.CreateTsena(t).subscribe(
      (res) => {
        let t = res;
        this.UserService.getTsenaListe().subscribe(
          (res) => {
            this.TsenaL = res;
            this.SaveDepot(f, t);
          },
          (err) => {
            console.log(err.error);
          }
        )
      },
      (err) => {
        console.log(err.error)
      }
    )
  }

  UpdateEquipeStock() {
    this.UserService.UpdateStockEquipe(this.SelectedArticle, this.nb).subscribe(
      (res)=>{
        this.Stocke = res;
        this.Toastr.success('Enregistrement effectuer');
        this.FilterArticle();
      },
      (err)=>{
        console.log(err.error)
      }
    )
  }

  FilterArticle() {
    this.Urnes = this.Stocke.filter((item) => {
      return item.idarticle.type == 'Urne';
    })
  }


  getStock() {
    let s = this.UserService.Stocke;
    if (s.length != 0) {
      this.Stocke = s;
      this.FilterArticle();
    } else {
      this.UserService.getStockEquipe().subscribe(
        (res) => {
          this.Stocke = res;
          this.FilterArticle();
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
  }
}
