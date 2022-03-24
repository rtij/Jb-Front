import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { Article } from 'src/Object/Article';
import { Detlivrables } from 'src/Object/Detlivrable';
import { Livrables } from 'src/Object/Livrables';
import { Mouvement } from 'src/Object/Mvt';
import { fade } from 'src/Object/MyAnimations';
import { Stocke } from 'src/Object/Stocke';
import { Users } from 'src/Object/Users';

@Component({
  selector: 'app-livrable',
  templateUrl: './livrable.component.html',
  styleUrls: ['./livrable.component.css'], animations: [fade]
})
export class LivrableComponent implements OnInit {

  constructor(private UserService: UserService, private toastr: ToastrService) { }
  // Data
  User!: Users;
  Appro: Mouvement[] = [];
  Stocke: Stocke[] = [];
  Livrables!: Livrables;
  // Variables
  page: number = 1;

  // Page 1 
  typeL: string = "";
  datel!: Date;
  semainec: number = 0;
  ContactE: number = 0;
  Env: number = 0;
  numu: string = "";
  nbA: number = 0;

  // Page2
  SelectedStocke!: Stocke;
  sortie: number = 0;
  vente: number = 0;
  prix: number = 0;
  stockd: number = 0;
  approi: number = 0;
  valeur: Number = 0;
  Total1: number = 0;
  Total2: number = 0;
  Total3: number = 0;
  total: number = 0;

  DetAnimation: Detlivrables[] = [];
  DetDon: Detlivrables[] = [];
  DetLot: Detlivrables[] = [];


  tn: number = 1;
  index: number = 0;
  active:boolean = true;
  ngOnInit(): void {
    this.getUser();
  }


  getStockEquipe() {
    let s = this.UserService.Stocke;
    if (s.length != 0) {
      this.Stocke = s;
    } else {
      this.UserService.getStockEquipe().subscribe(
        (res) => {
          this.Stocke = res;
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  getUser() {
    let u = this.UserService.User;
    if (u) {
      this.User = u;
      this.getStockEquipe();
    } else {
      this.UserService.getUser().subscribe(
        (res) => {
          this.User = res;
          this.getStockEquipe();
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  selectStock(){
    if(this.SelectedStocke){
      this.prix = this.vente * this.SelectedStocke.idarticle.prixu;
    }
  }

  getMax(){
    let m = 0;
    if(this.SelectedStocke){
      return m = this.SelectedStocke.qte;
    }
    return m;
  }


  AddVenteAnimation(f: any) {
    this.Total1 = this.Total1 + this.prix;
    this.total = this.Total1;
    this.prix = this.SelectedStocke.idarticle.prixu * this.vente;
    let r = this.DetAnimation.find((item) => {
      return item.idstocke.idstocke == this.SelectedStocke.idstocke
    });
    if (r) {
      r.sortie = r.sortie + this.vente;
    } else {
      let da = new Detlivrables(this.Livrables, 'V', this.vente, this.prix, this.SelectedStocke);
      this.DetAnimation.push(da);
    }
    this.SelectedStocke.qte = this.SelectedStocke.qte - this.vente;
    this.prix = 0;
    f.reset();
  }

  AddDon(f:any) {
    this.Total2 = this.Total2 + this.prix;
    this.prix = this.SelectedStocke.idarticle.prixu * this.vente;
    let r = this.DetDon.find((item) => {
      return item.idstocke.idstocke == this.SelectedStocke.idstocke
    });
    if (r) {
      r.sortie = r.sortie + this.vente;
    } else {
      let da = new Detlivrables(this.Livrables, 'D', this.vente, this.prix, this.SelectedStocke);
      this.DetDon.push(da);
    }
    this.SelectedStocke.qte = this.SelectedStocke.qte - this.vente;
    this.prix = 0;
    f.reset();
  }

  AddLot(f:any) {
    this.Total3 = this.Total3 + this.prix;
    this.prix = this.SelectedStocke.idarticle.prixu * this.vente;
    let r = this.DetLot.find((item) => {
      return item.idstocke.idstocke == this.SelectedStocke.idstocke
    });
    if (r) {
      r.sortie = r.sortie + this.vente;
    } else {
      let da = new Detlivrables(this.Livrables, 'L', this.vente, this.prix, this.SelectedStocke);
      this.DetLot.push(da);
    }
    this.SelectedStocke.qte = this.SelectedStocke.qte - this.vente;
    this.prix = 0;
    f.reset();
  }

  Next() {
    this.page = this.page + 1;
  }

  Prev() {
    this.page = this.page - 1;
  }


  SaveLivrables() {
    let l = new Livrables(this.ContactE, this.Env, this.nbA, this.total, this.numu, this.semainec, this.typeL, this.datel, this.User);
    this.UserService.createLivrables(l).subscribe(
      (res) => {
        this.Livrables = res;
        this.SaveDetailsAnimation();
      },
      (err) => {
        console.log(err.error)
      }
    )
  }

  SaveDetailsAnimation() {
    if(this.index < this.DetAnimation.length){
      this.DetAnimation[this.index].idlivrables = this.Livrables;
      this.SaveIt(this.DetAnimation[this.index]);
    }else{
      this.index = 0;
      this.tn = this.tn + 1;
      this.SaveDonAnimation();
    }
  }

  SaveIt(Detlivrable:Detlivrables){
    this.UserService.SaveDetLivrables(Detlivrable).subscribe(
      (res)=>{
        this.index = this.index + 1;
        if(this.tn == 1){
          this.SaveDetailsAnimation();
        }else if(this.tn == 2){
          this.SaveDonAnimation();
        }else{
          this.SaveLot();
        }
        
      },
      (err)=>{
        console.log(err.error)
      }
    )
  }



  SaveDonAnimation() {
    if(this.index < this.DetDon.length){
      this.DetDon[this.index].idlivrables = this.Livrables;
      this.SaveIt(this.DetDon[this.index]);
    }else{
      this.index = 0;
      this.tn = this.tn + 1;
      this.SaveLot();
    }
  }

  SaveLot() {
    if(this.index < this.DetLot.length){
      this.DetLot[this.index].idlivrables = this.Livrables;
      this.SaveIt(this.DetLot[this.index]);
    }else{
      this.index = 0;
      this.tn = 0;
      this.Reset();
      this.page = 1;
      this.toastr.success("Enregistrement effecuer");
    }
  }

  Reset() {
    let n: any = null;
    this.nbA = 0;
    this.Env = 0;
    this.ContactE = 0;
    this.datel = n;
    this.typeL = "";
    this.numu = n;
    this.DetAnimation = [];
    this.DetDon = [];
    this.DetLot= [];
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.active = false;
  }
}
