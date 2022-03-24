import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/service/client.service';
import { Faritany } from 'src/Object/Data';
import { Livrables } from 'src/Object/Livrables';

@Component({
  selector: 'app-recette-sc',
  templateUrl: './recette-sc.component.html',
  styleUrls: ['./recette-sc.component.css']
})
export class RecetteSCComponent implements OnInit {

  constructor(private AdminService: ClientService, private Toastr: ToastrService) { }

  ngOnInit(): void {
    this.getLivrables();
  }
  Livrables: Livrables[] = [];
  Faritany = Faritany;
  active: boolean = true;
  total = 0;

  getLivrables() {
    let l = this.AdminService.Livrables;
    if (l.length != 0) {
      this.Livrables = l;
      this.getSum();
      this.updateListe();
    } else {
      this.AdminService.getLivrablesListe().subscribe(
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

  Result(s: number, f:string) {
    let env = 0;
    if (this.Livrables != []) {
      let r = this.Livrables.filter((item) => {
        return item.semainec == s && item.codeu.idequipe?.faritany == f;
      });
      r.forEach((item) => {
        env = env + item.recettej;
      });
      return env;
    }
    return env;
  }


  getSum(){
    this.total = 0;
    this.Livrables.forEach((item)=>{
      this.total = this.total + item.recettej;
    });
  }

  SumS(s: number) {
    let t = 0;
    if (this.Livrables != []) {
      let r = this.Livrables.filter((item) => {
        return item.semainec == s;
      });
      r.forEach((item) => {
        t = t + item.recettej;
      });
      return t;
    }
    return t;
  }


  SumF(f: string) {
    let t = 0;
    if (this.Livrables != []) {
      let r = this.Livrables.filter((item) => {
        return item.codeu.idequipe?.faritany == f;
      });
      r.forEach((item) => {
        t = t + item.recettej;
      });
      return t;
    }
    return t;
  }

  updateListe() {
    if (this.active == true) {
      setTimeout(
        () => {
          this.AdminService.getLivrablesListe().subscribe(
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
