import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from "@angular/router";

import {Survey} from "../models/survey.model"
import {SurveyService} from "../shared/survey-service.service"

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {

  displayedColumns: string[] = ["itemName", "status", "projectName", "recipient", "createdBy", "createdDt", "action"];
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
  		this.dataSource.data = result;
  	});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewSurvey(survey: Survey) : void {
  	console.log("View survey: ", survey.id + ": " + survey.itemName);
  	this.router.navigate(['/surveys/view/'+ survey.id])
  }
}
