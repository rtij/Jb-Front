import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
  }
  code:string="";
  password:string="";
  token:string = "";

  login(){
    this.loginService.Login(this.code,this.password).subscribe((res: string) => {
    this.token = res;
    this.loginService.storeToken(this.token);
    // identify user type
    localStorage.setItem('code',this.code);
    if(this.loginService.getUserType(this.code)=="AD"){
     document.location.href="https://www.digitec.mg/ists24/FR/PAGE-Liste-employe.php";
    }
    if(this.loginService.getUserType(this.code)=="PF"){
      this.router.navigate(['/Professeur']);
    }
    if(this.loginService.getUserType(this.code)=="ET"){
      this.router.navigate(['/Etudiant']);
    }
    },
      (err) => {
        console.log(err.error);
      }
    );
  }

}
