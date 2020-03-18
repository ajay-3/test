import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';import { HttpClientModule } from '@angular/common/http';
//import { HttpModule } from  '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule,RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListScreenComponent } from './components/list-screen/list-screen.component';
import { EditScreenComponent } from './components/edit-screen/edit-screen.component';
import { AddScreenComponent } from './components/add-screen/add-screen.component';
import {MaterialModule} from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    ListScreenComponent,
    EditScreenComponent,
    AddScreenComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
