import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule, HttpLoaderFactory } from '../../shared/shared.module';
import { Form1Component } from '../examples/form1/components/form.component';

import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import {
  FeatureListComponent,
  DialogOverviewExampleDialog,
  ApiService
} from './feature-list/feature-list.component';
import { FeatureEditReadComponent } from '../feature-list/feature-editread/feature-read.component';
import { FeatureEditComponent } from '../feature-list/feature-edit/feature-list.component';
import { FeatureListRoutingModule } from './feature-list-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkTableModule } from '@angular/cdk/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    FeatureListComponent,
    Form1Component,
    FeatureEditComponent,
    DialogOverviewExampleDialog,
    FeatureEditReadComponent
  ],
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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,

    //FlexLayoutModule,

    /*  TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),*/

    FeatureListRoutingModule
  ],
  exports: [
    MatTableModule,
    CdkTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class FeatureListModule {}
