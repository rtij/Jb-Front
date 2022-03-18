import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { Faritany } from 'src/Object/Data';
import { Equipe } from 'src/Object/Equipe';
import { translate } from 'src/Object/MyAnimations';
import { Villei } from 'src/Object/Villei';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css'], animations: [
    translate
  ]
})
export class EquipeComponent implements OnInit {

  constructor(private AdminService: AdminService, private toastr:ToastrService) { }
  EquipeL: Equipe[] = [];
  SelectedEquipe!: Equipe;
  VilleIL: Villei[] = [];
  equipeN: string = "";
  Faritany: string[] = Faritany;
  selectedF: string = "";
  quartierv: string = "";
  zonea!: number;
  localite: string = "";
  selectedVillei!: Villei;
  modif: boolean = false;


  ngOnInit(): void {
    this.getEquipeListe();
    this.GetVilleIliste();
  }

  findFaritany() {
    let r = this.Faritany.find((item) => {
      return item == this.selectedF
    });
    return r;
  }


  show() {
    this.Reset();
    this.modif = true;
  }

  hide() {
    if (this.SelectedEquipe) {
      let a: any = null;
      this.SelectedEquipe = a;
    }
    this.modif = false;
  }

  Modifier() {
    if (!this.SelectedEquipe) {
      this.toastr.warning("Selectionner une équipe d'abord");
    }
    else {
      this.modif = true;
    }
  }

  SelectEquipe(Equipe: Equipe) {
    this.SelectedEquipe = Equipe;
    this.localite = this.SelectedEquipe.localite;
    this.zonea = this.SelectedEquipe.zonea;
    this.selectedF = this.SelectedEquipe.faritany;
    this.quartierv = this.SelectedEquipe.quartierv;
    if (this.SelectedEquipe.idvillei) {
      this.selectedVillei = this.SelectedEquipe.idvillei;
    }
    this.equipeN = this.SelectedEquipe.equipe;

  }


  UpdateEquipe(a: any) {
    this.SelectedEquipe.localite = this.localite;
    this.SelectedEquipe.faritany = this.selectedF;
    this.SelectedEquipe.equipe = this.equipeN;
    this.SelectedEquipe.idvillei = this.selectedVillei;
    if(this.localite == "Grande Ville"){
      let f:any = null;
      this.SelectedEquipe.idvillei = f;
    }
    this.SelectedEquipe.quartierv = this.quartierv;
    this.zonea = this.SelectedEquipe.zonea;
    this.AdminService.UpdateEquipe(this.SelectedEquipe).subscribe
    (
      (res)=>{
        this.toastr.success("Modification effectuer");
        this.Reset();
        this.modif = false;
        this.EquipeL  = res;
      },
      (err)=>{
        console.log(err.error);
      }
    )
  }

  SaveData(e: any) {
    if (this.SelectedEquipe) {
      this.UpdateEquipe(e);
    } else {
      this.AddEquipe(e);
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

  GetVilleIliste() {
    let l = this.AdminService.VilleIL;
    if (l.length != 0) {
      this.VilleIL = l;
    } else {
      this.AdminService.VilleiListe().subscribe
        ((res) => {
          this.VilleIL = res;
        },
          (err) => {
            console.log(err.error)
          }
        )
    }
  }

  AddEquipe(a: any) {
    if (!this.selectedVillei) {
      let a: any = null;
      this.selectedVillei = a;
    }
    let e = new Equipe(this.equipeN, false, this.zonea, this.quartierv, this.localite, this.selectedF, this.selectedVillei)
    this.AdminService.CreateEquipe(e).subscribe(
      (res) => {
        this.EquipeL = res;
        this.toastr.success("Donner sauvegarder");
        this.modif = false;
        a.reset();
      },
      (err) => {
        console.log(err.error)
      }
    )
  }

  DeleteEquipe() {
    if (!this.SelectedEquipe) {
      this.toastr.warning("Selectionner une équipe d'abord");
    }else{
      if(confirm("Voulez vous vraiment supprimmer cette équipe ?")){
        this.SelectedEquipe.issup = true;
        this.AdminService.UpdateEquipe(this.SelectedEquipe).subscribe(
          (res)=>{
            this.toastr.success("Suppression effectuer");
            this.EquipeL = this.EquipeL.filter((item)=>{
              return item != this.SelectedEquipe
            });
            this.Reset();
          }
        )
      }
    }
  }

  Reset() {
    let a: any = null;
    this.selectedVillei = a;
    this.SelectedEquipe = a;
    this.localite = "";
    this.selectedF = "";
    this.zonea = 0;
    this.quartierv = "";
    this.equipeN = "";
  }
}
