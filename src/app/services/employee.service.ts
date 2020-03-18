import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  base_url = "http://localhost:3000/api/"
  editDetails;
  searchValue;
   
  constructor(private http:HttpClient,private router:Router) { }
  getAllEmployees(){
    return this.http.get(this.base_url+"getEmployees",{
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    })
  }

  addEmployee(value){
    return this.http.post(this.base_url+"addEmployee",value);
  }

  updateEmployee(value){
    return this.http.put(this.base_url+"updateEmployee",value);
  }

  deleteEmployee(value){
     return this.http.delete(this.base_url+"deleteEmployee/"+value.Id)
  }

  searchEmployees(data){
    return this.http.post(this.base_url+"searchemployees",data)
  }
  

  editClick(data){
    this.editDetails = data;
  }
  
  geteditClick(){
    return this.editDetails;
  }

}
