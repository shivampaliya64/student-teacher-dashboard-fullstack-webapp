import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StudentUserComponent } from './components/student-user/student-user.component';
import { TeacherUserComponent } from './components/teacher-user/teacher-user.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './service/auth.guard';





const routes: Routes = [
  {path:'',redirectTo:'log-in',pathMatch:'full'},
  {path:'log-in',component:LogInComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'student-user/:id',component:StudentUserComponent,canActivate: [AuthGuard]},
  {path:'teacher-user/:id',component:TeacherUserComponent},
  {path:'admin',component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
