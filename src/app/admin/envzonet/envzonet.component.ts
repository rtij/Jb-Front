import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { Livrables } from 'src/Object/Livrables';

@Component({
  selector: 'app-envzonet',
  templateUrl: './envzonet.component.html',
  styleUrls: ['./envzonet.component.css']
})
export class EnvzonetComponent implements OnInit {

  constructor(private AdminService: AdminService, private Toastr: ToastrService) { }

  ngOnInit(): void {
    this.getLivrables();
  }
  Livrables: Livrables[] = [];
  DateVi!: Date;
  Vi: number = 0;
  env: number = 0;
  active: boolean = true;

  getLivrables() {
    let l = this.AdminService.Livrables;
    if (l.length != 0) {
      this.Livrables = l;
      this.filterData();
      this.updateListe();
    } else {
      this.AdminService.getLivrablesListe().subscribe(
        (res) => {
          this.Livrables = res;
          this.filterData();
          this.updateListe();
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }


  filterData() {
    if (this.Livrables == []) {
      this.Toastr.info('Chargement des données en cours');
    } else {
      if (this.DateVi) {
        if (this.Vi != 0) {
          this.env = 0;
          let r = this.Livrables.filter((item)=>{
            return item.codeu.idequipe?.faritany  == "Antananarivo" && item.codeu.idequipe.zonea == this.Vi;
          })
          r.forEach((item) => {
            this.env = this.env + item.envu;
          })
        }
      }
    }
  }

  updateListe() {
    if (this.active == true) {
      setTimeout(
        () => {
          this.AdminService.getLivrablesListe().subscribe(
            (res) => {
              if (res != this.Livrables) {
                this.Livrables = res;
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
