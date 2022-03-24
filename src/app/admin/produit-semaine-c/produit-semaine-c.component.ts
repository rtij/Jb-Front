import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { Faritany } from 'src/Object/Data';
import { Detlivrables } from 'src/Object/Detlivrable';

@Component({
  selector: 'app-produit-semaine-c',
  templateUrl: './produit-semaine-c.component.html',
  styleUrls: ['./produit-semaine-c.component.css']
})
export class ProduitSemaineCComponent implements OnInit {

  constructor(private AdminService: AdminService, private Toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDetLivrables();
  }
  DetLivrable: Detlivrables[] = [];
  DateD!: Date;
  active = true;
  Faritany = Faritany;
  total = 0;

  getDetLivrables() {
    let l = this.AdminService.Detlivrable;
    if (l.length != 0) {
      this.DetLivrable = l;
      this.updateDetLivarbles();
    } else {
      this.AdminService.DetLivrablesListe().subscribe(
        (res) => {
          this.DetLivrable = res;
          this.DetLivrable = this.DetLivrable.filter((item)=>{
            return item.idlivrables.codeu.idequipe?.faritany == 'Antananarivo';
          })
          this.updateDetLivarbles();
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  
  Result(s: number, f:string) {
    let env = 0;
    if (this.DetLivrable != []) {
      let r = this.DetLivrable.filter((item) => {
        return item.idlivrables.semainec == s && item.idlivrables.codeu.idequipe?.faritany == f;
      });
      r.forEach((item) => {
        env = env + item.sortie;
      });
      return env;
    }
    return env;
  }


  getSum(){
    this.total = 0;
    this.DetLivrable.forEach((item)=>{
      this.total = this.total + item.sortie;
    });
  }

  SumS(s: number) {
    let t = 0;
    if (this.DetLivrable != []) {
      let r = this.DetLivrable.filter((item) => {
        return item.idlivrables.semainec == s;
      });
      r.forEach((item) => {
        t = t + item.sortie;
      });
      return t;
    }
    return t;
  }


  SumF(f: string) {
    let t = 0;
    if (this.DetLivrable != []) {
      let r = this.DetLivrable.filter((item) => {
        return item.idlivrables.codeu.idequipe?.faritany == f;
      });
      r.forEach((item) => {
        t = t + item.sortie;
      });
      return t;
    }
    return t;
  }


  updateDetLivarbles() {
    if (this.active) {
      setTimeout(
        () => {
          this.AdminService.DetLivrablesListe().subscribe(
            (res) => {
              this.DetLivrable = res;
              this.updateDetLivarbles();
            },
            (err) => {
              console.log(err.error)
            }
          )
        }, 60000
      )

    }

  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.active = false;
  }

}
