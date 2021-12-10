import { Component, OnInit } from '@angular/core';
import { Annee } from '../Object/Annee';
import { AnneeService } from '../Service/annee.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private AnneeService: AnneeService) { }

  ngOnInit(): void {
    this.getAnneEncours();
  }

  AnneeEncours!:Annee;
  
  getAnneEncours() {
    this.AnneeService.getAll().subscribe((res: Annee) => {
      this.AnneeEncours = res;
    },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
