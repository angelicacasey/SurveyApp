import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

import { Survey } from '../models/survey.model';
import { SurveyService } from '../shared/survey-service.service';

@Component({
  selector: 'app-preview-survey',
  templateUrl: './preview-survey.component.html',
  styleUrls: ['./preview-survey.component.scss']
})
export class PreviewSurveyComponent implements OnInit {

  survey: Survey;
  surveyHtml: string = 	'<h2>How can we improve your experience?</h2>'+
	'<form ACTION="https://64fivj2p2a.execute-api.us-west-1.amazonaws.com/dev/survey" METHOD=POST>'+
	'<input type="radio" name="answer" value=option1>Add more people<br>'+
	'<input type="radio" name="answer" value=option2>Provide project management<br>'+
	'<input type="radio" name="answer" value=option3>Provide technical assistance\n</>'+
	'<input type="hidden" id="survey_id" name="survey_id" value=survey123></>'+
	'<input type="submit" name="submit" value="submit survey"></></form>';

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
    private surveyService: SurveyService) { }

  ngOnInit() {
  	this.getSurvey();
  }

  getSurvey(): void {
  	const id = this.route.snapshot.paramMap.get('id');
  	console.log("Get survey for id: ", id);
    this.surveyService.getSurvey(id).subscribe(result => {
      this.survey = result;
    });
  }

  editSurvey(): void {
  	this.router.navigate(['/surveys/edit/' + this.survey.id]);
  }

  sendSurvey(): void {
  	// call service to send survey
  	// go back to list
  	this.router.navigate(['/surveys']);
  }

}
