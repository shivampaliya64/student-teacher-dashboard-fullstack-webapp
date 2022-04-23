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

  value:string='';
  ngOnInit(): void {
    this.curr=this.data.getIndividualData();
    console.log(this.curr);
  }
  students:Student[]=[];
  viewClassmates(){
    this.data.getByClass(this.curr.class).subscribe((response)=>{
      this.students=response;
      console.log(response);
    },(error)=>{
      console.log(error);
    })
  }

}

