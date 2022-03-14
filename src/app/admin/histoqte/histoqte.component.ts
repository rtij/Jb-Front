import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { HistoStock } from 'src/Object/Histostock';

@Component({
  selector: 'app-histoqte',
  templateUrl: './histoqte.component.html',
  styleUrls: ['./histoqte.component.css']
})
export class HistoqteComponent implements OnInit {

  constructor(private AdminService:AdminService) { }

  ngOnInit(): void {
    this.getHistoriquelist();
  }
  search:string = "";
  HistoStockListe:HistoStock[] = [];


  getHistoriquelist(){
    let l = this.AdminService.HistoStockListe;
    if(l.length != 0){
      this.HistoStockListe = l
    }else{
      this.AdminService.getHistoStockliste().subscribe(
        (res)=>{
          this.HistoStockListe = res;
        },
        (err)=>{
          console.log(err.error);
        }
      )
    }
  }
}
