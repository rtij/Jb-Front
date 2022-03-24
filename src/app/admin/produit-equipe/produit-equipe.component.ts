import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { Detlivrables } from 'src/Object/Detlivrable';
import { Equipe } from 'src/Object/Equipe';

@Component({
  selector: 'app-produit-equipe',
  templateUrl: './produit-equipe.component.html',
  styleUrls: ['./produit-equipe.component.css']
})
export class ProduitEquipeComponent implements OnInit {

  constructor(private AdminService: AdminService, private Toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEquipeList();
    this.getDetLivrables();
  }
  Equipe: Equipe[] = [];
  DetLivrable: Detlivrables[] = [];
  DateD!: Date;
  selectedEquipe!: Equipe;
  active = true;


  Produit(designation: string) {
    let p = 0;
    if (this.DetLivrable != []) {
      if (this.selectedEquipe) {
        let r = this.DetLivrable.filter((item) => {
          return item.idstocke.idarticle.designation == designation && item.idlivrables.codeu.idequipe?.idequipe == this.selectedEquipe.idequipe;
        });
        if(this.DateD){
          r = r.filter((item)=>{
            return item.idlivrables.datea == this.DateD;
          });
          r.forEach((item)=>{
            p = p + item.sortie;
          })
          return p; 
        }
        r.forEach((item) => {
          p = p + item.sortie
        });
        return p;

      }
    }
    return p;
  }

  getDetLivrables() {
    let l = this.AdminService.Detlivrable;
    if (l.length != 0) {
      this.DetLivrable = l;
      this.updateDetLivarbles();
    } else {
      this.AdminService.DetLivrablesListe().subscribe(
        (res) => {
          this.DetLivrable = res;
          this.updateDetLivarbles();
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  getEquipeList() {
    let l = this.AdminService.EquipeL;
    if (l.length != 0) {
      this.Equipe = l;
    } else {
      this.AdminService.GetEquipeListe().subscribe(
        (res) => {
          this.Equipe = res;
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  updateDetLivarbles() {
    if (this.active) {
      setTimeout(
        () => {
          this.AdminService.DetLivrablesListe().subscribe(
            (res) => {
              this.DetLivrable = res;
              this.updateDetLivarbles();
            },
            (err) => {
              console.log(err.error)
            }
          )
        }, 60000
      )

    }

  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.active = false;
  }
}
