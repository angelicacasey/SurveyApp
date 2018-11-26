import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from "@angular/router";

import {Client} from "../models/client.model"
import {SurveyService} from "../shared/survey-service.service"

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  displayedColumns: string[] = ["itemName", "description", "action"];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router,
  			  private surveyService: SurveyService) { }

  ngOnInit() {
  	this.dataSource.sort = this.sort;
  	this.dataSource.paginator = this.paginator;
  	this.getListOfClients();
  }

  getListOfClients(): void {
  	this.surveyService.getListOfClients().subscribe(result => {
  		this.dataSource.data = result;
  	});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editClient(client: Client): void {
    console.log("Edit client: ", client.id + ": " + client.itemName);
    this.router.navigate(['/clients/edit/'+ client.id]);
  }
}
