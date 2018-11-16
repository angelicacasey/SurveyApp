import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from "@angular/router";

import {Survey} from "../models/survey.model"
import {SurveyService} from "../shared/survey-service.service"

export class SurveyItem {
  id: string;
  name: string;
  status: string;
  projectName: string;
  recipient: string;
  createdBy: string;
  lastUpdatedDt: string;
}

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {

  displayedColumns: string[] = ["itemName", "status", "projectName", "recipient", "createdBy", "updatedDt", "action"];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router,
  			  private surveyService: SurveyService) { }

  ngOnInit() {
  	this.dataSource.sort = this.sort;
  	this.dataSource.paginator = this.paginator;
  	this.getListOfSurveys();
  }

  getListOfSurveys(): void {
  	this.surveyService.getListOfSurveys().subscribe(result => {
      var surveyItems: SurveyItem[] = [];
      for (let survey of result) {
        var item = new SurveyItem();
        item.id = survey.id;
        item.name = survey.itemName;
        item.status = survey.status;
        item.projectName = survey.projectName;
        item.recipient = survey.recipient.firstName + " " + survey.recipient.lastName;
        item.createdBy = survey.createdBy.firstName + " " + survey.createdBy.lastName;
        var status = survey.status;
        var updatedDt = survey.createdDt;
        if (status === "Got Response") {
          updatedDt = survey.respondedDt;
        } else if (status === "Sent") {
          updatedDt = survey.lastSentDt;
        }
        item.lastUpdatedDt = updatedDt;

        surveyItems.push(item);
      }
  		this.dataSource.data = surveyItems;
  	});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewSurvey(survey: Survey) : void {
  	console.log("View survey: ", survey.id + ": " + survey.itemName);
  	this.router.navigate(['/surveys/view/'+ survey.id]);
  }

  editSurvey(survey: Survey): void {
    console.log("Edit survey: ", survey.id + ": " + survey.itemName);
    this.router.navigate(['/surveys/edit/'+ survey.id]);
  }

  resendSurvey(survey: Survey): void {
    console.log("Resending survey, preview it first");
    this.router.navigate(['/surveys/preview/'+ survey.id]);
  }
}
