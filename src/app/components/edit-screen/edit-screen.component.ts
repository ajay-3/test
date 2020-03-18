import { Component, OnInit, ɵConsole } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
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
  templateUrl: './edit-screen.component.html',
  styleUrls: ['./edit-screen.component.css']
})
export class EditScreenComponent implements OnInit {
  maxDate: Date;
  error=false;
  message = false;
  employee;
  updated={};
  skills=[];
  Url;
  imageObj:File;
  uploadMessage;
  imageUrl:string;
  datePicker:string;
  NameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  salaryFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();
   checkBox=[{value:"Skill 0",id:0,checked:false},
   {value:"Skill 1",id:1,checked:false},
   {value:"Skill 2",id:2,checked:false},
   {value:"Skill 3",id:3,checked:false},{value:"skill 4",id:4,checked:false},{value:"skill 5",id:5,checked:false}
    ,{value:"skill 6",id:6,checked:false},{value:"skill 7",id:7,checked:false},{value:"skill 8",id:8,checked:false},{value:"skill 9",id:9,checked:false}]
  date = new FormControl();

  constructor(private employeeService: EmployeeService, private router: Router,private imageUploadService: ImageUploadService) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 18, 11, 31); 
  }
  
  ngOnInit() {
      this.employee = this.employeeService.geteditClick();
      for(let i=0;i<this.employee.Skills.length;i++){
        this.checkBox[this.employee.Skills[i].id].checked = true;
      }
      this.NameFormControl.setValue( this.employee["Name"] );
      this.salaryFormControl.setValue(this.employee["Salary"]);
    }

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
      console.log(res);
      if(res == null){
        this.uploadMessage = "Select an image";
      }
      else{
   this.uploadMessage = "Post has been successfully uploaded"
   this.Url  =  res['imageUrl']; 
    }});
   }
 
  updateEmployee(){
    for(let i=0;i<10;i++){
      if(this.checkBox[i].checked==true){
        this.skills.push(this.checkBox[i])
      }
    }
    const momentDate = new Date(this.date.value); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY/MM/DD");
    this.updated["Name"] =this.NameFormControl.value || this.employee["Name"];
    this.updated["Salary"] =this.salaryFormControl.value;
    this.updated["Skills"] = this.skills;
    this.updated["DOB"] = formattedDate || this.employee["DOB"];
    this.updated["imageUrl"] = this.Url || this.employee["imageUrl"]
    this.employeeService.addEmployee(this.updated).subscribe((res)=>{console.log(res)});
    this.router.navigate([""]);
  }

  toggle(i){
      this.checkBox[i].checked = !this.checkBox[i].checked;
  }

  // Method to cancel the add operation
  cancel(){
    this.router.navigate([""]);
  }
}
