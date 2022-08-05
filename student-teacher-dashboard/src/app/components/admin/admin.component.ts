import { HttpClient,HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, Input, OnInit } from '@angular/core';
import { json } from 'body-parser';
import { response } from 'express';
import { buffer, Observable, of } from 'rxjs';
import { Buffer } from 'buffer';
import { Student } from 'src/app/models/student';
import { DataServiceService } from 'src/app/service/data-service.service';

import * as internal from 'stream';
import { read } from 'fs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
//to take up information from data-service and send back an email for verification
export class AdminComponent implements OnInit {
  
  constructor(private data: DataServiceService,private http: HttpClient, private sanitizer: DomSanitizer) { }

  public student:Student[]=[];
  
  ngOnInit(): void {    
  } 
  
  // imgbase64:string =''
  // bufToBase(buf: ArrayBuffer, i: number){
  //   var bin = ''
  //   var bytes = new Uint8Array(buf);

  //   var len = bytes.byteLength;
  //   for(var i =0; i <len; i++){
  //     bin += String.fromCharCode(bytes[i]);
  //   }

  //   this.imgbase64 = bin
  //   console.log(this.imgbase64);
  // }

  
  viewInfo(){  
    this.data.getInfo().subscribe((d)=>{
      this.student=d;
      console.log(this.student);
      var url='http://localhost:3000/files/'
      for( let i=0;i<this.student.length;i++){
        let x=this.student[i].marksheet;
        this.student[i].marksheet=url+x;
      }
      
      // refer for conversion from array object to base_64, (make changes for sql to save info in backend as blob)
      // for(let i=0;i<this.student.length;i++){
      //    console.log(this.student[i]);
      // }
      // //var buf: ArrayBuffer = this.student[0].marksheet.data;
      // //this.bufToBase(buf)
      // // console.log(buf)
      // // console.log(buf.arrayBuffer);

    },(error)=>{
      console.log(error);
    });    
    //console.log(this.student); 
  }
  selectedFile:any;
  onFileSelected(event:any){
    console.log(event);
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  uploadCSV(){
    console.log("uploading...");
    this.data.sendTeachersData(this.selectedFile).subscribe(response=>{
      alert("Teachers information successfully refreshed");
      console.log(response);
    },(err)=>{
      console.log(err);
      alert("Error updating teachers list");
    });
  }
  approve(x:number){
    //console.log(JSON.stringify(this.student[x].checked)+" is the current information");
    //particular student info to be altered based on index/id;
    this.data.updateData(this.student[x]).subscribe((response)=>{
      console.log(this.student[x]);
      alert("student status approved");
      console.log("information updated ",response);
    },(error)=>{
      console.log("information failed to get updated");
    })

    this.data.insertData(this.student[x]).subscribe((response)=>{
      console.log("Info sent ",response);
    },(error)=>{
      console.log(error, " error in approval");
    });      

    //mail information to be sent, the info approved
    this.data.sendMail1(this.student[x]).subscribe(response=>{
      console.log(response);
    },(error)=>{
      console.log(error);
    });

    
  }

  reject(idx:number){
    //mail information to be sent, if you feel info was correct, please come in for manual verification
    console.log(idx+" :idx");
    alert("Student information rejected");
    this.data.sendMail(this.student[idx]).subscribe((response)=>{
      console.log(response);
    },(error)=>{
      console.log(error);
    })
  }
}
