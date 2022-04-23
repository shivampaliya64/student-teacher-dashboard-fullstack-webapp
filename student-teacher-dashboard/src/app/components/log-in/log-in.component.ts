import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Student } from 'src/app/models/student';
import { AuthGuard } from 'src/app/service/auth.guard';
import { DataServiceService } from 'src/app/service/data-service.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {  
  constructor(private router:Router,private data: DataServiceService) { }
  
  ngOnInit(): void {
  }
  id:string="";
  email:string="";
  pass:string="";
  

  onSubmit(){
    // console.log(this.id);
    // console.log(this.email);
    // console.log(this.pass);
    if(this.id[0]=='A' ){
      if(this.id=='A1001' && this.pass=='A1234'){
        this.router.navigateByUrl('/admin');
      }
      else{
        alert("Invalid credentials");
      }
    }
    else if(this.id[0]=='T'){
      this.data.matchData(this.id).subscribe((response)=>{
        console.log('data to be verified fetched',response); 
        if(response[0].pass==this.pass && response[0].t_id==this.id && this.email==response[0].email){
          alert('Login success');
          this.router.navigate(['/teacher-user',this.id]);
        }
        else{
          alert('wrong creds');
        }
      },(error)=>{
        console.log(error);
      })
    }
    else if(this.id[0]=='S'){
      this.data.matchData1(this.id).subscribe((response)=>{
        console.log(response,' resp');
        console.log(response[0].st_id);
        console.log(response[0].password);
        
        if(response[0].email==this.email && response[0].password==this.pass && response[0].st_id==this.id){
          this.data.sendIndividualData(response[0]);
          
          alert("login successful");
          this.data.getFlag(true);
          this.router.navigate(['/student-user',this.id]);
        }
        else alert("Wrong creds");
      },(error)=>{
        console.log(error);
      })
    }
    else{
      alert('Wrong User Id');
    }
  }
}

