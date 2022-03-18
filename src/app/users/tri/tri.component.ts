import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { Participation } from 'src/Object/Participation';
import { Tri } from 'src/Object/Tri';
import { Users } from 'src/Object/Users';

@Component({
  selector: 'app-tri',
  templateUrl: './tri.component.html',
  styleUrls: ['./tri.component.css']
})
export class TriComponent implements OnInit {

  constructor(private UsersService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUser();
  }
  // Data
  User!: Users;
  Participation: Participation[] = [];

  // Variable
  selectedP!: Participation;
  nbPP: number = 0;
  nbVi: number = 0;
  nbPs: number = 0;
  nbOe: number = 0;
  faritany: string = "";
  dates!: Date;
  numenv: number = 0;
  teltelma: string = "";
  telairtel: string = "";
  telorange: string = "";
  nbp: number = 0;
  adrp: string = "";
  nomp: string = "";
  feno: boolean = false;
  valide: boolean = false;
  total: number = 0;
  motifinv: string = "";


  UnsetMotif() {
    if (this.valide) {
      this.motifinv = "";
    }
  }


  getUser() {
    let u = this.UsersService.User;
    if (u) {
      this.User = u;
    } else {
      this.UsersService.getUser().subscribe(
        (res) => {
          this.User = res;
          let f: any = this.User.idequipe?.faritany;
          this.faritany  = f;
          this.getParticipation();
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  FindParticipant() {
    if (this.adrp != "") {
      if (this.nomp != "") {
        let r = this.Participation.find((item) => {
          return item.nomp == this.nomp && item.adrp == this.adrp;
        });
        if (r) {
          this.selectedP = r;
          this.telairtel = r.telairtel
          this.telorange = r.telorange;
          this.teltelma = r.teltelma;
        }else{
          let n:any = null;
          this.selectedP = n;
        }
      }
    }

  }



  UpdateTotal() {
    this.total = this.nbOe + this.nbPP + this.nbVi + this.nbPs
    if (this.total >= 10) {
      this.feno = true;
      this.valide = true;
      this.motifinv = "";
      this
      this.UnsetMotif();
    } else {
      this.feno = false;
      this.valide = false;
      this.motifinv = "Nombres insuffisants";
    }
  }

  getParticipation() {
    let l = this.UsersService.Participation;
    if (l.length != 0) {
      this.Participation = l
    } else {
      this.UsersService.getParticipationList().subscribe(
        (res) => {
          this.Participation = res;
          console.log(this.Participation);
          this.UpdateParticipationListe();
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
  }


  SaveData() {
    if (this.selectedP) {
      this.updateParticipation()
    } else {
      if (this.feno) {
        if (this.valide) {
          this.NewParticipation();
        }else{
          this.toastr.success('Enregistrement effectuer');
        }
      }else{
        this.SaveTri();
      }
    }
  }

  SaveTri() {
    let t = new Tri("Saisie", this.User, this.dates, this.numenv, this.feno,this.valide, this.nbPP, this.nbVi, this.nbOe, this.nbPs, this.total, this.motifinv, this.faritany, this.nomp);
    this.UsersService.SaveTri(t).subscribe(
      (res) => {
        if(res != 'ok'){
          this.toastr.warning(res);
        }else{
          this.SaveData();
        }
      },
      (err) => {
        console.log(err.error);
      }
    )

  }


  NewParticipation() {
    let p = new Participation(this.dates, this.User, this.nomp, this.adrp, this.faritany, this.numenv, this.teltelma, this.telairtel, this.telorange, 1);
    this.UsersService.createParticipation(p).subscribe(
      (res) => {
        this.Participation = res;
        
        this.toastr.success('Enregistrement effectuer');
        this.Reset();  
      },
      (err) => {
        console.log(err.error);
      }
    )
  }

  UpdateParticipationListe() {
    setTimeout(
      () => {
        this.UsersService.getParticipationList().subscribe(
          (res) => {
            this.Participation = res;
            this.UpdateParticipationListe();
            console.log(this.Participation);
          },
          (err) => {
            console.log(err.error);
          }
        )
      }, 20000
    )

  }

  updateParticipation() {
    if (this.valide) {
      if (this.feno) {
        this.UsersService.UpdateParticipation(this.selectedP).subscribe(
          (res) => {
            this.Participation = res;
            this.toastr.success('Enregistrement effectuer');
            this.Reset();  
          },
          (err) => {
            console.log(err.error);
          }
        )
      }
    }
  }

  Reset() {
    let n: any = null;
    this.nbVi = 0;
    this.nbOe = 0;
    this.nomp = "";
    this.adrp = "";
    this.dates = n;
    this.selectedP = n;
    this.nbVi = 0;
    this.nbPP = 0;
    this.nbPs = 0;
    this.nbp = 0;
    this.telairtel = "";
    this.teltelma = "";
    this.telorange = "";
    this.valide = false;
    this.feno = false;
    this.total = 0;
    this.motifinv = "";
    this.faritany = "";
    this.numenv = 0;
  }
}
