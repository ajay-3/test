import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddScreenComponent} from './components/add-screen/add-screen.component';
import {EditScreenComponent} from './components/edit-screen/edit-screen.component';
import {ListScreenComponent} from './components/list-screen/list-screen.component'


const routes: Routes = [
  {path:"",component:ListScreenComponent},
  {path:"add-employee",component:AddScreenComponent},
  {path:"edit-employee",component:EditScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [ListScreenComponent,AddScreenComponent,EditScreenComponent];