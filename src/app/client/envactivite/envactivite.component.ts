import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/service/client.service';
import { Activite, Faritany } from 'src/Object/Data';
import { Livrables } from 'src/Object/Livrables';

@Component({
  selector: 'app-envactivite',
  templateUrl: './envactivite.component.html',
  styleUrls: ['./envactivite.component.css']
})
export class EnvactiviteComponent implements OnInit {

  constructor(private AdminService:ClientService, private Toastr:ToastrService) { }

  ngOnInit(): void {
    this.getLivrables();
  }
  Livrables: Livrables[] = [];
  env: number = 0;
  active: boolean = true;
  faritany = Faritany;
  Activite = Activite;
  total = 0;

  getLivrables() {
    let l = this.AdminService.Livrables;
    if (l.length != 0) {
      this.Livrables = l;
      this.updateListe();
      this.getSum();
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

  getSum(){
    this.total = 0;
    this.Livrables.forEach((item)=>{
      this.total = this.total + item.envu;
    });
  }

  Result(faritany: string, activite: string) {
    if (this.Livrables != []) {
      let r = this.Livrables.filter((item) => {
        return item.codeu.idequipe?.faritany == faritany && item.typel == activite;
      });
      let env = 0;
      r.forEach((item) => {
        env = env + item.envu;
      });
      return env;
    }
    return 0;
  }

  Sumf(faritany: string) {
    if (this.Livrables != []) {
      let r = this.Livrables.filter((item) => {
        return item.codeu.idequipe?.faritany == faritany;
      });
      let env = 0;
      r.forEach((item) => {
        env = env + item.envu;
      });
      return env;
    }
    return 0;
  }

  SumA(animation:string){
    if (this.Livrables != []) {
      let r = this.Livrables.filter((item) => {
       return item.typel == animation;
      });
      let env = 0;
      r.forEach((item) => {
        env = env + item.envu;
      });
      return env;
    }
    return 0;
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
