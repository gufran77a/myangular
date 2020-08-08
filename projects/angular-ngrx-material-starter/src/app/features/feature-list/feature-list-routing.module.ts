import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Form1Component } from '../examples/form1/components/form.component';
import { FeatureEditComponent } from '../feature-list/feature-edit/feature-list.component';
import {
  FeatureListComponent,
  ApiService
} from './feature-list/feature-list.component';
const routes: Routes = [
  {
    path: '',
    component: FeatureListComponent,
    data: { title: 'anms.menu.features' }
  },
  {
    path: 'studentm',
    component: Form1Component
  },
  {
    path: 'studentsEdit/:id',
    component: FeatureEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureListRoutingModule {}
