import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-depotu',
  templateUrl: './depotu.component.html',
  styleUrls: ['./depotu.component.css']
})
export class DepotuComponent implements OnInit {

  constructor(private AdminService:AdminService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

}
