import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { Depotu } from 'src/Object/Depotu';
import { Ramassage } from 'src/Object/Ramassage';
import { Tsena } from 'src/Object/Tsena';

@Component({
  selector: 'app-ramassage',
  templateUrl: './ramassage.component.html',
  styleUrls: ['./ramassage.component.css']
})
export class RamassageComponent implements OnInit {

  constructor(private AdminService: AdminService, private Toastr:ToastrService) { }

  ngOnInit(): void {
    this.getDepotu();
  }
  search: string = "";
  Depotu: Depotu[] = [];
  Ramassage: Ramassage[] = [];
  Tsena:Tsena[] = [];
  Result:Tsena[] = [];
  p:number = 0;

  getDepotu() {
    let d = this.AdminService.DepotU;
    if (d.length != 0) {
      this.Depotu = d
      this.getRamassage();
    } else {
      this.AdminService.getDepotUListe().subscribe(
        (res) => {
          this.Depotu = res;
          this.getRamassage();
        },
        (err) => {
          console.log(err.error)
        }
      )
    }

  }

  getRamassage() {
    let l = this.AdminService.Ramassage;
    if (l.length != 0) {
      this.Ramassage = l;
      this.FilterData();
    } else {
      this.AdminService.getRamassageListe().subscribe(
        (res) => {
          this.Ramassage = res;
          this.FilterData();
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }


  FilterData() {
    this.Depotu.forEach((dep)=>{
      let r =  this.Ramassage.filter((ram)=>{
        return ram.iddep.iddep == dep.iddep;
      });
      if(r){
        r.forEach((item)=>{
          if(item.ramassagea){
            this.Tsena.push(dep.codet);
          }
        });
      }
    });
    console.log(this.Tsena);
    this.Depotu.forEach((dep)=>{
      let r = this.Tsena.find((t)=>{
        return t.codet == dep.codet.codet;
      });
      if(!r){
        this.Result.push(dep.codet);
      }
    });
    console.log(this.Result);
    this.p = this.Result.length * 100 / this.Depotu.length;
  }

}
