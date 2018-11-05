import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.scss']
})
export class ViewSurveyComponent implements OnInit {

  constructor(
  	private route: ActivatedRoute,
  	private location: Location) { }

  ngOnInit() {
  	this.getSurvey();
  }

  getSurvey(): void {
  	const id = this.route.snapshot.paramMap.get('id');
  	console.log("Get survey for id: ", id);
  }

  goBack(): void {
    this.location.back();
  }
}
