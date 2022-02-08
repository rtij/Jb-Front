import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { routerAnimation } from '../Object/Animation';
import { Etudiant } from '../Object/Etudiant';
import { Flash } from '../Object/Flash';
import { EtudiantService } from '../Service/etudiant.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css'],
  animations: [routerAnimation]
})
export class EtudiantComponent implements OnInit {

  constructor(private LoginService: LoginService, private router: Router, private EtudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.getFlashInfo();
    this.getEtudiant();
  }

  Etudiant!: Etudiant;
  info: Flash[] = [];


  getEtudiant() {
    this.EtudiantService.getEtudiant().subscribe(
      (res) => {
        this.Etudiant = res;
      },
      (err) => {
        console.log(err.error);
      }
    )
  }

  getDepth(outlet: any) {
    return outlet.activatedRouteData['depth'];
  }

  logout() {
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
  getServerTime() {
    this.EtudiantService.getServerCurrentTime().subscribe
      (
        (res) => {
          console.log(res);
        }
      )
  }
  openModal() {
    document.getElementById("modal")?.click();
  }

  getFlashInfo() {
      this.EtudiantService.getInfo().subscribe
        ((res) => {
          this.info = res;
          this.getlast();
          this.openModal();
        },
          (err) => {
            console.log(err.error)
          }
        )
  }

  getlast(){
    setTimeout(
      ()=>{
        this.EtudiantService.getLastInfo().subscribe(
          (res)=>{
            let r = res;
            if(r.idflashInfo != this.info[0].idflashInfo){
              this.getFlashInfo();
            }
            this.getlast();
          },
          (err)=>{
            console.log(err.error)
          }
        )
      },60000
    )
  }


  ngOnDestroy() {
    const it: any = null;
    this.EtudiantService.DestructData();
  }
}
