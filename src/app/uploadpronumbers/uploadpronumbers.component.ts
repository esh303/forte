import { Component, OnInit } from '@angular/core';
import { ExternalService } from '../services/external.service';

@Component({
  selector: 'app-uploadpronumbers',
  templateUrl: './uploadpronumbers.component.html',
  styleUrls: ['./uploadpronumbers.component.css']
})
export class UploadpronumbersComponent implements OnInit {
  public arrayFormat: any = [];
  public file: any;
  public uploadResponse: any;
  public fileName = '';
  public showNoFileChoosen = true;
  public showFileIsChoosen = false;
  public showFileIsUploaded = false;
  public errorOnUploadMsg = false;
  constructor(private externalService: ExternalService) { }

  ngOnInit() {
  }


  fileChanged(e: any) {
    this.file = e.target.files[0];
    this.fileName = this.file.name;
    this.showNoFileChoosen = false;
    this.showFileIsChoosen = true;
    this.showFileIsUploaded = false;
  }
  uploadDocument() {
    this.errorOnUploadMsg = false;
    this.arrayFormat = [];
    let fileReader: any = new FileReader();
    fileReader.onload = (e: any) => {
      this.arrayFormat = fileReader.result.toString().split('\n');
      if (this.arrayFormat.length > 0) {
        this.externalService.proNumberUpload(this.arrayFormat).subscribe((data:any) => {
          this.uploadResponse = data;
          if (this.uploadResponse.result === true) {
            this.showNoFileChoosen = false;
            this.showFileIsChoosen = false;
            this.showFileIsUploaded = true;
          }
        }, (err:any) => {
          this.errorOnUploadMsg = true;
          this.showNoFileChoosen = false;
          this.showFileIsChoosen = false;
          this.showFileIsUploaded = false;
        });
      }
    }
    fileReader.readAsText(this.file);
  }

}
