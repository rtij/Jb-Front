import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Authtoken } from 'src/Object/Authtoken';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private LoginService: LoginService, private Tostr: ToastrService) { }

  nom: string = "";
  mdp: string = "";
  ngOnInit(): void {
  }
  Authtoken!:Authtoken;
  login() {
    this.LoginService.Login(this.nom, this.mdp).subscribe(
      (res) => {
        this.LoginService.storeToken(res);
        if(this.LoginService.isLogedIn()){
          this.getMyUser();
        }
      },
      (err) => {
        this.Tostr.warning("Nom d'utilisateur introuvable ou le mot de passe est incorrect");
        console.log(err.error);
      }
    )
  }

  getMyUser() {
    this.LoginService.getUser().subscribe(
      (res) => {
        this.Authtoken = res;
        let u = this.Authtoken.codeu;
        if(u.idtypeu.destypeu == "Simple"){
          localStorage.setItem('type',"Simple");
          this.router.navigate(['/Users']);
        }else if(u.idtypeu.destypeu == "Tandem"){
          localStorage.setItem('type','Tandem');
          this.router.navigate(['/Admin']);
        }else{
          localStorage.setItem('type',"Client");
          this.router.navigate(['/Client']);
        }
      }, (err) => {
        console.log(err.error);
      }
    )

  }
}
