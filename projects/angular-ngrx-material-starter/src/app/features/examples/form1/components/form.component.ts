import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { filter, debounceTime, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  ROUTE_ANIMATIONS_ELEMENTS,
  NotificationService
} from '../../../../core/core.module';

import { actionFormReset, actionFormUpdate } from '../../form/form.actions';
import { selectFormState } from '../../form/form.selectors';
import { Form } from '../form.model';

@Component({
  selector: 'anms-form1',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Form1Component implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  classlist: string[] = ['10thclass', 'inter1styear', 'secondyear'];
  vehiclerootslist: string[] = ['via mehdipatnam', 'via mallepally'];
  //genderlist1:string[]=['male','female','others'];

  form = this.fb.group({
    autosave: false,
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    classes: ['', [Validators.required]],
    vehicleroot: ['', [Validators.required]],
    gender: ['', [Validators.required]],

    description: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000)
      ]
    ],
    requestGift: [''],
    birthday: ['', [Validators.required]],
    rating: [0, Validators.required]
  });

  formValueChanges$: Observable<Form>;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private store: Store,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.formValueChanges$ = this.form.valueChanges.pipe(
      debounceTime(500),
      filter((form: Form) => form.autosave)
    );
    this.store
      .pipe(select(selectFormState), take(1))
      .subscribe(form => this.form.patchValue(form.form));
  }

  update(form: Form) {
    this.store.dispatch(actionFormUpdate({ form }));
  }

  save() {
    //this.store.dispatch(actionFormUpdate({ form: this.form.value }));
    this.http.post('http://localhost:3000/student', this.form.value);
    alert(this.form.value);

    //this.httpClient.post("http://127.0.0.1:3000/customers",{this.form.value});
    alert(this.form.value);
  }

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
