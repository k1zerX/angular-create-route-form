import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

const PerformerTypes: string[] = [
  "Механик",
  "Какой-то тип исполнителя",
  "Другой тип исполнителя",
  "И еще один...",
]

const Week: string[] = [
	"Пн",
	"Вт",
	"Ср",
	"Чт",
	"Пт",
	"Сб",
	"Вс",
];

const LSKey: string = 'formData';

@Component({
  selector: 'app-create-route-form',
  templateUrl: './create-route-form.component.html',
  styleUrls: ['./create-route-form.component.styl'],
})
export class CreateRouteFormComponent implements OnInit {
  form: FormGroup;
  performerTypes: string[] = PerformerTypes;
  week: string[] = Week;

  constructor(public fb: FormBuilder) {
    const defaultData = {
      name: '',
      author: '',
      performerID: -1,
      weekdayID: -1,
      longRound: false,
    };

    const loadedData = JSON.parse(localStorage.getItem(LSKey) || '{}');
    this.form = this.fb.group({ ...defaultData, ...loadedData });
    this.toggleValidation();
  }

  ngOnInit(): void {
  }

  save($event: Event): void {
    $event.preventDefault();
    this.toggleValidation();
    localStorage.setItem(LSKey, JSON.stringify(this.form.value));
  }

  toggleValidation(): void {
    const validators = {
      name: [ Validators.required, Validators.minLength(4) ],
      author: [ Validators.required, Validators.minLength(3) ],
      performerID: [ Validators.min(0) ],
      weekdayID: [ Validators.min(0) ],
    };

    for (const [ctrlKey, ctrlValidators] of Object.entries(validators)) {
      const ctrl = this.form.get(ctrlKey);
      if (ctrl) {
        if (this.form.value.longRound)
          ctrl.setValidators(ctrlValidators);
        else
          ctrl.setValidators([]);
        ctrl.updateValueAndValidity();
      }
    }
  }

  requiredClass(): string {
    return this.form.value.longRound ? 'required' : '';
  }
}
