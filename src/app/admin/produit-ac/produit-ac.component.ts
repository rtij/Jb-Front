import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { Activite, Faritany } from 'src/Object/Data';
import { Detlivrables } from 'src/Object/Detlivrable';

@Component({
  selector: 'app-produit-ac',
  templateUrl: './produit-ac.component.html',
  styleUrls: ['./produit-ac.component.css']
})
export class ProduitAcComponent implements OnInit {

  constructor(private AdminService: AdminService, private Toastr: ToastrService) { }

  ngOnInit(): void {
    this.getLivrables();
  }
  Livrables: Detlivrables[] = [];
  env: number = 0;
  active: boolean = true;
  faritany = Faritany;
  Activite = Activite;
  total = 0;

  getLivrables() {
    let l = this.AdminService.Detlivrable;
    if (l.length != 0) {
      this.Livrables = l;
      this.updateListe();
      this.getSum();
    } else {
      this.AdminService.DetLivrablesListe().subscribe(
        (res) => {
          this.Livrables = res;
          this.getSum();
          this.updateListe();
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  getSum(){
    this.total = 0;
    this.Livrables.forEach((item)=>{
      this.total = this.total + item.sortie;
    });
  }

  Result(faritany: string, activite: string) {
    if (this.Livrables != []) {
      let r = this.Livrables.filter((item) => {
        return item.idlivrables.codeu.idequipe?.faritany == faritany && item.idlivrables.typel == activite;
      });
      let env = 0;
      r.forEach((item) => {
        env = env + item.sortie;
      });
      return env;
    }
    return 0;
  }

  Sumf(faritany: string) {
    if (this.Livrables != []) {
      let r = this.Livrables.filter((item) => {
        return item.idlivrables.codeu.idequipe?.faritany == faritany;
      });
      let env = 0;
      r.forEach((item) => {
        env = env + item.sortie;
      });
      return env;
    }
    return 0;
  }

  SumA(animation:string){
    if (this.Livrables != []) {
      let r = this.Livrables.filter((item) => {
       return item.idlivrables.typel == animation;
      });
      let env = 0;
      r.forEach((item) => {
        env = env + item.sortie;
      });
      return env;
    }
    return 0;
  }

  updateListe() {
    if (this.active == true) {
      setTimeout(
        () => {
          this.AdminService.DetLivrablesListe().subscribe(
            (res) => {
              if (res != this.Livrables) {
                this.Livrables = res;
                this.updateListe();
              }else{
                this.updateListe();
              }
            },
            (err) => {
              console.log(err.error);
            }
          )
        },
        60000
      )
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.active = false;
  }


}
