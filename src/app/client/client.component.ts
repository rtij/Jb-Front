import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

 
  constructor(private LoginService:LoginService,private ClientService:ClientService, private router:Router) { }

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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.ClientService.Reset();
  }
}
