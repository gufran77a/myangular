import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Form1Component } from '../examples/form1/components/form.component';
//projects/angular-ngrx-material-starter/src/app/features/examples/form1/components/form.component.ts
//projects/angular-ngrx-material-starter/src/app/features/feature-list/feature-list-routing.module.ts
import { FeatureListComponent } from './feature-list/feature-list.component';

import { FeatureList0Component } from './feature-list0/feature-list.component';
const routes: Routes = [
  {
    path: '',
    component: FeatureListComponent,
    data: { title: 'anms.menu.features' }
  },
  {
    path: '0',
    component: FeatureList0Component,
    data: { title: 'anms.menu.features' }
  },
  {
    path: 'studentm',
    component: Form1Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureListRoutingModule {}
