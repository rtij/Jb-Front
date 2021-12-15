import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Professeur } from '../Object/Professeur';
import { ProfService } from '../prof.service';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {

  constructor(private LoginService:LoginService, private router:Router,private profService: ProfService) { }

  ngOnInit(): void {
    this.getUsername();
  }
  prof!:Professeur;
  username:string="";
  
  getUsername(){
    this.profService.getProf().subscribe((res) => {
      this.prof = res;
    },
      (err) => {
        console.log(err.error);
      }
    );
  }
  
  logout(){
    this.LoginService.Logout().subscribe((res) => {
      localStorage.removeItem('token');
      localStorage.removeItem('code');
      this.router.navigate(['/login']);
    },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
