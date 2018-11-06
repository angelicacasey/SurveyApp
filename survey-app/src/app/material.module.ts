import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatNativeDateModule, MatIconModule, 
  MatSidenavModule, MatListModule, MatToolbarModule, MatTableModule,
  MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule,
  MatGridListModule, MatCardModule, MatSelectModule, MatRadioModule, MatCheckboxModule,
  MatDialogModule, MatSnackBarModule} from '@angular/material';

@NgModule({
  imports: [
  	CommonModule, 
	MatButtonModule,
	MatToolbarModule, 
	MatNativeDateModule, 
	MatIconModule, 
	MatSidenavModule, 
  	MatListModule,
  	MatTableModule,
  	MatSortModule,
  	MatFormFieldModule,
  	MatInputModule,
  	MatPaginatorModule,
  	MatGridListModule,
  	MatCardModule,
  	MatSelectModule,
  	MatRadioModule,
  	MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [
  	CommonModule, 
	MatButtonModule, MatToolbarModule, 
	MatNativeDateModule, MatIconModule, 
	MatSidenavModule, 
	MatListModule,
	MatTableModule,
	MatSortModule,
	MatFormFieldModule,
	MatInputModule,
	MatPaginatorModule,
	MatGridListModule,
	MatCardModule,
	MatSelectModule,
	MatRadioModule,
	MatCheckboxModule,
  MatDialogModule,
  MatSnackBarModule
  ],
})
export class CustomMaterialModule { }