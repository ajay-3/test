import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {EmployeeService} from '../../services/employee.service'

@Component({
  selector: 'app-list-screen',
  templateUrl: './list-screen.component.html',
  styleUrls: ['./list-screen.component.css']
})
export class ListScreenComponent implements OnInit {  
employees = [];
pageIndex: number;
pageSize: number;
size;
noSearch=false;
error=false;
errorValue;

  constructor(private router:Router,private employeeService:EmployeeService) {
    this.pageIndex = 0;
    this.pageSize = 1;
   }

  ngOnInit() {
   this.employeeService.getAllEmployees().subscribe((res)=>{ 
      this.employees = Object.values(res);
      this.size = this.employees.length;
    });
    
  }

  SearchFormControl = new FormControl('', [
    Validators.minLength(2)
  ]);

  onSubmit(){
    this.employeeService.searchEmployees({"searchValue":this.SearchFormControl.value}).subscribe((data)=>{
      // this.employeeService.searchUsers(data); 
       this.employees.splice(0,this.employees.length-1);
       this.employees = Object.values(data);
       if(this.employees.length == 0){
           this.noSearch = true;
       }else{
        this.size = this.employees.length
       }
      }
    )
    //this.router.navigate(["/search"]);
    this.SearchFormControl.reset();
  }
 

  edit(item){
    this.employeeService.editClick(item);
    this.router.navigate(["/edit-employee"])
  }

  delete(item){
      this.employeeService.deleteEmployee({"Id":item.Id}).subscribe((res)=>{
        if(res["ok"]==1){
          var indx=this.employees.indexOf(item);
          this.employees.splice(indx,1);
          this.size = this.employees.length;
        }else{
          this.error=true;
          this.errorValue = "Something went wrong"
        }}
);
  }

  back(){
    this.employeeService.getAllEmployees().subscribe((res)=>{ 
      this.employees = Object.values(res);
      this.size = this.employees.length;
    });
  }
}
