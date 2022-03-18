import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { fade, translate } from 'src/Object/MyAnimations';
import { Users } from 'src/Object/Users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'], animations: [translate, fade]
})
export class ProfileComponent implements OnInit {

  constructor(private AdminService: AdminService, private Toastr: ToastrService) { }
  modif: boolean = false;
  ngOnInit(): void {
    this.getUser();
  }
  nomu: string = "";
  mdp: string = "";
  confMdp: string = "";
  telAirtel: string = "";
  telOrange: string = "";
  telTelma: string = "";
  User!: Users;

  show() {
    this.modif = true;
    this.nomu = this.User.nomu;
    this.telAirtel = this.User.telAirtel;
    this.telOrange = this.User.telOrange;
    this.telTelma = this.User.telTelma;
  }
  hide() {
    this.modif = false;
  }

  getUser() {
    let u = this.AdminService.User;
    if (u) {
      this.User = u;
    } else {
      this.AdminService.getMyUser().subscribe(
        (res) => {
          this.User = res;
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }


  updateUser() {
    this.User.telAirtel = this.telAirtel;
    this.User.telOrange = this.User.telOrange;
    this.User.nomu = this.nomu;
    this.User.telTelma = this.User.telTelma;
    this.User.password = this.mdp;
    this.AdminService.UpdateUser(this.User).subscribe(
      (res) => {
        this.AdminService.getMyUser().subscribe(
          (res) => {
            this.User = res;
            this.Toastr.success('Modification effectuer');
            this.modif = false;
            this.Reset();
          },
          (err) => {
            console.log(err.error);
          }
        )
      },
      (err) => {
        console.log(err.error)
      }
    )
  }

  Reset() {
    this.nomu = "";
    this.mdp = "";
    this.confMdp = "";
    this.telAirtel = "";
    this.telOrange = "";
    this.telTelma = "";
  }

}
