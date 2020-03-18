import { Component, OnInit } from '@angular/core';
import {FormControl,FormBuilder, FormArray,FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ImageUploadService } from '../../services/image-upload.service';

import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router/';
import * as moment from 'moment';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-edit-screen',
  templateUrl: './add-screen.component.html',
  styleUrls: ['./add-screen.component.css']
})
export class AddScreenComponent implements OnInit {
  minDate:Date;
  maxDate:Date;
    error = false;
    message = false;
    employee={};
    imageObj:File;
    uploadMessage;
    datePicker:string;
    NameFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);

    salaryFormControl = new FormControl('', [
      Validators.required
    ]);
   
    matcher = new MyErrorStateMatcher();
    skills=[];
    checkBox = [{value:"Skill 0",id:0,checked:false},
    {value:"Skill 1",id:1,checked:false},
    {value:"Skill 2",id:2,checked:false},
    {value:"Skill 3",id:3,checked:false},{value:"skill 4",id:4,checked:false},{value:"skill 5",id:5,checked:false}
    ,{value:"skill 6",id:6,checked:false},{value:"skill 7",id:7,checked:false},{value:"skill 8",id:8,checked:false},{value:"skill 9",id:9,checked:false}]
    startDate=new Date(1990, 0, 1);
    date = new FormControl();

    // Services injected in constructor
    constructor(private employeeService: EmployeeService, private router: Router,private imageUploadService: ImageUploadService,private fb: FormBuilder) { 
      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 60, 0, 1);
      this.maxDate = new Date(currentYear - 18, 11, 31); 
    }
    ngOnInit() {
       
      }
    // Method to save an employee

    onImagePicked(event: Event): void {
      const FILE = (event.target as HTMLInputElement).files[0];
      this.imageObj = FILE;
     }
   
     onImageUpload() {
     this.message = true;
     this.uploadMessage = "Please Wait while your post is uploading"
      const imageForm = new FormData();
      imageForm.append('image', this.imageObj);
      this.imageUploadService.imageUpload(imageForm).subscribe(res => {
        if(res == null){
          this.uploadMessage = "Did you select the image";
        }else if(res == "HTTP error"){
            this.uploadMessage = "Server Problem"
        }
        else{
     this.uploadMessage = "Post has been successfully uploaded"
     this.employee["imageUrl"] =  res['imageUrl']; 
      }});
     }
  
    // Method to cancel the add operation
    cancel(){
      this.router.navigate([""]);
    }
    
    execute(i){
    }

    saveEmployee(){
      for(let i=0;i<10;i++){
        if(this.checkBox[i].checked==true){
          this.skills.push(this.checkBox[i])
        }
      }
      const momentDate = new Date(this.date.value); // Replace event.value with your date value
      const formattedDate = moment(momentDate).format("YYYY/MM/DD");
      this.employee["Name"] =this.NameFormControl.value;
      this.employee["Salary"] =this.salaryFormControl.value;
      this.employee["Skills"] = this.skills;
      this.employee["DOB"] = formattedDate;
      console.log(this.employee)
      if(this.NameFormControl.value && this.salaryFormControl && this.employee["imageUrl"]!="undefined" && this.skills.length>0 &&formattedDate){
      this.employeeService.addEmployee(this.employee).subscribe((res)=>{console.log(res)});
      this.router.navigate([""]);
      }else{
      this.error =true;
      }

    }

   
   
 
  
    // Creates random id for employee
    
}