import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { response } from 'express';
import { Teacher } from '../models/teacher.model';
import { FormGroupDirective } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  constructor(private http: HttpClient) { }
  //to store infromation and this info is supposed to be passed to admin
  
  sendInfo(ip: Student):Observable<any>{  
    console.log("data stored, admin verification required"+JSON.stringify(ip));
    return this.http.post("http://localhost:3000/sendInfo",ip,{responseType: 'text'});
  }

  sendInfoForm(ip: Student):Observable<any>{  
    var fd = new FormData();
    fd.append("marksheet", ip.file, ip.file.name)

    fd.append("student", JSON.stringify(ip));
    console.log(fd)
    console.log("data stored, admin verification required"+JSON.stringify(ip));
    // return this.http.post("http://localhost:3000/sendInfo",ip,{responseType: 'text'});
    return this.http.post("http://localhost:3000/file/test",fd);
  }

  sendTeachersData(ip: File):Observable<any>{
    var fd = new FormData();
    fd.append("uploadfile", ip, ip.name);
    console.log(fd);
    return this.http.put("http://localhost:3000/file1/test",fd)
  }
  

  getInfo():Observable<Student[]>{
    console.log("Info recieved, waiting for approval");
    return this.http.get<any>("http://localhost:3000/getInfo");
  }  
  insertData(ip1: Student):Observable<any>{    
    console.log("sending final data "+JSON.stringify(ip1));
    return this.http.post("http://localhost:3000/insertData",ip1,{responseType: 'text'});
  }
  updateData(ip2: Student):Observable<any>{
    console.log("is checked set to true for user "+JSON.stringify(ip2));
    return this.http.post('http://localhost:3000/updateData',ip2,{responseType: 'text'});
  }
  getByClass(c:number):Observable<Student[]>{
    return this.http.get<any>("http://localhost:3000/getByClass/",{params:{cl:c}});
  }
  getSubjects(inp: any):Observable<any>{
    console.log(inp, typeof inp);
    return this.http.get<any>("http://localhost:3000/getsubject", {params:{inp1:inp}});
  }
  getByName(name:string):Observable<Student[]>{
    console.log(name+" :name");
    return this.http.get<any>("http://localhost:3000/getByName/",{params:{nm:name}});
  }
  sendMail(ip3:Student):Observable<Student>{
    return this.http.post<Student>("http://localhost:3000/sendMail",ip3);
  }
  sendMail1(ip3:Student):Observable<Student>{
    return this.http.post<Student>("http://localhost:3000/sendMail1",ip3);
  }
  
  matchData(id: string):Observable<Teacher[]>{
    console.log(id);
    return this.http.get<Teacher[]>('http://localhost:3000/matchData',{params:{id:id}});
  }
  matchData1(id1: string):Observable<Student[]>{
    console.log(id1);
    return this.http.get<Student[]>('http://localhost:3000/matchData1',{params:{id:id1}});
  }

  
  st_:Student=new Student();
  sendIndividualData(ip: Student):void{
    this.st_=ip;
  }
  getIndividualData():Student{
    return this.st_;
  }

  fl:boolean=false;
  getFlag(ip: boolean){
    this.fl=ip;
  }
  flagVal():boolean{
    return this.fl;
  }
  
}
