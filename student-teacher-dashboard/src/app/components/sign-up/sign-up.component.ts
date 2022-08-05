import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { Student } from 'src/app/models/student';
import { DataServiceService } from 'src/app/service/data-service.service';

import { HttpClient } from '@angular/common/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  student:Student=new Student;
  base64StringMarksheet:any;
  constructor(private data: DataServiceService, private router: Router,private http: HttpClient) { }
  ngOnInit(): void {
  }
  event:any;
  selectedFile:any;
 
  onFileSelected(event: any){
    console.log(event);
    this.selectedFile=<File>event.target.files[0];
    this.student.file = this.selectedFile;
    var reader = new FileReader();
    reader.onloadend = () =>{
      this.student.marksheet = reader.result;
      // console.log(this.student.marksheet); 
      // console.log(typeof(this.student.marksheet));
      // console.log(reader.result); 
    }
    console.log(typeof(this.student.marksheet));
    reader.readAsDataURL(this.selectedFile);
    
    // reader.onloadend = function () {
    //     var base64String
    //     base64String = reader.result
    //     console.log(base64String)
    // }
    

    // reader.result.replace("data:", "")
    // .replace(/^.+,/, "");

    // console.log(this.selectedFile);
  }
  onSubmit(){
    // console.log(this.student);
    console.log(this.student.file)
    console.log(this.student);
    //debugger;
    this.data.sendInfoForm(this.student).subscribe(resp => {
      console.log(resp)
    })


    // this.data.sendInfo(this.student).subscribe((response)=>{
    //   console.log("response sent ",response);
    // },(error)=>{
    //   console.log(error);
    // })
    alert("Thank you for filling up the form, Admin will revert to you shortly");
    this.router.navigateByUrl("/log-in"); 
  }
}
