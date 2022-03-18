import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
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
  vente:number = 0;
  prix:number = 0;
  stockd:number = 0;  
  approi:number = 0;
  valeur:Number = 0;
  Total1: number = 0;
  Total2: number = 0;
  Total3: number = 0;
  total:number = 0;
  ngOnInit(): void {
    this.getUser();
  }


  getStockEquipe() {
    let s = this.UserService.Stocke;
    if (s.length != 0) {
      this.Stocke = s
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
      this.User = u
    } else {
      this.UserService.getUser().subscribe(
        (res) => {
          this.User = res;
          this.getApproEquipe();
          this.getStockEquipe();
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  getApproEquipe() {
    this.UserService.getApproUser().subscribe(
      (res) => {
        this.Appro = res;
      },
      (err) => {
        console.log(err.error)
      }
    )
  }

  AddVenteAnimation(){

  }

  AddDon(){

  }

  AddLot(){
    
  }

  Next() {
    this.page = this.page + 1;
  }

  Prev() {
    this.page = this.page - 1;
  }


  SaveLivrables() {
    let l = new Livrables(this.ContactE,this.Env,this.nbA,this.total,this.numu, this.semainec,this.typeL,this.datel, this.User);

  }

  SaveDetLivrables() {

  }

  Reset() {
    let n: any = null;
    this.nbA = 0;
    this.Env = 0;
    this.ContactE = 0;
    this.datel = n;
    this.typeL = "";
  }
}
