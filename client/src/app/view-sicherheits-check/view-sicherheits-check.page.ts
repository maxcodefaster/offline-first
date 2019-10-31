import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SicherheitsCheckService } from '../services/sicherheits-check.service';

@Component({
  selector: 'app-view-sicherheits-check',
  templateUrl: './view-sicherheits-check.page.html',
  styleUrls: ['./view-sicherheits-check.page.scss'],
})
export class ViewSicherheitsCheckPage implements OnInit {

  formData;

  constructor(private route: ActivatedRoute, private sicherheitsCheckService: SicherheitsCheckService,) { }

  ngOnInit() {
    let formId = '';
    this.route.paramMap.subscribe((params: ParamMap) => {
      formId = params.get('id');
    });
    this.getForm(formId);
  }

  getForm(id) {
    this.sicherheitsCheckService.getSingleSicherheitsCheck(id).then((res: any) => {
      this.formData = res;
    });
  }

}
