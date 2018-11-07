import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Router} from "@angular/router";

import { Question } from "../models/question.model"
import { SurveyService } from "../shared/survey-service.service"

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.scss']
})
export class AddSurveyComponent implements OnInit {

  surveyForm = new FormGroup(
  {
  	id: new FormControl(''),
  	surveyName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  	client: new FormControl('', Validators.required),
  	project: new FormControl({value: '', disabled: true}, Validators.required),
    recipientChoice: new FormControl({value: '', disabled: true}),
  	recipientFirstName: new FormControl({value: '', disabled: true}, Validators.required),
  	recipientLastName: new FormControl({value: '', disabled: true}, Validators.required),
  	recipientEmail: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
    requestFeedback: new FormControl({value: false, disabled: true})
  });

  displayedColumns: string[] = ["question", "options", "action"];
  dataSource = new MatTableDataSource();
  questions = [];
  clients = [];
  projects = [];
  employees = [];
  isClientSelected = false;
  isProjectSelected = false;
  selectedProject = null;
  selectedEmployee = null;
  questionCounter:number = 1;
  showNoQuestionError: boolean = false;

  constructor(public dialog: MatDialog, 
              public snackBar: MatSnackBar,
              public surveyService: SurveyService,
              private router: Router) { }

  ngOnInit() {
    this.dataSource.data = this.questions;
    this.getListOfClients();

    this.onChanges();
  }

  onChanges(): void {
    this.surveyForm.get('client').valueChanges
      .subscribe(val => this.clientChanged(val));

    this.surveyForm.get('project').valueChanges
      .subscribe(val => this.projectChanged(val));

    this.surveyForm.get('recipientChoice').valueChanges
      .subscribe(val => this.recipientChoiceChanged(val));

    this.surveyForm.get('requestFeedback').valueChanges
      .subscribe(val => this.requestFeedbackChanged(val));
  }

  clientChanged(val): void {
    console.log("client changed, val=", val);
    this.isClientSelected = true;
    this.surveyForm.get('project').enable();
    this.getProjects(val);
  }

  projectChanged(val): void {
    console.log("project changed, val=", val);
    if (val) {
      var projectData = this.projects.find(proj => proj.id == val);
      console.log(projectData);
      this.selectedProject = projectData;
      this.surveyForm.get('recipientChoice').enable();
      this.surveyForm.get('requestFeedback').enable();    

      this.surveyForm.get('recipientChoice').setValue("1"); 

      this.getEmployees(val);
      this.isProjectSelected = true;
    }
  }

  recipientChoiceChanged(val): void {
    console.log("recipient choice changed, val=", val);
    if (val === '1') {
      this.surveyForm.get('recipientFirstName').setValue(this.selectedProject.contactFirstName);  
      this.surveyForm.get('recipientLastName').setValue(this.selectedProject.contactLastName);
      this.surveyForm.get('recipientEmail').setValue(this.selectedProject.contactEmail); 
      this.surveyForm.get('recipientFirstName').disable();
      this.surveyForm.get('recipientLastName').disable();
      this.surveyForm.get('recipientEmail').disable();
    } else {
      this.surveyForm.get('recipientFirstName').setValue("");  
      this.surveyForm.get('recipientLastName').setValue("");
      this.surveyForm.get('recipientEmail').setValue(""); 
      this.surveyForm.get('recipientFirstName').enable();
      this.surveyForm.get('recipientLastName').enable();
      this.surveyForm.get('recipientEmail').enable();
    }
  }

  requestFeedbackChanged(val): void {
    console.log("requestFeedback changed, val=", val);
    if (val) {
      var questionId = this.questionCounter++
      // add question
      var question = {
        "id": ""+questionId,
        "question": "Rate MedAcuity",
        "options": "",
        "questionType": "Medacuity_Rating"
      };
      this.questions.push(question);
    } else {
      // remove question
      let index = this.questions.findIndex(ques => ques.questionType === "Medacuity_Rating");
      this.questions.splice(index, 1);
    }
    this.dataSource.data = this.questions;
    this.showNoQuestionError = false;
  }

  onSubmit(): void {
    console.log("Submitting: ", this.surveyForm.value);
    if (this.questions.length == 0) {
      this.showNoQuestionError = true;
    }
  }

  onClear(): void {

    let id = this.surveyForm.get('id'); // this will be used when doing editing
    this.surveyForm.reset();
    this.initializeFormGroup();
    this.surveyForm.patchValue({id});

    this.questions = [];
  }

  onCancel(): void {
    this.router.navigate(['/surveys']);
  }

  initializeFormGroup(): void {

    this.surveyForm.setValue({
      id: '',
      surveyName: '',
      client: '',
      project: '',
      recipientChoice: '',
      recipientFirstName: '',
      recipientLastName: '',
      recipientEmail: '',
      requestFeedback: false
    });

    this.surveyForm.get('project').disable();
    this.surveyForm.get('recipientChoice').disable();
    this.surveyForm.get('recipientFirstName').disable();
    this.surveyForm.get('recipientLastName').disable();
    this.surveyForm.get('recipientEmail').disable();
    this.surveyForm.get('requestFeedback').disable();    

  }

  getEmailError(): string {
    var recipientEmail = this.surveyForm.get('recipientEmail');
    return recipientEmail.hasError('required') ? 'This field is required' :
        recipientEmail.hasError('email') ? 'Please enter a valid email' :
            '';
  }

  getSurveyNameError(): string {
    var recipientEmail = this.surveyForm.get('surveyName');
    return recipientEmail.hasError('required') ? 'This field is required' :
        recipientEmail.hasError('minlength') ? 'Please enter at least 3 characters' :
            '';
  }

  addEmployeeQuestion(): void {
    var employee = this.employees.find(empl => empl.id === this.selectedEmployee);
    // check if there is a question for this employee
    if (!this.haveQuestionForEmployee(employee.id)) {
      var questionId = this.questionCounter++
      var question = {
        "id": ""+questionId,
        "question": "Rate employee " + employee.value,
        "options": "",
        "employeeId": employee.id,
        "questionType": "Employee_Rating"
      };
      this.questions.push(question);
      this.dataSource.data = this.questions;
    } else {
      let snackBarRef = this.snackBar.open("Question already added!", "ok", {duration: 2000});
    }
    this.selectedEmployee = null;
    this.showNoQuestionError = false;
  }

  haveQuestionForEmployee(employeeId): boolean {
    var haveQuestion = false;
    if (this.questions.length > 0) {
      var employeeQuestion = this.questions.find(q => (q.questionType === "Employee_Rating" 
                                              && q.employeeId === employeeId));
      if(employeeQuestion) {
        haveQuestion = true;
      }
    }
    return haveQuestion;
  }

  deleteQuestion(question): void {
    let index = this.questions.findIndex(ques => ques.id === question.id);
    if (this.questions[index].questionType === "Medacuity_Rating") {
      this.surveyForm.get('requestFeedback').setValue(false);
    } else {
      this.questions.splice(index, 1);
      this.dataSource.data = this.questions;
    }
  }

  editQuestion(question): void {
    const dialogRef = this.dialog.open(AddQuestionDialog, {
      width: '500px',
      data: question
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ', result);
      if (result) {
        // find the question and replace it
        let itemIndex = this.questions.findIndex(item => item.id == result.id);
        this.questions[itemIndex] = result; 
        this.dataSource.data = this.questions;
      }
    });
  }

  getListOfClients(): void {

    this.surveyService.getListOfClients().subscribe(result => {
      this.clients = result;
    });
  }

  getProjects(clientId): void {
    this.surveyService.getListOfProjectsForClient(clientId)
      .subscribe(result => {
        this.projects = result;
      });
  }

  getEmployees(projectId): void {
    this.surveyService.getListOfEmployeesOnProject(projectId)
      .subscribe(result => {
        this.employees = result;
      });
  }

  addCustomQuestion(): void {
    const dialogRef = this.dialog.open(AddQuestionDialog, {
      width: '500px',
      data: {question: "", questionType: "Custom", options: []}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ', result);
      if (result) {
        result.id = ""+this.questionCounter++;
        this.questions.push(result);
        this.dataSource.data = this.questions;
        this.showNoQuestionError = false;
      }
    });
  }

}

@Component({
  selector: 'add-question-dialog',
  templateUrl: 'add-question-dialog.html',
})
export class AddQuestionDialog {

  option: string = "";

  constructor(
    public dialogRef: MatDialogRef<AddQuestionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Question) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addOption(): void {
    this.data.options.push(this.option);
    this.option = "";
  }

  deleteOption(val): void {
    let index = this.data.options.indexOf(val);
    this.data.options.splice(index, 1)
  }

}

