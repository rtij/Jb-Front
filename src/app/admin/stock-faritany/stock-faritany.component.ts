import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { Faritany } from 'src/Object/Data';
import { Stocke } from 'src/Object/Stocke';

@Component({
  selector: 'app-stock-faritany',
  templateUrl: './stock-faritany.component.html',
  styleUrls: ['./stock-faritany.component.css']
})
export class StockFaritanyComponent implements OnInit {

  constructor(private AdminService: AdminService, private Toastr: ToastrService) { }

  ngOnInit(): void {
    this.getStockEquipe();
  }
  StockE: Stocke[] = [];
  faritany = Faritany;
  active = true;
  total = 0;
  getStockEquipe() {
    let l = this.AdminService.StockE;
    if (l.length != 0) {
      this.StockE = l;
      this.getSum();
      this.updateStocke();
    } else {
      this.AdminService.getStockE().subscribe(
        (res) => {
          this.StockE = res;
          this.getSum();
          this.updateStocke();
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  updateStocke() {
    if (this.active) {
      setTimeout(() => {
        this.AdminService.getStockE().subscribe(
          (res) => {
            this.StockE = res;
            this.getSum();
            this.updateStocke();
          },
          (err) => {
            console.log(err.error)
          }
        )
      }, 60000);
    }
  }

  SumF(f: string) {
    let t = 0;
    if (this.StockE != []) {
      let r = this.StockE.filter((item) => {
        return item.idequipe.faritany == f;
      });
      r.forEach((item) => {
        t = t + item.qte;
      })
      return t;
    }
    return t;
  }

  getSum() {
    this.StockE.forEach((item) => {
      this.total = this.total + item.qte;
    })
  }

  Result(f: string, p: string) {
    let t = 0;
    if (this.StockE != []) {
      let r = this.StockE.filter((item) => {
        return item.idequipe.faritany == f && item.idarticle.designation == p;
      })
      r.forEach((item) => {
        t = t + item.qte
      });
      return t;
    }
    return t;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.active = false;
  }

}
