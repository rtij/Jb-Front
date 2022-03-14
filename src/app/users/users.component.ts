import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private LoginService:LoginService, private router:Router) { }

  ngOnInit(): void {
  }


  Logout() {
    this.LoginService.Logout().subscribe(
      (res) => {
        localStorage.removeItem('token');
        this.router.navigate(['']);
      },
      (err)=>{
        console.log(err.error)
      }
    )
  }
}
