import { Component, OnInit } from '@angular/core';
import { Data, Route } from '@angular/router';
import { DataServiceService } from 'src/app/service/data-service.service';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-teacher-user',
  templateUrl: './teacher-user.component.html',
  styleUrls: ['./teacher-user.component.css']
})
export class TeacherUserComponent implements OnInit {

  choice:string[]=["by class","by name"];
  pref:string=""
  value:string="";
  cl:number=0;
  student:Student[]=[];
  constructor(private data: DataServiceService, private router: Router) { }
  
  ngOnInit(): void {
  }
  search(){
    //console.log(this.value, this.pref);
    if(this.pref=="by class"){
      this.data.getByClass(parseInt(this.value)).subscribe((response)=>{
        this.student=response;
        console.log("information recieved ",response);
      },(error)=>{
        console.log(error);
      });
    }
    else{
      this.data.getByName(this.value).subscribe((response)=>{
        console.log("information recieved ",response);
        this.student=response;
      },(error)=>{
        console.log(error);
      });
    }
  }
}
