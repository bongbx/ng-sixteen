import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TableHeader } from 'src/app/shared';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  headers: TableHeader<any>[] = [];

  records: any[] = [];

  readonly formGroup = new FormGroup({
    name: new FormControl(''),
  });

  maxLengthValidator = (value: any) => value.length < 10 || 'Item maxlength 10';

  isValidEmail(email: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  emailValidator = (value: string) =>
    this.isValidEmail(value) ||
    'Vui lòng nhập emailVui lòng nhập emailVui lòng nhập emailVui lòng nhập emailVui lòng nhập emailVui lòng nhập emailVui lòng nhập emailVui lòng nhập emailVui lòng nhập email';

  nameRules = [
    (value: string) => !!value || 'Name is required',
    (value: string) => value.length < 15 || 'Name maxlength is 15',
    (value: string) => value.length > 6 || 'Name minlength is 6',
  ];

  constructor() {}

  ngOnInit() {
    this.headers = Array.from({ length: 500 }).map((x, i) => ({
      field: `${i}`,
      label: `${i}`,
      width: '100px',
    }));

    this.records = Array.from({ length: 100 }).map((x, i) => {
      const object = Object.assign(
        {},
        Array.from({ length: 500 }).map((x, i) => i)
      );
      return object;
    });
  }

  refresh() {
    this.records = Array.from({ length: Math.random() * 50 }).map((x, i) => {
      const object = Object.assign(
        {},
        Array.from({ length: 1000 }).map((x, i) => i)
      );
      return object;
    });
  }
}
