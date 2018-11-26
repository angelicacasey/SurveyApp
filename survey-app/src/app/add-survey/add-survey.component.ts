import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute} from "@angular/router";

import { Survey } from "../models/survey.model";
import { Question } from "../models/question.model";
import { Person } from "../models/person.model";
import { SurveyService } from "../shared/survey-service.service";

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
    requestFeedback: new FormControl({value: false, disabled: true}),
    allEmployees: new FormControl({value: false, disabled: true})
  });

  displayedColumns: string[] = ["question", "options", "action"];
  dataSource = new MatTableDataSource();
  questions = [];
  clients = [];
  projects = [];
  employees = [];
  isClientSelected = false;
  isProjectSelected = false;
  isAllEmployeesChecked = false;
  selectedProject = null;
  selectedEmployee = null;
  questionCounter:number = 1;
  showNoQuestionError: boolean = false;
  survey: Survey;
  inEditMode: boolean = false;
  title: string;

  constructor(public dialog: MatDialog, 
              public snackBar: MatSnackBar,
              public surveyService: SurveyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataSource.data = this.questions;

    // check if in editing or adding
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log("Editing survey for id: ", id);
      this.title = "Edit Survey"
      this.inEditMode = true;
      this.getSurveyToEdit(id);
    } else {
      console.log("Adding survey");
      this.title = "Add Survey"
      this.getListOfClients();
    }

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

    this.surveyForm.get('allEmployees').valueChanges
      .subscribe(val => this.allEmployeesChanged(val));
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
      this.surveyForm.get('recipientFirstName').setValue(this.selectedProject.contact.firstName);  
      this.surveyForm.get('recipientLastName').setValue(this.selectedProject.contact.lastName);
      this.surveyForm.get('recipientEmail').setValue(this.selectedProject.contact.email); 
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
      var question = new Question();
      question.id = ""+questionId;
      question.question = "Please provide a rating of how MedAcuity is doing overall.";
      question.questionType = "Medacuity_Rating";
      this.questions.push(question);
    } else {
      // remove question
      let index = this.questions.findIndex(ques => ques.questionType === "Medacuity_Rating");
      this.questions.splice(index, 1);
    }
    this.dataSource.data = this.questions;
    this.showNoQuestionError = false;
  }

  allEmployeesChanged(val): void {
    if (val) {
      this.isAllEmployeesChecked = true;
      this.employees.forEach(employee => {
        this.createEmployeeQuestion(employee, false);
      });      
    } else {
      this.isAllEmployeesChecked = false;
      // remove all employee ratings
      var filteredQuestions = this.questions
                                  .filter(question => question.questionType != "Employee_Rating");
      this.questions = filteredQuestions;
      this.dataSource.data = this.questions; 
    }

  }

  getSurveyToEdit(surveyId): void {
    this.surveyService.getSurvey(surveyId).subscribe(result => {
      //set the form fields
      this.survey = result;
      this.surveyForm.get('surveyName').setValue(this.survey.itemName);

      // get the project data (for contact information)
      this.getProject(this.survey.projectId);

    });
  }

  getProject(projectId): void {

    this.surveyService.getProject(projectId).subscribe(result => {
      this.selectedProject = result

      var recipientChoice = (this.survey.recipient.email === this.selectedProject.contact.email) ? "1" : "2";
      this.surveyForm.get('recipientChoice').setValue(recipientChoice);

      this.surveyForm.get('recipientFirstName').setValue(this.survey.recipient.firstName);
      this.surveyForm.get('recipientLastName').setValue(this.survey.recipient.lastName);
      this.surveyForm.get('recipientEmail').setValue(this.survey.recipient.email);

      // enable appropriate fields
      this.surveyForm.get('recipientChoice').enable();
      this.surveyForm.get('requestFeedback').enable();    
      this.surveyForm.get('recipientFirstName').enable();
      this.surveyForm.get('recipientLastName').enable();
      this.surveyForm.get('recipientEmail').enable();

      this.isProjectSelected = true;

      this.questions = this.survey.questions;
      this.dataSource.data = this.questions;
      var haveMedAcuityQuestion = this.questions.find(q => q.questionType === "Medacuity_Rating");
      if (haveMedAcuityQuestion) {
        this.surveyForm.get('requestFeedback').setValue(true);
      }

      this.getEmployees(this.selectedProject.id);

    });
  }

  onSubmit(): void {
    console.log("Submitting: ", this.surveyForm.value);
    if (this.questions.length == 0) {
      this.showNoQuestionError = true;
    } else {
      //create a survey object
      if (!this.survey) {
        // create new survey
        this.survey = new Survey();
      }
      this.survey.itemName = this.surveyForm.value.surveyName;
      var project = this.selectedProject;

      if (!this.inEditMode) {
        this.survey.projectId = this.surveyForm.value.project;
        this.survey.projectName = project.itemName;
        this.survey.clientId = this.surveyForm.value.client;
        var client = this.clients.find(c => c.id === this.survey.clientId);
        this.survey.clientName = client.itemName;
        this.survey.createdBy = this.selectedProject.programManager;
      }

      if (this.surveyForm.value.recipientChoice == "1") {
        this.survey.recipient = this.selectedProject.contact;
      } else {
        this.survey.recipient = new Person();
        this.survey.recipient.firstName = this.surveyForm.value.recipientFirstName;
        this.survey.recipient.lastName = this.surveyForm.value.recipientLastName;
        this.survey.recipient.email = this.surveyForm.value.recipientEmail;
      }
      this.survey.status = "Draft";
      // save questions
      this.survey.questions = this.questions;
      console.log("New survey:", this.survey);
      var savedSurvey = this.surveyService.saveSurvey(this.survey);
      this.router.navigate(['/surveys/preview/'+ savedSurvey.id])
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
    this.createEmployeeQuestion(employee, true);
  }

  createEmployeeQuestion(employee, showSnackBar){
    // check if there is a question for this employee
    if (!this.haveQuestionForEmployee(employee.id)) {
      var questionId = this.questionCounter++
      var question = new Question();
      question.id = ""+questionId;
      question.question = "Please provide a performance rating for " + employee.itemName + ".";
      question.employeeId = employee.id;
      question.questionType = "Employee_Rating";
      this.questions.push(question);
      this.dataSource.data = this.questions;
    } else if (showSnackBar) {
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

