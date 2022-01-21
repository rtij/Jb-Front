import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { routerAnimation } from '../Object/Animation';
import { Etudiant } from '../Object/Etudiant';
import { EtudiantService } from '../Service/etudiant.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css'],
  animations:[routerAnimation]
})
export class EtudiantComponent implements OnInit {

  constructor(private LoginService:LoginService, private router:Router,private EtudiantService:EtudiantService) { }

  ngOnInit(): void {
    this.getEtudiant();
  }
  
  Etudiant!:Etudiant;
  getEtudiant(){
    this.EtudiantService.getEtudiant().subscribe(
      (res)=>{
        this.Etudiant = res;
      },
      (err)=>{
        console.log(err.error);
      }
    )
  }

  getDepth(outlet:any){
    return outlet.activatedRouteData['depth'];
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
  ngOnDestroy(){
    const it:any = null;
    this.EtudiantService.DestructData();
  }
}
