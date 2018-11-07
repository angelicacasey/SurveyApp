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
    "contactFirstName": "Elmer",
    "contactLastName": "Fudd",
    "contactEmail": "efudd@meddevlmtd.com"
  },
  {
    "id": "project2",
    "itemName": "DEF",
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
	 	"projectName": "Project X",
	 	"clientName": "Client Y",
	 	"itemName": "My Survey",
	 	"createdBy": "Sherlock Holmes",
	 	"recipient": "Mary Smith",
	 	"status": "Draft",
	 	"createdDt": "2018-11-02T16:11:33.448Z"
  	},
  	 {
  		"id": "Survey2",
	 	"projectName": "Secret Project",
	 	"clientName": "Client Y",
	 	"itemName": "Rating Survey",
	 	"createdBy": "Sherlock Holmes",
	 	"recipient": "John Doe",
	 	"status": "Sent",
	 	"createdDt": "2018-10-03T11:23:33.448Z"
  	},
  	{
  		"id": "Survey3",
	 	"projectName": "Uber Project",
		"clientName": "Super Client",
	 	"itemName": "Super Uber Survey",
	 	"createdBy": "Harry Potter",
	 	"recipient": "Ron Weasley",
	 	"status": "Got Response",
	 	"createdDt": "2018-11-02T16:11:33.448Z"
  	}
  ];


@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  currentSurveys: Survey[] = MOCK_SURVEYS;

  constructor() { }

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

}
