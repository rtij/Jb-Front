import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/Object/Employe';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  constructor(private Adminservice: AdminService) { 
    
  }

  ngOnInit(): void {
    this.getEmploye();
  }
  EmployeSearch:string="";
  Admins: Employe[] = [];
  selectedAdmin!:Employe;
  show(){
    alert(this.EmployeSearch);
  }
  getEmploye() {
    this.Adminservice.getAll().subscribe((res: Employe[]) => {
      this.Admins = res;
    },
      (err) => {
        console.log(err.error);
      }
    );
  }
  select(it:Employe){
    this.selectedAdmin = it;
  }
  
  Update(){
    
  }


  deleteAdmin(){
    if(confirm("Voulez-vous vraiment supprimmer cet administrateur")){
      
    }
  }
  
}
