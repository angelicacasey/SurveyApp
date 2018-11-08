import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Survey } from '../models/survey.model';
import { SurveyService } from '../shared/survey-service.service';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.scss']
})
export class ViewSurveyComponent implements OnInit {

  survey: Survey;

  constructor(
  	private route: ActivatedRoute,
  	private location: Location,
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

  goBack(): void {
    this.location.back();
  }
}
