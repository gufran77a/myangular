import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { filter, debounceTime, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ROUTE_ANIMATIONS_ELEMENTS,
  NotificationService
} from '../../../../core/core.module';

import { actionFormReset, actionFormUpdate } from '../../form/form.actions';
//import { selectFormState } from '../../form/form.selectors';
import { Form } from '../form.model';

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'anms-form1',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Form1Component implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  classlist: string[] = [
    '10th standard(10th)',
    '11th standard(11th)',
    '12th standard(12th)',
    '9th standard(9th)'
  ];
  vehiclerootslist: string[] = [
    'Circul HouseTo Railway Station(RJ19B01)',
    'Saint patrics Little Star School(RJ19B02)'
  ];
  //genderlist1:string[]=['male','female','others'];
  dormitorynamelist: string[] = [
    'KV hostel(10rooms)',
    'Saintpaul Hostel(40rooms)'
  ];
  parentsList: string[] = [
    'Clarentsparents(parent01@gmail.com)',
    'karriparent(parent02@gmail.com)'
  ];
  //mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  form = this.fb.group({
    //autosave: false,
    id: ['', []],
    name: ['', [Validators.required]],
    phonenumber: [
      '',
      [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0|(\\+92-?))?[0-9]{10}$')
      ]
    ],
    address: ['', [Validators.required]],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(15)
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern('((?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')
      ]
    ],
    classes: ['', [Validators.required]],
    vehicleroot: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    parentname: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    dormintary: ['', [Validators.required]]

    //  rating: [0, Validators.required],

    /*description: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000)
      ]
    ],*/
  });

  formValueChanges$: Observable<Form>;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private store: Store,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    /*  this.formValueChanges$ = this.form.valueChanges.pipe(
      debounceTime(500),
      filter((form: Form) => form.autosave)
    );*/
    /*  this.store
      .pipe(select(selectFormState), take(1))
      .subscribe(form => this.form.patchValue(form.form));*/
  }

  update(form: Form) {
    //    this.store.dispatch(actionFormUpdate({ form }));
  }
  /*save() {
    //this.store.dispatch(actionFormUpdate({ form: this.form.value }));
    this.http.post(serviceposturl + this.form.value,JSON.stringify(this.form.value));

    alert(this.form.value);
//"http://localhost:3000" + '/products/', JSON.stringify(product),
    //this.httpClient.post("http://127.0.0.1:3000/customers",{this.form.value});
    alert(this.form.value);
  }*/

  //serviceposturl="http://localhost:3000/student";

  serviceposturl = 'http://localhost:3000/student';

  save() {
    this.http.post(this.serviceposturl, this.form.value).subscribe(data => {
      this.router.navigateByUrl('/students');
      //  this.postId = data.id;
    });
  }

  //    this.router.navigateByUrl('/crud/home/'))

  submit() {
    if (this.form.valid) {
      this.save();
      this.notificationService.info(
        (this.form.value.requestGift
          ? this.translate.instant('anms.examples.form.text4')
          : this.translate.instant('anms.examples.form.text5')) +
          ' : ' +
          this.translate.instant('anms.examples.form.text6')
      );
    }
  }
  reset() {
    this.form.reset();
    this.form.clearValidators();
    this.form.clearAsyncValidators();
    this.store.dispatch(actionFormReset());
  }
}
