import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { animatezoom } from 'src/Object/MyAnimations';
import { Villei } from 'src/Object/Villei';

@Component({
  selector: 'app-villei',
  templateUrl: './villei.component.html',
  styleUrls: ['./villei.component.css'],animations:[animatezoom]
})
export class VilleiComponent implements OnInit {

  constructor(private AdminService: AdminService, private Toastr:ToastrService) { }
  VilleiL: Villei[] = [];
  selectedVilleI!: Villei;
  libelle: string = "";
  modif: boolean = false;
  ngOnInit(): void {
    this.getVilleListe();
  }

  show() {
    this.Reset();
    this.modif = true;
  
  }

  hide() {
    this.modif = false;
    if (this.selectedVilleI) {
      let a: any = null;
      this.selectedVilleI = a;
      this.libelle = "";
    }
  }

  modifier() {
    if (!this.selectedVilleI) {
      this.Toastr.warning("Selectionner une ville d'abord");
    } else {
      this.modif = true;
      this.libelle = this.selectedVilleI.libelle;
    }
  }

  selectVilleI(v: Villei) {
    this.selectedVilleI = v;
  }

  getVilleListe() {
    let l = this.AdminService.VilleIL;
    if (l.length != 0) {
      this.VilleiL = l;
    }
    else {
      this.AdminService.VilleiListe().subscribe
        ((res) => {
          this.VilleiL = res;
        },
          (err) => {
            console.log(err.error);
          })
    }
  }

  SaveData() {
    if (this.selectedVilleI) {
      this.UpdateVille();
    } else {
      this.NewVille();
    }
  }

  UpdateVille() {
    this.selectedVilleI.libelle = this.libelle;
    this.AdminService.UpdateVillei(this.selectedVilleI).subscribe
      (
        (res) => {
          this.VilleiL = res;
          this.Toastr.success("Modification terminer");
          let a: any = null;
          this.selectedVilleI = a;
          this.modif = false
        }, (err) => {
          console.log(err.error);
        }
      )
  }

  NewVille() {
    this.AdminService.CreateVillei(this.libelle).subscribe
      ((res) => {
        this.VilleiL = res;
        this.Toastr.success("Enregistrement effectuer");
        this.modif = false;

      }, (err) => {
        console.log(err.error);
      })
  }

  DeleteVilleI() {
    if (this.selectedVilleI) {
      if (confirm("Voulez vous vraiment supprimer cette ville de la liste")) {
        this.selectedVilleI.issup = true;
        this.AdminService.UpdateVillei(this.selectedVilleI).subscribe
          (
            (res) => {
              this.VilleiL = this.VilleiL.filter((item) => {
                return item != this.selectedVilleI;
              })
            }
          )
      }
    } else {
      this.Toastr.warning("Selectionner une ville d'abord");
    }
  }

  Reset(){
    let a:any = null;
    this.selectedVilleI = a;
    this.libelle ='';
  }
}
