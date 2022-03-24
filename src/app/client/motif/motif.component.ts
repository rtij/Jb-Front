import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/service/client.service';
import { Faritany, motif } from 'src/Object/Data';
import { Motifs } from 'src/Object/Motifs';
import { Tri } from 'src/Object/Tri';

@Component({
  selector: 'app-motif',
  templateUrl: './motif.component.html',
  styleUrls: ['./motif.component.css']
})
export class MotifComponent implements OnInit {

  constructor(private AdminService: ClientService, private Toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTriliste();
  }
  Tri: Tri[] = [];

  Pass: Tri[] = [];


  motif = motif;
  f = Faritany;
  indexm = 0;
  indexf = 0;
  Motifs: Motifs[] = [];
  tana: number = 0;
  bira: number = 0;
  tama: number = 0;
  fianara = 0;
  tulear = 0;
  maj = 0;
  ants = 0;



  getTriliste() {
    let l = this.AdminService.Tri;
    if (l.length != 0) {
      this.Tri = l;
      this.filterData();
      this.UpdateTriListe();
    } else {
      this.AdminService.getTriListe().subscribe(
        (res) => {
          this.Tri = res;
          this.filterData();
          this.UpdateTriListe();
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  filterData() {
    this.Tri = this.Tri.filter((item)=>{
      return item.valide == false;
    })

    this.f.forEach((faritany)=>{
      this.motif.forEach((motif)=>{
        let r = this.Tri.filter((item)=>{
          return item.faritany == faritany && item.motifinv == motif;
        });
        this.Motifs.push(new Motifs(motif,faritany,r.length));
      });
    });
  }

  Result(faritany:string, motif:string){
    let r =  this.Tri.filter((item)=>{
      return item.faritany == faritany && item.motifinv == motif;
    });
    return r.length;
  }

  Sum(m:string){
    let r = this.Tri.filter((item)=>{
      return item.motifinv == m;
    });
    return r.length;
  }


  UpdateTriListe() {
    setTimeout(
      () => {
        this.AdminService.getTriListe().subscribe
          (
            (res) => {
              let r = res;
              if (this.Tri != res) {
                this.Tri = res;
                this.filterData();
              }
            },
            (err) => {
              console.log(err.error)
            })
      },
      60000
    )
  }
}
