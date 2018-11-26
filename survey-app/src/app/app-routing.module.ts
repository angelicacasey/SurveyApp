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
import { AddClientComponent } from './add-client/add-client.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';


const routes: Routes = [
	{ path: '', redirectTo:'/surveys', pathMatch:'full'},
	{ path: 'surveys', component: SurveyListComponent},
	{ path: 'surveys/add', component: AddSurveyComponent},
	{ path: 'surveys/edit/:id', component: AddSurveyComponent},
	{ path: 'surveys/view/:id', component: ViewSurveyComponent},
	{ path: 'surveys/preview/:id', component: PreviewSurveyComponent},
	{ path: 'reports', component: ReportsComponent},
	{ path: 'clients', component: ClientListComponent},
	{ path: 'clients/add', component: AddClientComponent},
	{ path: 'clients/edit/:id', component: AddClientComponent},
	{ path: 'projects', component: ProjectListComponent},
	{ path: 'projects/add', component: AddProjectComponent},
	{ path: 'projects/edit/:id', component: AddProjectComponent},
	{ path: 'employees', component: EmployeeListComponent},
	{ path: 'employees/add', component: AddEmployeeComponent},
	{ path: 'employees/edit/:id', component: AddEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
