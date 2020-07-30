import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule, HttpLoaderFactory } from '../../shared/shared.module';
import { Form1Component } from '../examples/form1/components/form.component';

import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import {
  FeatureListComponent,
  ApiService
} from './feature-list/feature-list.component';

import { FeatureList0Component } from './feature-list0/feature-list.component';
import { FeatureListRoutingModule } from './feature-list-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [FeatureListComponent, FeatureList0Component, Form1Component],
  providers: [
    ApiService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' }
    }
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatRadioModule,
    MatTableModule,
    MatCheckboxModule,
    /*  TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),*/

    FeatureListRoutingModule
  ]
})
export class FeatureListModule {}
