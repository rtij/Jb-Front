import { Component, OnInit } from '@angular/core';
import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-prof-acc',
  templateUrl: './prof-acc.component.html',
  styleUrls: ['./prof-acc.component.css']
})
export class ProfAccComponent implements OnInit {

  constructor(private professeurService: ProfService) { }

  ngOnInit(): void {
    this.getCours();
  }
  getCours(){
    this.professeurService.getCours().subscribe((res) => {
      console.log(res);
    },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
