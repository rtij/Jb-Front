import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { DetailsMvt } from 'src/Object/Detmvt';

@Component({
  selector: 'app-mouvement',
  templateUrl: './mouvement.component.html',
  styleUrls: ['./mouvement.component.css']
})
export class MouvementComponent implements OnInit {

  constructor(private AdminService:AdminService) { }

  ngOnInit(): void {
    this.getMouvemntListe();
  }
  search:string = "";
  DetMvtListe:DetailsMvt[] = [];

  getMouvemntListe(){
    let l = this.AdminService.DetMvtListe;
    if(l.length != 0){
      this.DetMvtListe = l;
    }else{
      this.AdminService.getDetMvtListe().subscribe(
        (res)=>{
          this.DetMvtListe = res;
        },
        (err)=>{
          console.log(err.error)
        }
      )
    }
  }
}
