import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { Detlivrables } from 'src/Object/Detlivrable';

@Component({
  selector: 'app-produit-vi',
  templateUrl: './produit-vi.component.html',
  styleUrls: ['./produit-vi.component.css']
})
export class ProduitViComponent implements OnInit {

  constructor(private AdminService: AdminService, private Toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDetLivrables();
  }
  DetLivrable: Detlivrables[] = [];
  DateD!: Date;
  active = true;
  vi: number = 0;

  Produit(designation: string) {
    let p = 0;
    if (this.vi != 0) {
      let r = this.DetLivrable.filter((item) => {
        return item.idlivrables.codeu.idequipe?.idvillei.libelle == this.vi.toString() && item.idstocke.idarticle.designation == designation;
      });
      if (this.DateD) {
        r = r.filter((item) => {
          return item.idlivrables.datea == this.DateD;
        });
        r.forEach((item) => {
          p = p + item.sortie;
        })
        return p;

      }
      r.forEach((item) => {
        p = p + item.sortie;
      })
      return p;
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
          this.DetLivrable = this.DetLivrable.filter((item)=>{
            return item.idlivrables.codeu.idequipe?.localite == 'Ville Intermédiaire';
          })
          this.updateDetLivarbles();
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
