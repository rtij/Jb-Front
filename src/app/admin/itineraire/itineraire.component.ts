import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Depotu } from 'src/Object/Depotu';
import { Users } from 'src/Object/Users';

@Component({
  selector: 'app-itineraire',
  templateUrl: './itineraire.component.html',
  styleUrls: ['./itineraire.component.css']
})
export class ItineraireComponent implements OnInit {

  constructor(private AdminService: AdminService) { }

  ngOnInit(): void {
    this.getDepotliste();
    this.getUsers();
  }
  // Data
  Depotu: Depotu[] = [];
  Result: Depotu[] = [];
  UserL: Users[] = [];
  dateS!: Date;
  SelectedUsers!: Users;

  SelectUsers() {
    let r:any;
    if (this.SelectedUsers) {
      r = this.Depotu.filter((item) => {
        return item.codeu.codeu == this.SelectedUsers.codeu;
      });
    }
    if (this.dateS) {
      this.Result = r.filter((item:any) => {
        return item.dated == this.dateS;
      });
    }
  }


  getUsers() {
    let l = this.AdminService.UserListe;
    if (l.length != 0) {
      this.UserL = l
    }else{
      this.AdminService.getUserListe().subscribe(
        (res)=>{
          this.UserL = res;
        },
        (err) => {
          console.log(err.error);
        }
      )
    }

  }

  getDepotliste() {
    let l = this.AdminService.DepotU;
    if (l.length != 0) {
      this.Depotu = l;
      this.UpdateDepot();
    } else {
      this.AdminService.getDepotUListe().subscribe(
        (res) => {
          this.Depotu = res;
          this.UpdateDepot();
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
  }

  UpdateDepot() {
    setTimeout(
      () => {
        this.AdminService.getDepotUListe().subscribe(
          (res) => {
            this.Depotu = res;
            this.UpdateDepot();
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
