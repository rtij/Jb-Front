import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { Equipe } from 'src/Object/Equipe';
import { fade } from 'src/Object/MyAnimations';
import { TypeU } from 'src/Object/TypeU';
import { Users } from 'src/Object/Users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [fade]
})
export class UsersComponent implements OnInit {

  constructor(private AdminService: AdminService, private Toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetUserListe();
    this.getEquipeListe();
    this.getUserTypeListe();
  }
  // Data
  show: boolean = false;
  selectedUser!: Users;
  telOrange: string = "";
  telAirtel: string = "";
  telTelma: string = "";
  selectedEquipe!: Equipe;
  nom: string = "";
  selectedTypeU!: TypeU;
  mdp: string = "";
  typeu: string = "";
  confMdp: string = "";
  equipeN: string = "";
  search:string="";
  // Liste
  UserL: Users[] = [];
  EquipeL: Equipe[] = [];
  typeU: TypeU[] = [];

  // GetData function
  GetUserListe() {
    let l = this.AdminService.UserListe;
    if (l.length != 0) {
      this.UserL = l;
    } else {
      this.AdminService.getUserListe().subscribe(
        (res) => {
          this.UserL = res;
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
  }

  getEquipeListe() {
    let l = this.AdminService.EquipeL;
    if (l.length != 0) {
      this.EquipeL = l
    } else {
      this.AdminService.GetEquipeListe().subscribe
        ((res) => {
          this.EquipeL = res;
        },
          (err) => {
            console.log(err.error)
          }
        )
    }
  }


  getUserTypeListe() {
    let l = this.AdminService.UserTypeListe;
    if (l.length != 0) {
      this.typeU = l;
    } else {
      this.AdminService.getUserType().subscribe(
        (res) => {
          this.typeU = res;
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }
  // Action function
  Reset() {
    let a: any = null;
    if (this.selectedUser) {
      this.selectedUser = a;
    }
    this.telOrange = "";
    this.telTelma = "";
    this.selectedEquipe = a;
    this.telAirtel = "";
    this.nom = "";
    this.mdp = "";
    this.confMdp = "";
    this.selectedTypeU = a;
    this.typeu = "";
  }


  showBox() {
    this.Reset();
    this.show = true;
  }

  hideBox() {
    this.Reset();
    this.show = false;
  }

  Modifier() {
    if (!this.selectedUser) {
      this.Toastr.warning("Selectionner un utilisateur d'abord");
    } else {
      this.show = true;
    }
  }

  selectUser(User: Users) {
    this.selectedUser = User;
    this.nom = this.selectedUser.nomu;
    this.telAirtel = this.selectedUser.telAirtel;
    this.telTelma = this.selectedUser.telTelma;
    this.telOrange = this.selectedUser.telOrange;
    this.typeu = this.selectedUser.idtypeu.destypeu;
    if (this.selectedUser.idequipe) {
      this.selectedEquipe = this.selectedUser.idequipe;
      this.equipeN = this.selectedEquipe.equipe;
    }
  }

  SaveData() {
    if (this.selectedUser) {
      this.UpdateUser();
    } else {
      this.createUser();
    }
  }

  UpdateUser() {
    let r = this.typeU.find((item) => {
      return item.destypeu == this.typeu;
    });
    if (r) {
      this.selectedTypeU = r;
    }
    this.selectedUser.idtypeu = this.selectedTypeU;
    this.selectedUser.nomu = this.nom;
    this.selectedUser.telAirtel = this.telAirtel;
    this.selectedUser.telOrange = this.telOrange;
    this.selectedUser.telTelma = this.telTelma;
    this.selectedUser.password = this.mdp;
    if (r?.destypeu == "Simple") {
      if (this.equipeN != "") {
        let e = this.EquipeL.find((item) => {
          return item.equipe == this.equipeN;
        });
        if (e) {
          this.selectedEquipe = e;
        }
      }
    } else {
      let a: any = null;
      this.selectedEquipe = a;
    }
    this.selectedUser.idequipe = this.selectedEquipe;
    this.AdminService.UpdateUser(this.selectedUser).subscribe(
      (res) => {
        this.UserL = res;
        this.Toastr.success("Modification terminer");
        this.Reset();
        this.show = false;
      }, (err) => {
        console.log(err.error)
      }
    )
  }

  DeleteUser() {
    if (!this.selectedUser) {
      this.Toastr.warning("Selectionner un utilisateur d'abord");
    } else {
      if (confirm("Voulez vous vraiment supprimmer cette utilisateur?")) {
        this.selectedUser.issup = true;
        this.AdminService.UpdateUser(this.selectedUser).subscribe(
          (res) => {
            this.Toastr.success("Suppression effectuer");
            this.UserL = this.UserL.filter((item) => {
              return item != this.selectedUser
            })
          }, (err) => {
            console.log(err.error)
          }
        )
      }
    }
  }

  createUser() {
    let r = this.typeU.find((item) => {
      return item.destypeu == this.typeu;
    });
    if (r) {
      this.selectedTypeU = r;
    }
    if (this.selectedTypeU.destypeu != "Simple") {
      if (!this.selectedEquipe) {
        let a: any = null;
        this.selectedEquipe = a;
      }
    } else {
      let e = this.EquipeL.find((item) => {
        return item.equipe == this.equipeN;
      })
      if (e) {
        this.selectedEquipe = e;
      }
    }
    let u = new Users (this.nom, this.mdp, this.telAirtel, this.telOrange, this.telTelma, this.selectedTypeU, false, this.selectedEquipe);
    this.AdminService.SaveUsers(u).subscribe((res) => {
      this.UserL = res;
      this.Toastr.success("Enregistrement effectuer");
      this.Reset();
      this.show = false;
    },
      (err) => {
        console.log(err.error)
      }
    )
  }



}
