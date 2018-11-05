import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatNativeDateModule, MatIconModule, 
  MatSidenavModule, MatListModule, MatToolbarModule, MatTableModule,
  MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule,
  MatGridListModule, MatCardModule, MatSelectModule, MatRadioModule, MatCheckboxModule} from '@angular/material';

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
  	MatCheckboxModule
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
	MatCheckboxModule
  ],
})
export class CustomMaterialModule { }