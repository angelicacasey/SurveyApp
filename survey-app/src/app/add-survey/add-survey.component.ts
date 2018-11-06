import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Question } from "../models/question.model"

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.scss']
})
export class AddSurveyComponent implements OnInit {

  profileForm = new FormGroup(
  	{
  		id: new FormControl(''),
  		surveyName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  		client: new FormControl('', Validators.required),
  		project: new FormControl({value: '', disabled: true}, Validators.required),
      recipientChoice: new FormControl({value: '', disabled: true}),
  		recipientFirstName: new FormControl({value: '', disabled: true}, Validators.required),
  		recipientLastName: new FormControl({value: '', disabled: true}, Validators.required),
  		recipientEmail: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]
  	});

  displayedColumns: string[] = ["question", "options", "action"];
  dataSource = new MatTableDataSource();
  questions = [];
  clients = [];
  projects = [];
  employees = [];
  isClientSelected = false;
  isProjectSelected = false;
  selectedProject;
  selectedEmployee = null;
  questionCounter:number = 1;
  showNoQuestionError: boolean = false;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataSource.data = this.questions;
    this.clients = this.getListOfClients();

    this.onChanges();
  }

  onChanges(): void {
    this.profileForm.get('client').valueChanges.subscribe(val => {
      console.log("client changed, val=", val);
      this.isClientSelected = true;
      this.profileForm.get('project').enable();
      this.projects = this.getProjects(val);
    });

    this.profileForm.get('project').valueChanges.subscribe(val => {
      console.log("project changed, val=", val);
      if (val) {
        var projectData = this.projects.find(proj => proj.id == val);
        console.log(projectData);
        this.selectedProject = projectData;
        this.profileForm.get('recipientChoice').enable();

        this.profileForm.get('recipientChoice').setValue("1");     

        this.employees = this.getEmployees(val);
        this.isProjectSelected = true;
      }
    });

    this.profileForm.get('recipientChoice').valueChanges.subscribe(val => {
      console.log("recipient choice changed, val=", val);
      if (val === '1') {
        this.profileForm.get('recipientFirstName').setValue(this.selectedProject.contactFirstName);  
        this.profileForm.get('recipientLastName').setValue(this.selectedProject.contactLastName);
        this.profileForm.get('recipientEmail').setValue(this.selectedProject.contactEmail); 
        this.profileForm.get('recipientFirstName').disable();
        this.profileForm.get('recipientLastName').disable();
        this.profileForm.get('recipientEmail').disable();
      } else {
        this.profileForm.get('recipientFirstName').setValue("");  
        this.profileForm.get('recipientLastName').setValue("");
        this.profileForm.get('recipientEmail').setValue(""); 
        this.profileForm.get('recipientFirstName').enable();
        this.profileForm.get('recipientLastName').enable();
        this.profileForm.get('recipientEmail').enable();
      }
    });
  }

  onSubmit(): void {
    console.log("Submitting: ", this.profileForm.value);
    if (this.questions.length == 0) {
      this.showNoQuestionError = true;
    }
  }

  getEmailError(): string {
    var recipientEmail = this.profileForm.get('recipientEmail');
    return recipientEmail.hasError('required') ? 'This field is required' :
        recipientEmail.hasError('email') ? 'Please enter a valid email' :
            '';
  }

  getSurveyNameError(): string {
    var recipientEmail = this.profileForm.get('surveyName');
    return recipientEmail.hasError('required') ? 'This field is required' :
        recipientEmail.hasError('minlength') ? 'Please enter at least 3 characters' :
            '';
  }

  addMedAcuityQuestion(val): void {
    console.log("checkbox val: ", val);
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
    this.questions.splice(index, 1);
    this.dataSource.data = this.questions;
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

  getListOfClients() {

    var clients = [
      {
        "id": "client1",
        "value": "Super Client"
      },
      {
        "id": "client2",
        "value": "Uber Client"
      }
    ];
    return clients;
  }

  getProjects(val) {
    var projects = [
      {
        "id": "project1",
        "value": "ABC",
        "contactFirstName": "Elmer",
        "contactLastName": "Fudd",
        "contactEmail": "efudd@meddevlmtd.com"
      },
      {
        "id": "project2",
        "value": "DEF",
        "contactFirstName": "Sherlock",
        "contactLastName": "Holmes",
        "contactEmail": "sholmes@meddevlmtd.com"
      }
    ];
    return projects
  }

  getEmployees(val) {
    var employees = [
      {
        "id": "emp1",
        "value": "Harry Potter",
      },
      {
        "id": "emp2",
        "value": "Hermoine Granger",
      }
    ];
    return employees;
  }

  openDialog(): void {
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

  option: string;

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

