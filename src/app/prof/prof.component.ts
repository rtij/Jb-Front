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
  isResponsable:boolean = false;
  it:[]=[];
  
  getUsername(){
    this.profService.getProf().subscribe((res) => {
      this.prof = res;
      this.getResponsabilite();
    },
      (err) => {
        console.log(err.error);
      }
    );
  }

  getResponsabilite(){
    this.profService.GetResponsabilite().subscribe(
      (res)=>{
        if(res.length != 0){
          this.isResponsable = true;
        }
      }
    )
  }
  toggleMenu(){
    document.getElementById('sideMenu')!.style.width = "80px";
  }

  logout(){
    this.LoginService.Logout().subscribe((res) => {
      localStorage.removeItem('token');
      localStorage.removeItem('code');
      this.router.navigate(['/']);
    },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
