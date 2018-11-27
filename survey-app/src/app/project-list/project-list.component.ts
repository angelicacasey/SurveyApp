import { Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from "@angular/router";

import {Project} from "../models/project.model";
import {SurveyService} from "../shared/survey-service.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  displayedColumns: string[] = ["itemName", "clientName", "contact", "programManager", "action"];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router,
  			  private surveyService: SurveyService) { }

  ngOnInit() {
  	this.dataSource.sort = this.sort;
  	this.dataSource.paginator = this.paginator;
  	this.getListOfProjects();
  }

  getListOfProjects(): void {
  	this.surveyService.getListOfProjects().subscribe(result => {
  		this.dataSource.data = result;
  	});
  }

  editProject(project: Project): void {
  	console.log("Edit project: ", project.id + ": " + project.itemName);
  	this.router.navigate(['/projects/edit/' + project.id]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
