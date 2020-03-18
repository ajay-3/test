import { Component } from '@angular/core';
import {EmployeeService} from "./services/employee.service";
import { FormBuilder } from '@angular/forms';
import { Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchUserName:String;
  searchForm = this.fb.group({
    Name:['']
  });

  constructor(private employee:EmployeeService,private fb: FormBuilder,
    private router:Router){}

    onSubmit(){
      this.searchUserName = this.searchForm.value;
      this.searchForm.reset();
    }
}
