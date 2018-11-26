import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";

import { Client } from '../models/client.model';
import { Project } from '../models/project.model';
import { Employee } from '../models/employee.model';
import { Survey } from '../models/survey.model';


const MOCK_CLIENTS: Client[] = [
  {
    "id": "client1",
    "itemName": "Super Client",
    "description": "Medical devices specializing in insulin pumps"
  },
  {
    "id": "client2",
    "itemName": "Uber Client",
    "description": "Robotics non-medical."

  }
];

const MOCK_PROJECTS: Project[] = [
  {
    "id": "project1",
    "itemName": "ABC",
    "clientId": "client1",
    "clientName": "Super Client",
    "contact": {
    	"firstName": "Elmer",
    	"lastName": "Fudd",
    	"email": "efudd@meddevlmtd.com"
    },
    "programManager": {
    	"firstName": "Sherlock",
	 	"lastName": "Holmes",
	 	"email": "sholmes@medacuitysoftware.com"
    }
  },
  {
    "id": "project2",
    "itemName": "DEF",
    "clientId": "client1",
    "clientName": "Super Client",
    "contact": {
    	"firstName": "Homer",
    	"lastName": "Simpson",
    	"email": "hsimpson@medevlmtd.com"
    },
    "programManager": {
    	"firstName": "Sherlock",
	 	"lastName": "Holmes",
	 	"email": "sholmes@medacuitysoftware.com"
    }
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
	 	"createdDt": "2018-11-02T16:11:33.448Z",
	 	"questions": [],
	 	"surveyform": "",
     "respondedDt": "",
     "lastSentDt": "",
     "numTimesSent": 0
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
	 	"createdDt": "2018-10-03T11:23:33.448Z",
	 	"questions": [
	 	  {
	 	  	"id": "1a",
	 	    "question": "Please provide a rating for George Smith",
	 	    "questionType": "Employee_Rating",
	 	    "employeeId": "empl1",
			"options": [],
			"rating": 0,
			"response": ""
		  },
		  {
	 	  	"id": "1b",
	 	    "question": "Please provide a rating for Mary Jones",
	 	    "questionType": "Employee_Rating",
	 	    "employeeId": "empl2",
			"options": [],
			"rating": 0,
			"response": ""
		  }
	 	],
	 	"surveyform": "",
     "respondedDt": "",
     "lastSentDt": "2018-10-03T11:24:33.448Z",
     "numTimesSent": 0
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
	 	"createdDt": "2018-11-02T16:11:33.448Z",
	 	"questions": [
	 	  {
	 	  	"id": "2a",
	 	    "question": "Please provide a rating for George Smith",
	 	    "questionType": "Employee_Rating",
	 	    "employeeId": "empl1",
			"options": [],
			"rating": 4,
			"response": "He's awesome!"
		  },
		  {
	 	  	"id": "2b",
	 	    "question": "Please provide a rating for MedAcuity in general",
	 	    "questionType": "MedAcuity_Rating",
	 	    "employeeId": "",
			"options": [],
			"rating": 3,
			"response": ""
		  },
		  {
	 	  	"id": "2c",
	 	    "question": "How can we improve your project?",
	 	    "questionType": "Custom",
	 	    "employeeId": "",
			"options": ["add more people", "provide project management"],
			"rating": 0,
			"response": "add more people"
		  },
      {
         "id": "2e",
         "question": "Are we delivering?",
         "questionType": "Custom",
         "employeeId": "",
      "options": [],
      "rating": 0,
      "response": "More or less we are on schedule."
      }
	 	],
	 	"surveyform": "",
     "respondedDt": "2018-11-05T08:23:33.448Z",
     "lastSentDt": "2018-11-02T16:20:33.448Z",
     "numTimesSent": 1
  	}
  ]


@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  currentSurveys: Survey[] = MOCK_SURVEYS;
  currentProjects: Project[] = MOCK_PROJECTS;
  currentClients: Client[] = MOCK_CLIENTS;
  currentEmployees: Employee[] = MOCK_EMPLOYEES;
  mockSurveyForm: any;

  constructor(private httpClient:HttpClient) { 
  	this.getMockSurveyForm();
  }

  getMockSurveyForm(): void {
  	this.httpClient.get('assets/surveyForm.html', {responseType: 'text'}).subscribe(data => {
  		this.mockSurveyForm = data;
  		//console.log(this.mockSurveyForm);
  	});
  }

  getListOfClients(): Observable<Client[]> {
  	return of(this.currentClients);
  }

  getListOfProjects(): Observable<Project[]> {
    return of(this.currentProjects);
  }

  getListOfEmployees(): Observable<Employee[]> {
    return of(this.currentEmployees);
  }

  getListOfSurveys(): Observable<Survey[]> {
    return of(this.currentSurveys);
  }

  getListOfProjectsForClient(clientId): Observable<Project[]> {
  	return of(this.currentProjects);
  }

  getListOfEmployeesOnProject(projectId): Observable<Employee[]> {
  	return of(this.currentEmployees);
  }

  saveSurvey(survey: Survey): Survey {
  	// assign an id
  	if (!survey.id) {
  		survey.id = this.getUniqueId();
  		survey.createdDt = new Date().toISOString();
  		this.currentSurveys.push(survey);
  	} else {
  		var surveyId = survey.id;
  		var index = this.currentSurveys.findIndex(s => s.id === survey.id);
  		this.currentSurveys[index] = survey;
  	}

  	return survey;
  }

  getSurvey(surveyId): Observable<Survey> {
  	var survey = this.currentSurveys.find(s => s.id === surveyId);
  	survey.surveyform = this.mockSurveyForm;
  	return of(survey);
  }

  sendSurvey(survey: Survey): void {
  	var survey = this.currentSurveys.find(s => s.id === survey.id);
  	survey.status = "Sent";
  }

  getProject(projectId): Observable<Project> {
  	var project = this.currentProjects.find(p => p.id === projectId);
  	return of(project);
  }

  getClient(clientId): Observable<Client> {
    var client = this.currentClients.find(c => c.id === clientId);
    return of(client);
  }

  saveClient(client: Client): Client {
    // assign an id
    if (!client.id) {
      client.id = this.getUniqueId();
      //client.createdDt = new Date().toISOString();
      this.currentClients.push(client);
    } else {
      var clientId = client.id;
      var index = this.currentClients.findIndex(s => s.id === clientId);
      this.currentClients[index] = client;
    }

    return client;
  }

  getEmployee(employeeId): Observable<Employee> {
    var employee = this.currentEmployees.find(e => e.id === employeeId);
    return of(employee);
  }

  saveEmployee(employee: Employee): Employee {
    if (!employee.id) {
      employee.id = this.getUniqueId();
      this.currentEmployees.push(employee);
    } else {
      var index = this.currentEmployees.findIndex(e => e.id === employee.id);
      this.currentEmployees[index] = employee;
    }
    return employee;
  }

  getUniqueId(): string {
	return new Date().valueOf().toString(36) + Math.random().toString(36).substr(2);
  }
}
