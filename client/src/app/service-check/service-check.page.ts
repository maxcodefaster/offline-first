import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-service-check',
  templateUrl: './service-check.page.html',
  styleUrls: ['./service-check.page.scss'],
})
export class ServiceCheckPage implements OnInit {


  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

}
