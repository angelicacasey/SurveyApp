import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { Location } from '@angular/common';

import { Survey } from '../models/survey.model';
import { SurveyService } from '../shared/survey-service.service';

@Component({
  selector: 'app-preview-survey',
  templateUrl: './preview-survey.component.html',
  styleUrls: ['./preview-survey.component.scss']
})
export class PreviewSurveyComponent implements OnInit {

  survey: Survey;
  surveyHtml: string;

  @ViewChild('surveyContainer') surveyContainer: ElementRef;

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
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
      this.surveyHtml = this.survey.surveyform;
      this.surveyContainer.nativeElement.innerHTML = this.surveyHtml;
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

  goBack(): void {
    this.location.back();
  }

}
