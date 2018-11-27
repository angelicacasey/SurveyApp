import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, retry } from 'rxjs/operators';


import { Client } from '../models/client.model';
import { Project } from '../models/project.model';
import { Employee } from '../models/employee.model';
import { Survey } from '../models/survey.model';


const MOCK_CLIENTS: Client[] = [
  {
    "id": "client1",
    "itemName": "Super Client",
    "dataType": "CLIENT",
    "associatedId": "",
    "description": "Medical devices specializing in insulin pumps"
  },
  {
    "id": "client2",
    "itemName": "Uber Client",
    "dataType": "CLIENT",
    "associatedId": "",
    "description": "Robotics non-medical."

  }
];

 const MOCK_PROJECTS: Project[] = [];
//   {
//     "id": "project1",
//     "itemName": "ABC",
//     "clientId": "client1",
//     "clientName": "Super Client",
//     "contact": {
//     	"firstName": "Elmer",
//     	"lastName": "Fudd",
//     	"email": "efudd@meddevlmtd.com"
//     },
//     "programManager": {
//     	"firstName": "Sherlock",
// 	 	"lastName": "Holmes",
// 	 	"email": "sholmes@medacuitysoftware.com"
//     },
//     "employees": [
//     {
//       "id": "emp2",
//       "itemName": "Hermoine Granger",
//       "firstName": "Hermoine",
//       "lastName": "Granger"
//     }]
//   },
//   {
//     "id": "project2",
//     "itemName": "DEF",
//     "clientId": "client1",
//     "clientName": "Super Client",
//     "contact": {
//     	"firstName": "Homer",
//     	"lastName": "Simpson",
//     	"email": "hsimpson@medevlmtd.com"
//     },
//     "programManager": {
//     	"firstName": "Sherlock",
// 	 	"lastName": "Holmes",
// 	 	"email": "sholmes@medacuitysoftware.com"
//     },
//     "employees": [
//     {
//       "id": "emp1",
//       "itemName": "Harry Potter",
//       "firstName": "Harry",
//       "lastName": "Potter"
//     }]
//   }
// ];

 const MOCK_EMPLOYEES: Employee[] = [];
//   {
//     "id": "emp1",
//     "itemName": "Harry Potter",
//     "firstName": "Harry",
//     "lastName": "Potter"
//   },
//   {
//     "id": "emp2",
//     "itemName": "Hermoine Granger",
//     "firstName": "Hermoine",
//     "lastName": "Granger"
//   }
// ];

const MOCK_SURVEYS: Survey[] = [];
 	// {
  // 		"id": "Survey1",
  // 		"projectId": "project2",
	 // 	"projectName": "Project X",
	 // 	"clientId": "client1",
	 // 	"clientName": "Client Y",
	 // 	"itemName": "My Survey",
	 // 	"createdBy": {
	 // 		"firstName": "Sherlock",
	 // 		"lastName": "Holmes",
	 // 		"email": "sholmes@medacuitysoftware.com"
	 // 	},
	 // 	"recipient": {
	 // 		"firstName": "Mary",
	 // 		"lastName": "Smith",
	 // 		"email": "msmith@meddevlmtd.com"
	 // 	},
	 // 	"status": "Draft",
	 // 	"createdDt": "2018-11-02T16:11:33.448Z",
	 // 	"questions": [],
	 // 	"surveyform": "",
  //    "respondedDt": "",
  //    "lastSentDt": "",
  //    "numTimesSent": 0
  // 	},
  // 	 {
  // 		"id": "Survey2",
	 // 	"projectName": "Secret Project",
	 // 	"projectId": "project2",
	 // 	"clientId": "client1",
	 // 	"clientName": "Client Y",
	 // 	"itemName": "Rating Survey",
	 // 	"createdBy": {
	 // 		"firstName": "Sherlock",
	 // 		"lastName": "Holmes",
	 // 		"email": "sholmes@medacuitysoftware.com"
	 // 	},
	 // 	"recipient": {
	 // 		"firstName": "John",
	 // 		"lastName": "Doe",
	 // 		"email": "jdoe@outlook.com"
	 // 	},
	 // 	"status": "Sent",
	 // 	"createdDt": "2018-10-03T11:23:33.448Z",
	 // 	"questions": [
	 // 	  {
	 // 	  	"id": "1a",
	 // 	    "question": "Please provide a rating for George Smith",
	 // 	    "questionType": "Employee_Rating",
	 // 	    "employeeId": "empl1",
		// 	"options": [],
		// 	"rating": 0,
		// 	"response": ""
		//   },
		//   {
	 // 	  	"id": "1b",
	 // 	    "question": "Please provide a rating for Mary Jones",
	 // 	    "questionType": "Employee_Rating",
	 // 	    "employeeId": "empl2",
		// 	"options": [],
		// 	"rating": 0,
		// 	"response": ""
		//   }
	 // 	],
	 // 	"surveyform": "",
  //    "respondedDt": "",
  //    "lastSentDt": "2018-10-03T11:24:33.448Z",
  //    "numTimesSent": 0
  // 	},
  // 	{
  // 		"id": "Survey3",
  // 		"projectId": "project2",
	 // 	"clientId": "client1",
	 // 	"projectName": "Uber Project",
		// "clientName": "Super Client",
	 // 	"itemName": "Super Uber Survey",
	 // 	"createdBy": {
	 // 		"firstName": "Harry",
	 // 		"lastName": "Potter",
	 // 		"email": "hpotter@medacuitysoftware.com"
	 // 	},
	 // 	"recipient": {
	 // 		"firstName": "Ron",
	 // 		"lastName": "Weasley",
	 // 		"email": "rweasley@hogwarts.edu"
	 // 	},
	 // 	"status": "Got Response",
	 // 	"createdDt": "2018-11-02T16:11:33.448Z",
	 // 	"questions": [
	 // 	  {
	 // 	  	"id": "2a",
	 // 	    "question": "Please provide a rating for George Smith",
	 // 	    "questionType": "Employee_Rating",
	 // 	    "employeeId": "empl1",
		// 	"options": [],
		// 	"rating": 4,
		// 	"response": "He's awesome!"
		//   },
		//   {
	 // 	  	"id": "2b",
	 // 	    "question": "Please provide a rating for MedAcuity in general",
	 // 	    "questionType": "MedAcuity_Rating",
	 // 	    "employeeId": "",
		// 	"options": [],
		// 	"rating": 3,
		// 	"response": ""
		//   },
		//   {
	 // 	  	"id": "2c",
	 // 	    "question": "How can we improve your project?",
	 // 	    "questionType": "Custom",
	 // 	    "employeeId": "",
		// 	"options": ["add more people", "provide project management"],
		// 	"rating": 0,
		// 	"response": "add more people"
		//   },
  //     {
  //        "id": "2e",
  //        "question": "Are we delivering?",
  //        "questionType": "Custom",
  //        "employeeId": "",
  //     "options": [],
  //     "rating": 0,
  //     "response": "More or less we are on schedule."
  //     }
	 // 	],
	 // 	"surveyform": "",
  //    "respondedDt": "2018-11-05T08:23:33.448Z",
  //    "lastSentDt": "2018-11-02T16:20:33.448Z",
  //    "numTimesSent": 1
  // 	}
  // ]


@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  currentSurveys: Survey[] = MOCK_SURVEYS;
  currentProjects: Project[] = MOCK_PROJECTS;
  currentClients: Client[] = MOCK_CLIENTS;
  currentEmployees: Employee[] = MOCK_EMPLOYEES;
  mockSurveyForm: any;

  baseUrl = "http://localhost:8080";
  clientUrl = this.baseUrl + "/client";
  employeeUrl = this.baseUrl + "/employee";
  employeesByIdListUrl = this.baseUrl + "/employee/byIdList";
  projectUrl = this.baseUrl + "/project";
  projectByClientUrl = this.baseUrl + "/project/byClient/";
  surveyUrl = this.baseUrl + "/survey";

  constructor(private httpClient:HttpClient) { 
  	this.getMockSurveyForm();
  }

  private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
  };

  getMockSurveyForm(): void {
  	this.httpClient.get('assets/surveyForm.html', {responseType: 'text'}).subscribe(data => {
  		this.mockSurveyForm = data;
  		//console.log(this.mockSurveyForm);
  	});
  }

  //////////////// Clients ////////////
  getListOfClients(): Observable<Client[]> {
  	return this.httpClient.get<Client[]>(this.clientUrl)
              .pipe(
                  catchError(this.handleError)
                );
  }

  getClient(clientId): Observable<Client> {
    return this.httpClient.get<Client>(this.clientUrl + "/" + clientId)
            .pipe(
              catchError(this.handleError)
             );
  }

  saveClient(client: Client): Observable<Client> {
    if (!client.id) {
      client.dataType = "CLIENT";
      client.associatedId = "none";
      return this.httpClient.post<Client>(this.clientUrl, client)
              .pipe(
                catchError(this.handleError)
              );
    } else {
      return this.httpClient.put<Client>(this.clientUrl + "/" + client.id, client)
              .pipe(
                catchError(this.handleError)
              );
    }
  }

  getListOfProjectsForClient(clientId): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.projectByClientUrl + clientId)
            .pipe(
              catchError(this.handleError)
            );
  }

  //////////////// Employees ////////////  
  getListOfEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.employeeUrl)
              .pipe (
                catchError(this.handleError)
              );
  }

  getEmployee(employeeId): Observable<Employee> {
    return this.httpClient.get<Employee>(this.employeeUrl + "/" + employeeId)
              .pipe (
                catchError(this.handleError)
               );
  }

  saveEmployee(employee: Employee): Observable<Employee> {
    if (!employee.id) {
      employee.dataType = "EMPLOYEE";
      employee.associatedId = "none";
      return this.httpClient.post<Employee>(this.employeeUrl, employee)    
                .pipe(
                  catchError(this.handleError)
                 );

    } else {
      return this.httpClient.put<Employee>(this.employeeUrl + "/" + employee.id, employee)  
          .pipe(
            catchError(this.handleError)
           );
    }
  }

  getEmployeesByList(employeeIdList): Observable<Employee[]> {
    return this.httpClient.post<Employee[]>(this.employeesByIdListUrl, employeeIdList)
        .pipe(
          catchError(this.handleError)
        );
  }


  //////////////// Projects ////////////
  getListOfProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.projectUrl)
              .pipe(
                catchError(this.handleError)
               );
  }

  getProject(projectId): Observable<Project> {
    return this.httpClient.get<Project>(this.projectUrl + "/" + projectId)
              .pipe(
                catchError(this.handleError)
               );
  }

  saveProject(project: Project): Observable<Project> {
    // assign an id
    if (!project.id) {
      project.dataType = "PROJECT";
      project.associatedId = project.clientId;
      return this.httpClient.post<Project>(this.projectUrl, project)
               .pipe(
                catchError(this.handleError)
               );

    } else {
      return this.httpClient.put<Project>(this.projectUrl + "/" + project.id, project)
               .pipe(
                catchError(this.handleError)
               );
    }
  }

  //////////////// Surveys ////////////
  getListOfSurveys(): Observable<Survey[]> {
    return this.httpClient.get<Survey[]>(this.surveyUrl)
            .pipe(
              catchError(this.handleError)
            );
  }


  getSurvey(surveyId): Observable<Survey> {
    return this.httpClient.get<Survey>(this.surveyUrl + "/" + surveyId)
            .pipe(
              catchError(this.handleError)
            );
  }

  saveSurvey(survey: Survey): Observable<Survey> {
  	// assign an id
  	if (!survey.id) {
  		survey.dataType = "SURVEY";
      survey.associatedId = survey.projectId;
      return this.httpClient.post<Survey>(this.surveyUrl, survey)
            .pipe(
              catchError(this.handleError)
            );
  	} else {
  		return this.httpClient.put<Survey>(this.surveyUrl + "/" + survey.id, survey)
            .pipe(
              catchError(this.handleError)
            );
  	}
  }


  sendSurvey(survey: Survey): void {
  	var survey = this.currentSurveys.find(s => s.id === survey.id);
  	survey.status = "Sent";
  }


  getUniqueId(): string {
	return new Date().valueOf().toString(36) + Math.random().toString(36).substr(2);
  }
}
