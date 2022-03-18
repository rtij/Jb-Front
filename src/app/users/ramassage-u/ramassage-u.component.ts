import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { Article } from 'src/Object/Article';
import { Depotu } from 'src/Object/Depotu';
import { Ramassage } from 'src/Object/Ramassage';
import { Stocke } from 'src/Object/Stocke';
import { Tsena } from 'src/Object/Tsena';
import { Users } from 'src/Object/Users';

@Component({
  selector: 'app-ramassage-u',
  templateUrl: './ramassage-u.component.html',
  styleUrls: ['./ramassage-u.component.css']
})
export class RamassageUComponent implements OnInit {

  constructor(private UserService: UserService, private Toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUser();
    this.getTsena();
  }
  // data
  action:string="Saisie ramassage urnes"
  User!: Users;
  Articles: Article[] = [];
  DepotL: Depotu[] = [];
  TsenaL: Tsena[] = [];
  Stocke: Stocke[] = [];
  Urnes: Stocke[] = [];
  Ramassage:Ramassage[] = []; 


  // variable
  selectedTsena!:Tsena;
  selectedDepot!:Depotu;
  ramassageA:boolean = false;
  dateR!:Date;
  codet!:number;
  numu!:number;

  selectTsena(){
    let t = this.TsenaL.find((item)=>{
      return item.codet ==  this.codet;
    });
    if(t){
      this.selectedTsena = t;
      this.getDepot()
    }else{
      this.Toastr.warning('Code tsena inexistant');
    }
  }

  getUser() {
    let u = this.UserService.User;
    if (u) {
      this.User = u;
    } else {
      this.UserService.getUser().subscribe(
        (res) => {
          this.User = res;
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  getTsena() {
    let t = this.UserService.Tsena;
    if (t.length != 0) {
      this.TsenaL = t
    } else {
      this.UserService.getTsenaListe().subscribe(
        (res) => {
          this.TsenaL = res;
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  getDepot() {
    this.UserService.getDepotTsena(this.selectedTsena).subscribe(
      (res)=>{
        this.selectedDepot = res;
        this.getRamassage();
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


  SaveRamassage(f:any){ 
    let r = new Ramassage(this.action, this.dateR, this.User, this.selectedTsena,this.selectedDepot, this.ramassageA);
    this.UserService.SaveRamassage(r).subscribe(
      (res)=>{
        f.reset();
        this.Reset();
      },
      (err)=>{
        console.log(err.error);
      }
    )
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


  getRamassage(){
    this.UserService.getRamassageDepot(this.selectedDepot).subscribe(
      (res)=>{
        this.Ramassage = res; 
      },
      (err) => {
        console.log(err.error);
      }
    )
  }

  Reset(){
    let n:any=null;
    this.selectedTsena =n;
    this.selectedDepot = n;
    this.Ramassage = [];
    
  }
}
