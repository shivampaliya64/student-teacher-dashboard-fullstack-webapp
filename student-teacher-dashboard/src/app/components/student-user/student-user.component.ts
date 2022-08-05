import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-student-user',
  templateUrl: './student-user.component.html',
  styleUrls: ['./student-user.component.css']
})
export class StudentUserComponent implements OnInit {
  curr:Student=new Student();
  constructor(private data: DataServiceService) { }
  showClassmates: boolean = false;
  viewCourses:boolean = false;
  value:string='';
  subjects: string='';
  ngOnInit(): void {
    this.curr=this.data.getIndividualData();
    console.log(this.curr);
  }
  students:Student[]=[];
  viewClassmates(){
    this.data.getByClass(this.curr.class).subscribe((response)=>{
      this.showClassmates = !this.showClassmates
      this.students=response;
      console.log(response);
    },(error)=>{
      console.log(error);
    })
  }
  viewSubjects(){
    this.viewCourses = !this.viewCourses;
    this.data.getSubjects(this.curr.class).subscribe(response=>{
      // console.log(response, 'resp');
      console.log(response[0].subjects);
      this.subjects = response[0].subjects;
    },(error)=>{
      console.log(error, 'errorrr');
    })
  }

}

