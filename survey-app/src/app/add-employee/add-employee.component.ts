import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from "@angular/router";

import { Employee } from "../models/employee.model";
import { SurveyService } from "../shared/survey-service.service";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm = new FormGroup({
  	firstName: new FormControl('', [Validators.required]),
  	lastName: new FormControl('', [Validators.required])
  });

  title: string;
  inEditMode: boolean = false;
  employee: Employee = null;

  constructor(public surveyService: SurveyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

  	// check if in editing or adding
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log("Editing employee for id: ", id);
      this.title = "Edit Employee"
      this.inEditMode = true;
      this.getEmployeeToEdit(id);
    } else {
      console.log("Adding Employee");
      this.title = "Add Employee"
    }
  }
  
  getEmployeeToEdit(employeeId): void {
  	this.surveyService.getEmployee(employeeId).subscribe(result => {
  		this.employee = result;
  		this.employeeForm.get('firstName').setValue(this.employee.firstName);
  		this.employeeForm.get('lastName').setValue(this.employee.lastName);
  	});
  }

  onSubmit(): void {
  	if (this.employeeForm.valid) {
  		console.log("Submitting: ", this.employeeForm.value);
  		if (!this.employee) {
  			this.employee = new Employee();
  		}
  		this.employee.firstName = this.employeeForm.value.firstName;
  		this.employee.lastName = this.employeeForm.value.lastName;
      this.employee.itemName = this.employee.firstName + " " + this.employee.lastName;

  		this.surveyService.saveEmployee(this.employee).subscribe(result => {
        console.log("Save employee result ", result);
        this.router.navigate(['/employees']);
      });
  		
  	}
  }

  onCancel(): void {
  	this.router.navigate(['/employees']);
  }

}
