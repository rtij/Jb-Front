import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { DetailsMvt } from 'src/Object/Detmvt';
import { Equipe } from 'src/Object/Equipe';

@Component({
  selector: 'app-liste-r',
  templateUrl: './liste-r.component.html',
  styleUrls: ['./liste-r.component.css']
})
export class ListeRComponent implements OnInit {

  constructor(private AdminService: AdminService, private Toastr: ToastrService) { }

  ngOnInit(): void {
    this.EquipeList();
    this.GetDetmvtList();
  }
  selectedEquipe!: Equipe;

  Equipe: Equipe[] = [];
  DetMvtL: DetailsMvt[] = [];
  Result: DetailsMvt[] = [];
  active = true;


  selectEquipe() {
    if (this.selectedEquipe) {
      this.Result =  this.Result.filter((item)=>{
        return item.idmvt.iddestinataire.idequipe?.idequipe == this.selectedEquipe.idequipe;
      });

    }
  }

  EquipeList() {
    let e = this.AdminService.EquipeL;
    if (e.length != 0) {
      this.Equipe = e;
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


  GetDetmvtList() {
    let l = this.AdminService.DetMvtListe;
    if (l.length != 0) {
      this.DetMvtL = l;
      this.filterData();
      this.updateDetMvtListe();
    } else {
      this.AdminService.getDetMvtListe().subscribe(
        (res) => {
          this.DetMvtL = res;
          this.filterData();
          this.updateDetMvtListe();
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  filterData() {
    this.DetMvtL = this.DetMvtL.filter((item) => {
      return item.aretourner == true;
    });
    this.Result = this.DetMvtL.filter((item)=>{
      if(item.idmvt.iddestinataire){
        return item;
      }
      return null;
    })
  }

  updateDetMvtListe() {
    if (this.active) {
      setTimeout(() => {
        this.AdminService.getDetMvtListe().subscribe(
          (res) => {
            this.DetMvtL = res;
            this.filterData();
            this.updateDetMvtListe();
          },
          (err) => {
            console.log(err.error)
          }
        )
      }, 60000);
    }
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.active = false;
  }
}
