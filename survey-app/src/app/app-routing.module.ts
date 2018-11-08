import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { ReportsComponent } from './reports/reports.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { ViewSurveyComponent } from './view-survey/view-survey.component';
import { PreviewSurveyComponent } from './preview-survey/preview-survey.component';


const routes: Routes = [
	{ path: '', redirectTo:'/surveys', pathMatch:'full' },
	{ path: 'surveys', component: SurveyListComponent, data: { title: 'Survey List' } },
	{ path: 'surveys/add', component: AddSurveyComponent, data: { title: 'Add Survey' } },
	{ path: 'surveys/edit/:id', component: AddSurveyComponent, data: { title: 'Edit Survey' } },
	{ path: 'surveys/view/:id', component: ViewSurveyComponent, data: { title: 'View Survey' } },
	{ path: 'surveys/preview/:id', component: PreviewSurveyComponent, data: { title: 'Preview Survey' } },
	{ path: 'reports', component: ReportsComponent, data: { title: 'Reports' } },
	{ path: 'clients', component: ClientListComponent, data: { title: 'Client List' } },
	{ path: 'projects', component: ProjectListComponent, data: { title: 'Project List' } },
	{ path: 'employees', component: EmployeeListComponent, data: { title: 'Employee List' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
