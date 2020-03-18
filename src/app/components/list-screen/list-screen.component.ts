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
//   employees = [
//      { "Name":"Ajay",
//   "Salary":6,
//   "DOB":"13-05-1996",
//   Skills:[{"value":"Skill 2","id":2,"checked":true},{"value":"skill 7","id":7,"checked":true}],
//   Id:28,
//   imageUrl:"https://employee2728.s3.us-east-2.amazonaws.com/1584459336281tommy-lisbin-xr-y6Ruw7K8-unsplash.jpg"
// },
//   { "Name":"prabhu",
//   "Salary":6,
//   "DOB":"13-05-1996",
//   Skills:[{value:"Skill 0",id:0,checked:true},{value:"Skill 3",id:3,checked:true},{value:"Skill 5",id:5,checked:true},],
//   Id:40,
//   imageUrl:"https://employee2728.s3.us-east-2.amazonaws.com/1584440272163204-304-Stainless-Steel-Sheet-Price-Per.png"},
//   { "Name":"Ravi",
//   "Salary":6,
//   "DOB":"13-05-1996",
//   Skills:[{"value":"Skill 2","id":2},{"value":"skill 7","id":7}],
//   Id:27,
//   imageUrl:"https://employee2728.s3.us-east-2.amazonaws.com/1584459336281tommy-lisbin-xr-y6Ruw7K8-unsplash.jpg"},
//   { "Name":"Shashi",
//   "Salary":6,
//   "DOB":"13-05-1996",
//   Skills:[{"value":"Skill 2","Id":2},{"value":"skill 7","id":7}],
//   Id:101,
//   imageUrl:"https://employee2728.s3.us-east-2.amazonaws.com/1584440066233sherry-christian-8Myh76_3M2U-unsplash.jpg"},
//   { "Name":"Pramod",
//   "Salary":6,
//   "DOB":"13-05-1996",
//   Skills:[{"value":"Skill 2","Id":2},{"value":"skill 7","id":7}],
//   Id:43,
//   imageUrl:"https://employee2728.s3.us-east-2.amazonaws.com/1584363650726Mamatha_CV-3.pdf"},
//   { "Name":"Ajay",
//   "Salary":6,
//   "DOB":"13-05-1996",
//   Skills:[{"value":"Skill 2","Id":2},{"value":"skill 7","id":7}],
//   Id:28,
//   imageUrl:"https://employee2728.s3.us-east-2.amazonaws.com/1584363650726Mamatha_CV-3.pdf"},
//   { "Name":"Ajay",
//   "Salary":6,
//   "DOB":"13-05-1996",
//   Skills:[{"value":"Skill 2","Id":2},{"value":"skill 7","id":7}],
//   Id:28,
//   imageUrl:"https://employee2728.s3.us-east-2.amazonaws.com/1584363650726Mamatha_CV-3.pdf"}
// ]

pageIndex: number;
pageSize: number;
size;
SearchFormControl = new FormControl('', [
  Validators.minLength(2)
]);
  constructor(private router:Router,private employeeService:EmployeeService) {
    this.pageIndex = 0;
    this.pageSize = 1;
   }

  ngOnInit() {
   this.employeeService.getAllEmployees().subscribe((res)=>{ 
     console.log(res)
    });
    this.size = this.employees.length;
  }

  edit(item){
    this.employeeService.editClick(item);
    this.router.navigate(["/edit-employee"])
  }

  delete(Id){
      this.employeeService.deleteEmployee({"Id":Id}).subscribe((res)=>{console.log(res)});
  }

  add(){
    this.router.navigate(["/add-employee"])
  }

  onSubmit(){
    this.employeeService.searchEmployees({"searchValue":this.SearchFormControl.value}).subscribe(
      (data)=>{console.log(data)}
    )
    this.SearchFormControl.reset();
  }
  
}
