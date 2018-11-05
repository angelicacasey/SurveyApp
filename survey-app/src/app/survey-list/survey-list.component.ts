import { Component, OnInit, ViewChild } from '@angular/core';
import {Survey} from "../models/survey.model"
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from "@angular/router";

  const SURVEYDATA: Survey[] = [
 	{
  		"id": "Survey1",
	 	"projectName": "Project X",
	 	"clientName": "Client Y",
	 	"itemName": "My Survey",
	 	"projectManager": "Sherlock Holmes",
	 	"recipient": "Mary Smith",
	 	"status": "Draft",
	 	"createdDt": "2018-11-02T16:11:33.448Z"
  	},
  	 {
  		"id": "Survey2",
	 	"projectName": "Secret Project",
	 	"clientName": "Client Y",
	 	"itemName": "Rating Survey",
	 	"projectManager": "Sherlock Holmes",
	 	"recipient": "John Doe",
	 	"status": "Sent",
	 	"createdDt": "2018-10-03:33:33.448Z"
  	},
  	{
  		"id": "Survey3",
	 	"projectName": "Uber Project",
		"clientName": "Super Client",
	 	"itemName": "Super Uber Survey",
	 	"projectManager": "Harry Potter",
	 	"recipient": "Ron Weasley",
	 	"status": "Got Response",
	 	"createdDt": "2018-11-02T16:11:33.448Z"
  	},
  	 	{
  		"id": "Survey1",
	 	"projectName": "Project X",
	 	"clientName": "Client Y",
	 	"itemName": "My Survey",
	 	"projectManager": "Sherlock Holmes",
	 	"recipient": "Mary Smith",
	 	"status": "Draft",
	 	"createdDt": "2018-11-02T16:11:33.448Z"
  	},
  	 {
  		"id": "Survey2",
	 	"projectName": "Secret Project",
	 	"clientName": "Client Y",
	 	"itemName": "Rating Survey",
	 	"projectManager": "Sherlock Holmes",
	 	"recipient": "John Doe",
	 	"status": "Sent",
	 	"createdDt": "2018-10-03:33:33.448Z"
  	},
  	{
  		"id": "Survey3",
	 	"projectName": "Uber Project",
		"clientName": "Super Client",
	 	"itemName": "Super Uber Survey",
	 	"projectManager": "Harry Potter",
	 	"recipient": "Ron Weasley",
	 	"status": "Got Response",
	 	"createdDt": "2018-11-02T16:11:33.448Z"
  	}
  ];

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {

  displayedColumns: string[] = ["itemName", "status", "projectName", "recipient", "action"];
  dataSource = new MatTableDataSource(SURVEYDATA);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router) { }

  ngOnInit() {
  	this.dataSource.sort = this.sort;
  	this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewSurvey(survey: Survey) : void {
  	console.log("View survey: ", survey.id + ": " + survey.itemName);
  	this.router.navigate(['/surveys/view/'+ survey.id])
  }
}
