import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Faritany } from 'src/Object/Data';
import { Parfums } from 'src/Object/Parfums';
import { Tri } from 'src/Object/Tri';

@Component({
  selector: 'app-parfums',
  templateUrl: './parfums.component.html',
  styleUrls: ['./parfums.component.css']
})
export class ParfumsComponent implements OnInit {

  constructor(private AdminService: ClientService) { }

  ngOnInit(): void {
    this.getTriListe();
  }
  Tri: Tri[] = [];
  Parfums: Parfums[] = [];
  index = 0;
  f = Faritany;
  active = true;
  getTriListe() {
    let t = this.AdminService.Tri;
    if (t.length != 0) {
      this.Tri = t;
      this.FilterData();
      this.UpdateTriListe();
    } else {
      this.AdminService.getTriListe().subscribe
        (
          (res) => {
            this.Tri = res;
            this.FilterData();
            this.UpdateTriListe();
          },
          (err) => {
            console.log(err.error)
          }
        )
    }
  }

  FilterData() {
    if (this.index < this.f.length - 1) {
      let r = this.Tri.filter((item) => {
        return item.faritany == this.f[this.index];
      });
      let nboe = 0;
      let nbpp = 0;
      let nbvi = 0;
      let nbps = 0
      r.forEach((item) => {
        nboe = nboe + item.nboe;
        nbvi = nbvi + item.nbvi;
        nbpp = nbpp + item.nbpp;
        nbps = nbps + item.nbps
      });
      this.Parfums.push(new Parfums(this.f[this.index], nbpp, nbps, nbvi, nboe));
      this.index = this.index + 1;
      this.FilterData();
    }
  }

  UpdateTriListe() {
    if (this.active) {
      setTimeout(
        () => {
          this.AdminService.getTriListe().subscribe
            (
              (res) => {
                let r = res;
                if (this.Tri != res) {
                  this.Tri = res;
                  this.index = 0;
                  this.Parfums = [];
                  this.FilterData();
                  this.UpdateTriListe();
                }else{
                  this.UpdateTriListe();
                }
              },
              (err) => {
                console.log(err.error)
              })
        },
        60000
      )
    }
  }
}
