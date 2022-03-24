import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { Equipe } from 'src/Object/Equipe';
import { Histoe } from 'src/Object/Histostocke';

@Component({
  selector: 'app-histo-app-equipe',
  templateUrl: './histo-app-equipe.component.html',
  styleUrls: ['./histo-app-equipe.component.css']
})
export class HistoAppEquipeComponent implements OnInit {

  constructor(private AdminService: AdminService, private Toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEquipeList();
    this.getHistoe();
  }
  Histoe: Histoe[] = [];
  Equipe: Equipe[] = [];
  Result:Histoe[] = [];
  DateH!: Date;
  selectedEquipe!: Equipe;
  active = true;

  selectEquipe()
  {
    this.Result = this.Histoe.filter((item)=>{
      return item.idstocke.idarticle.type == 'Produit' && item.appro != 0;
    });
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

  getHistoe() {
    let l = this.AdminService.histoStocke;
    if (l.length != 0) {
      this.Histoe = l;
    } else {
      this.AdminService.getHistoStockEquipe().subscribe(
        (res) => {
          this.Histoe = res;
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  updateHistoe() {
    if (this.active) {
      setTimeout(
        () => {
          this.AdminService.getHistoStockEquipe().subscribe(
            (res) => {
              this.Histoe = res;
              this.updateHistoe();
            },
            (err) => {
              console.log(err.error)
            }
          )
        },60000
      )
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.active = false;
  }
}


