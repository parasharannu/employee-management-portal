import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { EmployeeDialogInfo1Component } from './components/employee-dialog-info1/employee-dialog-info1.component';
import { EmployeeDialogInfo2Component } from './components/employee-dialog-info2/employee-dialog-info2.component';
import { EmployeeDialogInfo3Component } from './components/employee-dialog-info3/employee-dialog-info3.component';
import { EmployeeDialogInfo4Component } from './components/employee-dialog-info4/employee-dialog-info4.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    DialogComponent,
    EmployeeDialogInfo1Component,
    EmployeeDialogInfo2Component,
    EmployeeDialogInfo3Component,
    EmployeeDialogInfo4Component,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
