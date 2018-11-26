import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from "@angular/router";

import {Employee} from "../models/employee.model"
import {SurveyService} from "../shared/survey-service.service"

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ["firstName", "lastName", "action"];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router,
  			  private surveyService: SurveyService) { }


  ngOnInit() {
  	this.dataSource.sort = this.sort;
  	this.dataSource.paginator = this.paginator;
  	this.getListOfEmployees();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListOfEmployees(): void {
  	this.surveyService.getListOfEmployees().subscribe(result => {
  		this.dataSource.data = result;
  	});
  }

  editEmployee(employee: Employee): void {
  	console.log("Edit employee: ", employee.id + " : " + employee.firstName + " " + employee.lastName);
  	this.router.navigate(['/employees/edit/' + employee.id]);
  }
}
