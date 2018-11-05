import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.scss']
})
export class AddSurveyComponent implements OnInit {

  profileForm = new FormGroup(
  	{
  		id: new FormControl(''),
  		surveyName: new FormControl(''),
  		client: new FormControl(''),
  		project: new FormControl(''),
  		recipientFirstName: new FormControl(''),
  		recipientLastName: new FormControl(''),
  		recipientEmail: new FormControl('')
  	});
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });

  displayedColumns: string[] = ["question", "options", "action"];
  dataSource = new MatTableDataSource();
  questions = [];

  constructor() { }

  ngOnInit() {
    this.dataSource.data = this.questions;
  }

  addMedAcuityQuestion(): void {
    var question = {
      "question": "Rate Medacuity",
      "options": ""
    };
    this.questions.push(question);
  }

}
