import { Component, OnInit } from '@angular/core';
import { ProfService } from 'src/app/prof.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  constructor(private ProfService:ProfService) { }

  ngOnInit(): void {
  }

 

}
