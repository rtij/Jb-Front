import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { fade, translate } from 'src/Object/MyAnimations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],animations:[translate, fade]
})
export class ProfileComponent implements OnInit {

  constructor(private AdminService:AdminService, private Toastr:ToastrService) { }
  modif: boolean = false;
  ngOnInit(): void {
  }
  nomu:string="";
  mdp:string="";
  telAirtel:string="";
  telOrange:string="";
  telTelma:string="";

  show() {
    this.modif = true;
  }
  hide() {
    this.modif = false;
  }

  getUser(){

  }


  updateUser(){

  }

}
