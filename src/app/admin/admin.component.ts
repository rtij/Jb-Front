import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private route: Router, private LoginService: LoginService) { }

  ngOnInit(): void {
  }

  Logout() {
    this.LoginService.Logout().subscribe(
      (res) => {
        localStorage.removeItem('token');
        this.route.navigate(['']);
      },
      (err)=>{
        console.log(err.error)
      }
    )
  }

}
