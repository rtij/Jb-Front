import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { Equipe } from 'src/Object/Equipe';
import { Livrables } from 'src/Object/Livrables';

@Component({
  selector: 'app-envequipe',
  templateUrl: './envequipe.component.html',
  styleUrls: ['./envequipe.component.css']
})
export class EnvequipeComponent implements OnInit {

  constructor(private AdminService: AdminService, private Toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEquipeList();
    this.getLivrablesList();
  }
  Equipe: Equipe[] = [];
  Livrables: Livrables[] = [];
  SelectedE!: Equipe;
  DateR!: Date;
  Enveloppe: number = 0;
  active = true;
  selectEquipe() {
    if (this.Livrables == []) {
      this.Toastr.info('Chargement des données en cours');
    } else {
      if (this.SelectedE) {
        if (this.DateR) {
          this.Enveloppe = 0;
          let r = this.Livrables.filter((item) => {
            return item.datea == this.DateR;
          });
          r = r.filter((item) => {
            return item.codeu.idequipe?.idequipe == this.SelectedE.idequipe;
          });
          r.forEach((item) => {
            this.Enveloppe = this.Enveloppe + item.envu;
          });
        }
      } else {
        this.Enveloppe = 0;
      }
    }
  }

  getLivrablesList() {
    let l = this.AdminService.Livrables;
    if (l.length != 0) {
      this.Livrables = l;
      this.UpdateLivrables();
    } else {
      this.AdminService.getLivrablesListe().subscribe(
        (res) => {
          this.Livrables = res;
          this.selectEquipe();
          this.UpdateLivrables();
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

  UpdateLivrables() {
    if (this.active) {
      setTimeout(
        () => {
          this.AdminService.getLivrablesListe().subscribe(
            (res) => {
              if (res != this.Livrables) {
                this.Livrables = res;
                this.selectEquipe();
              }
            },
            (err) => {
              console.log(err.error)
            }
          )

        },
        60000
      )
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.active = false;
  }
}
