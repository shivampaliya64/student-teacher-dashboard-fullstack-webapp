import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StudentUserComponent } from './components/student-user/student-user.component';
import { TeacherUserComponent } from './components/teacher-user/teacher-user.component';
import { AdminComponent } from './components/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './service/auth.guard';




@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent,
    StudentUserComponent,
    TeacherUserComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard, LogInComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
