import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModule} from "./material.module"
import { AppRoutingModule } from './app-routing.module'; 
import { SurveyListComponent } from './survey-list/survey-list.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { ReportsComponent } from './reports/reports.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddSurveyComponent, AddQuestionDialog } from './add-survey/add-survey.component';
import { ViewSurveyComponent } from './view-survey/view-survey.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyListComponent,
    MainNavigationComponent,
    ReportsComponent,
    ClientListComponent,
    ProjectListComponent,
    EmployeeListComponent,
    AddSurveyComponent,
    AddQuestionDialog,
    ViewSurveyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  entryComponents: [AddQuestionDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
