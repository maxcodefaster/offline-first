import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.page.html',
  styleUrls: ['./reset-pwd.page.scss'],
})
export class ResetPwdPage implements OnInit {

  token;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.token = params.get('token');
    });
  }

}
