import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Stocke } from 'src/Object/Stocke';
import { Users } from 'src/Object/Users';

@Component({
  selector: 'app-stockequipe',
  templateUrl: './stockequipe.component.html',
  styleUrls: ['./stockequipe.component.css']
})
export class StockequipeComponent implements OnInit {

  constructor(private UserService:UserService) { }

  ngOnInit(): void {
    this.getMyUsers();
  }
  search:string="";
  Stocke:Stocke[] = [];
  User!:Users;

  getMyUsers(){
    let u = this.UserService.User;
    if(u){
      this.User = u;
      this.getStock();
    }else{
      this.UserService.getUser().subscribe(
        (res)=>{
          this.getStock();
        },
        (err)=>{
          console.log(err.error)
        }
      )
    }
  }


  getStock(){
    let l  = this.UserService.Stocke;
    if(l.length != 0){
      this.Stocke = l;
      this.UpdateStock();
    }else{
      this.UserService.getStockEquipe().subscribe(
        (res)=>{
          this.Stocke = res;
          this.UpdateStock();
        },
        (err)=>{
          console.log(err.error)
        }
      )
    }
  }

  UpdateStock(){
    setTimeout(
      ()=>{
        this.UserService.getStockEquipe().subscribe(
          (res)=>{
            this.Stocke = res;
            this.UpdateStock();
          },
          (err)=>{
            console.log(err.error)
          }
        )
      },60000
    )
  }
}
