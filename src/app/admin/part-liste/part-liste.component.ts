import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Faritany } from 'src/Object/Data';
import { Participation } from 'src/Object/Participation';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-part-liste',
  templateUrl: './part-liste.component.html',
  styleUrls: ['./part-liste.component.css']
})
export class PartListeComponent implements OnInit {

  constructor(private AdminService: AdminService) { }

  ngOnInit(): void {
    this.getParticipation();
  }

  Participation: Participation[] = [];
  Result: Participation[] = [];
  l = Faritany;
  faritany: string = "";
  search: string = "";

  head = [['Anarana sy fanampiny', 'Tel telma', 'Tel orange', 'Tel airtel', 'Faritany', 'Adiresy', 'Participation']];

  selectFaritany() {
    let r = this.l.find((item) => {
      return item == this.search;
    });
    if (r) {
      this.Result = this.Participation.filter((item) => {
        return item.faritany == this.search;
      });
      return true;
    } else {
      this.Result = this.Participation;
      return false;
    }
    console.log(this.Result);
  }


  getParticipation() {
    let l = this.AdminService.Participation;
    if (l.length != 0) {
      this.Participation = l;
      this.Result = l;
      this.UpdateParticipation();
    } else {
      this.AdminService.getParticipationListe().subscribe(
        (res) => {
          this.Participation = res;
          this.Result = res;
          this.UpdateParticipation();
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }



  createPdf() {
    var doc = new jsPDF();
    let name: string;
    doc.setFontSize(18);
    if (this.selectFaritany()) {
      name = 'Liste de participation ' + this.search;
      doc.text(name, 11, 8);
    } else {
      if (this.search != "") {
        name = 'Liste de participation ' + this.search;
        doc.text(name, 11, 8);
      } else {
        name = 'Liste de participation'
        doc.text('Liste de participation', 11, 8);
      }
    }

    doc.setFontSize(11);
    doc.setTextColor(100);


    (doc as any).autoTable({
      html: '#ParticipantL'
    });

    // below line for Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save(name + '.pdf');
  }

  UpdateParticipation() {
    setTimeout(
      () => {
        this.AdminService.getParticipationListe().subscribe(
          (res) => {
            this.Participation = res;
            this.selectFaritany();
            this.UpdateParticipation();
          },
          (err) => {
            console.log(err.error)
          }
        )
      },
      60000
    )
  }
}
