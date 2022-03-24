import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Depotu } from 'src/Object/Depotu';

@Component({
  selector: 'app-listed',
  templateUrl: './listed.component.html',
  styleUrls: ['./listed.component.css']
})
export class ListedComponent implements OnInit {

  constructor(private AdminService: AdminService) { }

  ngOnInit(): void {
    this.getDepotliste();
  }
  Depotu: Depotu[] = [];

  getDepotliste(){
    let l =  this.AdminService.DepotU;
    if(l.length !=0){
      this.Depotu = l;
      this.UpdateDepot();
    }else{
      this.AdminService.getDepotUListe().subscribe(
        (res)=>{
          this.Depotu = res;
          this.UpdateDepot();
        },
        (err)=>{
          console.log(err.error);
        }
      )
    }
  }

  UpdateDepot(){
    setTimeout(
      ()=>{
        this.AdminService.getDepotUListe().subscribe(
          (res)=>{
            this.Depotu = res;
            this.UpdateDepot();
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
