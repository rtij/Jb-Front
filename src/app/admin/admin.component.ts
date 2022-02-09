import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Annee } from '../Object/Annee';
import { AnneeService } from '../Service/annee.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private AnneeService: AnneeService,private LoginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.getAnneEncours();
  }

  AnneeEncours!:Annee;
  
  getAnneEncours() {
    this.AnneeService.getAll().subscribe((res: Annee) => {
      this.AnneeEncours = res;
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
      this.router.navigate(['/']);
    },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
