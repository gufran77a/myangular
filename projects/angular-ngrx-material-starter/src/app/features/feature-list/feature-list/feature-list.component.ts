import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
//import { Feature, features } from '../feature-list.data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'http://localhost:3000/student';

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}

@Component({
  selector: 'anms-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
  //  ,  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureListComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  displayedColumns: string[] = ['box', 'id', 'name', 'phonenumber', 'actions'];
  dataSource: any[] = [{}];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAll().subscribe(data => {
      this.dataSource = data;
    });
  }
}

/*import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { Feature, features } from '../feature-list.data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";
import { Validators, FormBuilder } from '@angular/forms';





@Component({
  selector: 'anms-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureListComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  features: Feature[] = features;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private translate: TranslateService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getAll1();
  }



  openLink(link: string) {
    window.open(link, '_blank');
  }
  serviceposturl = 'http://localhost:3000/student';
 studentlist:any=[];
getAll1()
{
    this.http.get(this.serviceposturl).subscribe( data => {
         this.studentlist = data;
       });
}








}*/
