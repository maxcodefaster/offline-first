import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PrivateDocService } from '../services/private-doc.service';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.page.html',
  styleUrls: ['./view-document.page.scss'],
})
export class ViewDocumentPage implements OnInit {

  formData;

  constructor(private route: ActivatedRoute, private sicherheitsCheckService: PrivateDocService, ) { }

  ngOnInit() {
    let documentId = '';
    this.route.paramMap.subscribe((params: ParamMap) => {
      documentId = params.get('id');
    });
    this.getDocument(documentId);
  }

  getDocument(id) {
    this.sicherheitsCheckService.getSinglePrivateDoc(id).then((res: any) => {
      this.formData = res;
    });
  }

}
