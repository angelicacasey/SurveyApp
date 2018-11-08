import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Client } from '../models/client.model';
import { Project } from '../models/project.model';
import { Employee } from '../models/employee.model';
import { Survey } from '../models/survey.model';


const MOCK_CLIENTS: Client[] = [
  {
    "id": "client1",
    "itemName": "Super Client"
  },
  {
    "id": "client2",
    "itemName": "Uber Client"
  }
];

const MOCK_PROJECTS: Project[] = [
  {
    "id": "project1",
    "itemName": "ABC",
    "contact": {
    	"firstName": "Elmer",
    	"lastName": "Fudd",
    	"email": "efudd@meddevlmtd.com"
    },
    "contactFirstName": "Elmer",
    "contactLastName": "Fudd",
    "contactEmail": "efudd@meddevlmtd.com"
  },
  {
    "id": "project2",
    "itemName": "DEF",
    "contact": {
    	"firstName": "Homer",
    	"lastName": "Simpson",
    	"email": "hsimpson@medevlmtd.com"
    },
    "contactFirstName": "Sherlock",
    "contactLastName": "Holmes",
    "contactEmail": "sholmes@meddevlmtd.com"
  }
];

const MOCK_EMPLOYEES: Employee[] = [
  {
    "id": "emp1",
    "itemName": "Harry Potter",
    "firstName": "Harry",
    "lastName": "Potter"
  },
  {
    "id": "emp2",
    "itemName": "Hermoine Granger",
    "firstName": "Hermoine",
    "lastName": "Granger"
  }
];

const MOCK_SURVEYS: Survey[] = [
 	{
  		"id": "Survey1",
  		"projectId": "project2",
	 	"projectName": "Project X",
	 	"clientId": "client1",
	 	"clientName": "Client Y",
	 	"itemName": "My Survey",
	 	"createdBy": {
	 		"firstName": "Sherlock",
	 		"lastName": "Holmes",
	 		"email": "sholmes@medacuitysoftware.com"
	 	},
	 	"recipient": {
	 		"firstName": "Mary",
	 		"lastName": "Smith",
	 		"email": "msmith@meddevlmtd.com"
	 	},
	 	"status": "Draft",
	 	"createdDt": "2018-11-02T16:11:33.448Z"
  	},
  	 {
  		"id": "Survey2",
	 	"projectName": "Secret Project",
	 	"projectId": "project2",
	 	"clientId": "client1",
	 	"clientName": "Client Y",
	 	"itemName": "Rating Survey",
	 	"createdBy": {
	 		"firstName": "Sherlock",
	 		"lastName": "Holmes",
	 		"email": "sholmes@medacuitysoftware.com"
	 	},
	 	"recipient": {
	 		"firstName": "John",
	 		"lastName": "Doe",
	 		"email": "jdoe@outlook.com"
	 	},
	 	"status": "Sent",
	 	"createdDt": "2018-10-03T11:23:33.448Z"
  	},
  	{
  		"id": "Survey3",
  		"projectId": "project2",
	 	"clientId": "client1",
	 	"projectName": "Uber Project",
		"clientName": "Super Client",
	 	"itemName": "Super Uber Survey",
	 	"createdBy": {
	 		"firstName": "Harry",
	 		"lastName": "Potter",
	 		"email": "hpotter@medacuitysoftware.com"
	 	},
	 	"recipient": {
	 		"firstName": "Ron",
	 		"lastName": "Weasley",
	 		"email": "rweasley@hogwarts.edu"
	 	},
	 	"status": "Got Response",
	 	"createdDt": "2018-11-02T16:11:33.448Z"
  	}
  ]


@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  currentSurveys: Survey[] = MOCK_SURVEYS;

  constructor() { 

  }

  getListOfClients(): Observable<Client[]> {
  	return of(MOCK_CLIENTS);
  }

  getListOfProjectsForClient(clientId): Observable<Project[]> {
  	return of(MOCK_PROJECTS);
  }

  getListOfEmployeesOnProject(projectId): Observable<Employee[]> {
  	return of(MOCK_EMPLOYEES);
  }

  getListOfSurveys(): Observable<Survey[]> {
  	return of(this.currentSurveys);
  }

  saveSurvey(survey: Survey): Survey {
  	// assign an id
  	if (!survey.id) {
  		survey.id = this.getUniqueId();
  		survey.createdDt = new Date().toISOString();
  	}
  	this.currentSurveys.push(survey);
  	return survey;
  }

  getSurvey(surveyId): Survey {
  	var survey = this.currentSurveys.find(s => s.id == surveyId);
  	return survey;
  }

  getUniqueId(): string {
	return new Date().valueOf().toString(36) + Math.random().toString(36).substr(2);
  }
}
