import { Component } from '@angular/core';
import {EmployeeService} from "./services/employee.service";
import { Router} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private employeeService:EmployeeService,private router:Router){}
    add(){
      this.router.navigate(["/add-employee"])
    }
}
