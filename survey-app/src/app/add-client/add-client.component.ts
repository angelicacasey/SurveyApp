import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from "@angular/router";

import { Client } from "../models/client.model";
import { Project } from "../models/project.model";
import { SurveyService } from "../shared/survey-service.service";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  clientForm = new FormGroup ({
  	clientName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  	description: new FormControl('')
  });

  title: string;
  inEditMode: boolean = false;
  client: Client = null;
  projectList: Project[];

  constructor(public surveyService: SurveyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

  	// check if in editing or adding
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log("Editing client for id: ", id);
      this.title = "Edit Client"
      this.inEditMode = true;
      this.getClientToEdit(id);
    } else {
      console.log("Adding client");
      this.title = "Add Client"
    }
  }

  getClientToEdit(id: string): void {
  	this.surveyService.getClient(id).subscribe(result => {
  		this.client = result;
  		this.clientForm.get('clientName').setValue(this.client.itemName);
  		this.clientForm.get('description').setValue(this.client.description);
  		this.getProjectsForClient(this.client.id);
  	});
  }

  getProjectsForClient(id: string): void {
  	this.surveyService.getListOfProjectsForClient(id).subscribe(result => {
  	  this.projectList = result;
  	});
  }

  onSubmit(): void {
  	if (this.clientForm.valid) {
   	  console.log("Submitting: ", this.clientForm.value);
  	  if (!this.client) {
  	    this.client = new Client();
  	  } 
  	  this.client.itemName = this.clientForm.value.clientName;
  	  this.client.description = this.clientForm.value.description;
  	  this.surveyService.saveClient(this.client);

  	  this.router.navigate(['/clients']); 		
  	}

  }

  onCancel(): void {
  	this.router.navigate(['/clients']);
  }

  getClientNameError(): string {
  	var clientName = this.clientForm.get('clientName');
  	return clientName.hasError('required') ? 'This field is required' :
        clientName.hasError('minlength') ? 'Please enter at least 3 characters' :
        '';
  }
}
