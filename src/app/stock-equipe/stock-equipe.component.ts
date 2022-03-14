import { Component, OnInit } from '@angular/core';
import { Equipe } from 'src/Object/Equipe';
import { Stocke } from 'src/Object/Stocke';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-stock-equipe',
  templateUrl: './stock-equipe.component.html',
  styleUrls: ['./stock-equipe.component.css']
})
export class StockEquipeComponent implements OnInit {

  constructor(private AdminService:AdminService) { }

  ngOnInit(): void {
    this.GetEquipeListe();
    this.getStockEliste();
  }
  StockeL:Stocke[] = [];
  Result:Stocke[] = [];
  Equipe:Equipe[] = [];
  SelectedEquipe!:Equipe;

  SetListe(){  
    this.Result = this.StockeL.filter((item)=>{
      return item.idequipe.idequipe == this.SelectedEquipe.idequipe;
    });
  }

  GetEquipeListe(){
    let l = this.AdminService.EquipeL;
    if(l.length != 0){
      this.Equipe = l
    }else{
      this.AdminService.GetEquipeListe().subscribe(
        (res)=>{
          this.Equipe = res;
        },
        (err)=>{
          console.log(err.error);
        }
      )
    }
  }

  getStockEliste(){
    let l = this.AdminService.StockE;
    if(l.length != 0){
      this.StockeL = l
      this.UpdateListe();
    }else{
      this.AdminService.getStockE().subscribe(
        (res)=>{
          this.StockeL = res;
          this.UpdateListe();
        },
        (err)=>{
          console.log(err.error);
        }
      )
    }
  }

  UpdateListe(){
    setTimeout(
      ()=>{
        this.AdminService.getStockE().subscribe(
          (res)=>{
            this.StockeL = res;
          },
          (err)=>{
            console.log(err.error);
          }
        )
      },
      60000
    )
  }
}
