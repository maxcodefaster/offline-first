import { Component, OnInit } from '@angular/core';
import { SicherheitsCheckService } from '../services/sicherheits-check.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {

  public formulare: object[] = [];

  constructor(private sicherheitsCheckService: SicherheitsCheckService) { }

  ngOnInit() {
    this.sicherheitsCheckService.init();

    this.sicherheitsCheckService.getSicherheitsChecks().subscribe((formulare) => {

      this.formulare = formulare;

    });
  }

}
