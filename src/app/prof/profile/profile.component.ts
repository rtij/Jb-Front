import { Component, OnInit } from '@angular/core';
import { DateFormate, DateToShortDate } from 'src/app/Object/Function';
import { ModuleProfesseur } from 'src/app/Object/ModuleProfesseur';
import { Professeur } from 'src/app/Object/Professeur';
import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private ProfService:ProfService
  ) { }

  ngOnInit(): void {
    this.getProf();
    this.getModuleProf();
  }
  ModuleProf!:ModuleProfesseur[];
  Prof!:Professeur;
  Date:string="";
  modif:boolean=false;
  formateur!:string;

  getModuleProf(){
    this.ProfService.getCours().subscribe(
      (res)=>{
        this.ModuleProf = res;
      }
      );
  }
  getProf(){
    this.ProfService.getProf().subscribe(
      (res)=>{
        this.Prof = res;
        this.Prof.datenaiss = DateToShortDate(this.Prof.datenaiss);
        this.Date = DateFormate(this.Prof.datenaiss);
        this.formateur = this.Prof.formateur;
      },
      (err)=>{
        console.log(err.error);
      }
    );
  }
  Annuler(){
    this.modif = false;
  }
  modifier(){
    this.modif = true;
  }
  UpdateProf(){
    this.Prof.formateur = this.formateur;
    this.ProfService.ModifProf(this.Prof).subscribe(
      (res)=>{
        this.Prof = res;
        this.modif = false;
        alert("Modification enregistrer");
        this.Prof.datenaiss = DateToShortDate(this.Prof.datenaiss);
        this.Date = DateFormate(this.Prof.datenaiss);
        this.formateur = this.Prof.formateur;
      },
      (err)=>{
        console.log(err.error);
      }
      );
  }
}
