import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { Faritany } from 'src/Object/Data';
import { Depotu } from 'src/Object/Depotu';
import { Distribution } from 'src/Object/Distribution';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.css']
})
export class DistributionComponent implements OnInit {

  constructor(private AdminService: AdminService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getDepotliste();
  }

  Depotu: Depotu[] = [];
  Distribution: Distribution[] = [];
  l = Faritany;
  index = 0;
  total: number = 0;

  getDepotliste() {
    let l = this.AdminService.DepotU;
    if (l.length != 0) {
      this.Depotu = l;
      this.total = this.Depotu.length;
      this.FilterData();
      this.UpdateDepot();
    } else {
      this.AdminService.getDepotUListe().subscribe(
        (res) => {
          this.Depotu = res;

          this.total = this.Depotu.length;
          this.FilterData();
          this.UpdateDepot();
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
  }

  UpdateDepot() {
    setTimeout(
      () => {
        this.AdminService.getDepotUListe().subscribe(
          (res) => {
            this.Depotu = res;
            this.Distribution = [];
            this.index = 0;
            this.total = this.Depotu.length;
            this.FilterData();
            this.UpdateDepot();
          },
          (err) => {
            console.log(err.error);
          }
        )
      },
      60000
    )
  }


  FilterData() {
    let r = this.Depotu.filter((item) => {
      return item.codeu.idequipe?.faritany == this.l[this.index];
    });
    let gv = r.filter((item) => {
      return item.codeu.idequipe?.localite == 'Grande Ville';
    });
    let vi = r.filter((item) => {
      return item.codeu.idequipe?.localite == 'Ville Intermédiaire';
    });
    let d = new Distribution(this.l[this.index], gv.length, vi.length);
    this.Distribution.push(d);
    if (this.index < this.l.length -1) {
      this.index = this.index + 1;
      this.FilterData();
    }else{
      this.index = 0;
    }
  }

}
