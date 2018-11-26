import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from "@angular/router";

import { Project } from '../models/project.model';
import { Client } from '../models/client.model';
import { Person } from '../models/person.model';
import { Employee } from '../models/employee.model';
import { SurveyService } from "../shared/survey-service.service";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  projectForm = new FormGroup({
    projectName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  	client: new FormControl('', Validators.required),
  	contactFirstName: new FormControl('', Validators.required),
  	contactLastName: new FormControl('', Validators.required),
  	contactEmail: new FormControl('', [Validators.required, Validators.email]),
  	pmFirstName: new FormControl('', Validators.required),
  	pmLastName: new FormControl('', Validators.required),
  	pmEmail: new FormControl('', [Validators.required, Validators.email]),
  });

  clients: Client[];
  title: string = "Add Project";
  inEditMode: boolean = false;
  project: Project = null;
  allEmployees: Employee[] = [];
  selectedEmployees: Employee[] = [];

  constructor(public surveyService: SurveyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
	// check if in editing or adding
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log("Editing project for id: ", id);
      this.title = "Edit Project"
      this.inEditMode = true;
      this.getProjectToEdit(id);
    } else {
      console.log("Adding project");
      this.title = "Add Project"
    }
    this.getListOfClients();
    this.getListOfEmployee();
  }

  getProjectToEdit(id): void {

  	this.surveyService.getProject(id).subscribe(result => {
  		this.project = result;
  		this.projectForm.get('projectName').setValue(this.project.itemName);
  		this.projectForm.get('contactFirstName').setValue(this.project.contact.firstName);
   		this.projectForm.get('contactLastName').setValue(this.project.contact.lastName);
  		this.projectForm.get('contactEmail').setValue(this.project.contact.email);
  		this.projectForm.get('pmFirstName').setValue(this.project.programManager.firstName);
   		this.projectForm.get('pmLastName').setValue(this.project.programManager.lastName);
  		this.projectForm.get('pmEmail').setValue(this.project.programManager.email);
  	});

  }

  getListOfClients(): void {

  	this.surveyService.getListOfClients().subscribe(result => {
  		this.clients = result;
  		if (this.inEditMode) {
  			// make selection
  			this.projectForm.get('client').setValue(this.project.clientId);
  		}
  	});

  }

  getListOfEmployee(): void {

  	this.surveyService.getListOfEmployees().subscribe(result => {
  		// need to make a copy since this list will be altered.
  		result.forEach(emp => {
  			this.allEmployees.push(emp);
  		})
  		if (this.inEditMode) {
  			// set the selected employees, remove them from the all employees list
  			this.project.employees.forEach(emp => {
  				this.assignEmployee(emp);
  			})
  		}
  	})

  }

  onCancel(): void {
    this.router.navigate(['/projects']);
  }

  onSubmit(): void {
  	if (!this.project) {
  	  this.project = new Project();
  	  this.project.contact = new Person();
  	  this.project.programManager = new Person();
  	}
  	this.project.itemName = this.projectForm.value.projectName;
  	this.project.clientId = this.projectForm.value.client;
  	var client = this.clients.find(c => c.id === this.project.clientId);
  	this.project.clientName = client.itemName;
  	this.project.contact.firstName = this.projectForm.value.contactFirstName;
  	this.project.contact.lastName = this.projectForm.value.contactLastName;
  	this.project.contact.email = this.projectForm.value.contactEmail;
  	this.project.programManager.firstName = this.projectForm.value.pmFirstName;
  	this.project.programManager.lastName = this.projectForm.value.pmLastName;
  	this.project.programManager.email = this.projectForm.value.pmEmail;
  	this.project.employees = this.selectedEmployees;

  	this.surveyService.saveProject(this.project);

  	this.router.navigate(['/projects']);
  }

  getProjectNameError(): string {
    var projectName = this.projectForm.get('projectName');
    return projectName.hasError('required') ? 'This field is required' :
        projectName.hasError('minlength') ? 'Please enter at least 3 characters' :
            '';
  }

  getContactEmailError(): string {
  	var contactEmail = this.projectForm.get("contactEmail");
  	return this.getEmailError(contactEmail);
  }

  getPmEmailError(): string {
  	var pmEmail = this.projectForm.get("pmEmail");
  	return this.getEmailError(pmEmail);
  }
  

  getEmailError(formField): string {
    return formField.hasError('required') ? 'This field is required' :
        formField.hasError('email') ? 'Please enter a valid email' :
            '';
  }

  assignEmployee(employee: Employee): void {
  	// add to the selected list and remove from all employee list
  	this.selectedEmployees.push(employee);
  	let index = this.allEmployees.findIndex(emp => emp.id === employee.id);
    this.allEmployees.splice(index, 1);
  }

  unassignEmployee(employee: Employee): void {
  	// remove it from the selected list and put it back in the all employees list
  	let index = this.selectedEmployees.findIndex(emp => emp.id === employee.id);
  	this.selectedEmployees.splice(index, 1);
  	this.allEmployees.push(employee);
  }
}
