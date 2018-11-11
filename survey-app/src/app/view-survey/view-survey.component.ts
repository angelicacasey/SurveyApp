import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Survey } from '../models/survey.model';
import { Question } from '../models/question.model';
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

  convertRatingToArray(rating): number[] {
    return Array(rating);
  }

  isRatingQuestion(questionType):boolean {
    return questionType.indexOf('Rating') >= 0;
  }

  isCustomQuestion(questionType):boolean {
    return questionType === 'Custom';
  }

  haveOptions(options):boolean {
    return (options && options.length > 0);
  }

  isSelectedOption(option:string, question:Question) {
    var temp = option === question.response;
    console.log("isSelectedOption " + option +" => " + question.response+" result: " + temp);
    return option === question.response;
  }
}
