import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
//import { Feature, features } from '../feature-list.data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
//import { Form } from '.examples./form.model';
import { Observable } from 'rxjs';
import { Form } from '../../examples/form1/form.model';
import { MatDialogModule } from '@angular/material/dialog';

//feature-list/form.model
//projects/angular-ngrx-material-starter/src/app/features/examples/form1/form.model.ts
//projects/angular-ngrx-material-starter/src/app/features/feature-list/feature-edit/feature-list.component.ts
@Component({
  selector: 'anms-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
  //  ,  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureEditComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  student = null;
  message = '';
  parentsList: string[] = [
    'Clarentsparents(parent01@gmail.com)',
    'karriparent(parent02@gmail.com)'
  ];
  classlist: string[] = [
    '10th standard(10th)',
    '11th standard(11th)',
    '12th standard(12th)',
    '9th standard(9th)'
  ];
  dormitorynamelist: string[] = [
    'KV hostel(10rooms)',
    'Saintpaul Hostel(40rooms)'
  ];
  vehiclerootslist: string[] = [
    'Circul HouseTo Railway Station(RJ19B01)',
    'Saint patrics Little Star School(RJ19B02)'
  ];
  form = this.fb.group({
    id: ['', []],
    name: ['', []],
    phonenumber: [''],
    address: ['', []],
    birthdate: ['', []],
    gender: ['', []],
    parentname: ['', []],
    classes: ['', []],
    dormintary: ['', []],
    vehicleroot: ['', []],
    email: ['', []],
    password: ['', []]
  });

  //formValueChanges$: Observable<Form>;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTutorial(this.route.snapshot.paramMap.get('id'));
  }

  getTutorial(id) {
    this.get(id).subscribe(
      data => {
        this.student = data;
        this.form = this.fb.group({
          id: [this.student.id, [Validators.required]],
          name: [this.student.name, [Validators.required]],
          phonenumber: [
            this.student.phonenumber,
            [
              Validators.required,
              Validators.pattern('^((\\+91-?)|0|(\\+92-?))?[0-9]{10}$')
            ]
          ],
          address: [this.student.address, [Validators.required]],
          birthdate: [this.student.birthdate, [Validators.required]],
          email: [
            this.student.email,
            [
              Validators.required,
              Validators.email,
              Validators.minLength(6),
              Validators.maxLength(15)
            ]
          ],
          password: [
            this.student.password,
            [
              Validators.required,
              Validators.pattern('((?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')
            ]
          ],
          classes: [this.student.classes, [Validators.required]],
          vehicleroot: [this.student.vehicleroot, [Validators.required]],
          gender: [this.student.gender, [Validators.required]],
          parentname: [this.student.parentname, [Validators.required]],
          dormintary: [this.student.dormintary, [Validators.required]]
        });

        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  baseUrl: string = 'http://localhost:3000/student/';
  get(id) {
    return this.http.get(this.baseUrl + id);
  }

  updateTutorial(form) {
    //console.log(form);

    this.update(form.value['id'], form.value).subscribe(
      response => {
        console.log(response);
        this.message = 'The tutorial was updated successfully!';
      },
      error => {
        console.log(error);
      }
    );
    this.router.navigateByUrl('/students');
  }
  update(id, obj) {
    // baseUrls: string = 'http://localhost:3000/student/';
    return this.http.put('http://localhost:3000/student/' + id, obj);
  }
}
