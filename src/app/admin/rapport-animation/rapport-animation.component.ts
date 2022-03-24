import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { Faritany } from 'src/Object/Data';
import { Livrables } from 'src/Object/Livrables';

@Component({
  selector: 'app-rapport-animation',
  templateUrl: './rapport-animation.component.html',
  styleUrls: ['./rapport-animation.component.css']
})
export class RapportAnimationComponent implements OnInit {

  constructor(private AdminService: AdminService, private Toastr: ToastrService) { }

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

  Result(v: string, f:string) {
    let env = 0;
    if (this.Livrables != []) {
      let r = this.Livrables.filter((item) => {
        return item.codeu.idequipe?.localite == v && item.codeu.idequipe?.faritany == f;
      });
      env = r.length;
      return env;
    }
    return env;
  }


  getSum(){
    this.total = 0;
    this.Livrables.forEach((item)=>{
      this.total = this.total + item.envu;
    });
  }


  SumF(f: string) {
    let t = 0;
    if (this.Livrables != []) {
      let r = this.Livrables.filter((item) => {
        return item.codeu.idequipe?.faritany == f;
      });
      return r.length;
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
