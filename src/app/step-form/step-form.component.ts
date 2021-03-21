import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.scss'],
})
export class StepFormComponent implements OnInit {

  constructor() { }
  
  selected: string = '-1';

  show: boolean = false;
  secondFormEditable: boolean = true;
  thirdFormEditable: boolean = true;
  showCompany: boolean = false;
  showAccomodation: boolean = false;
  disableButton: boolean = true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  options: Array<Object> = [
    {value: '-1', viewValue: 'Please Choose'},
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'}
  ];

  attendeeElements: Array<number> = [];
  
  ngOnInit() {
    this.initizializeForm();
    this.subscriptions();
  }

  onOptionsSelected(value) {
    this.attendeeElements = [];
    if(value) {
      for (let index = 0; index < value; index++) {
        this.attendeeElements.push(index + 1); 
          this.show = true;
      }
    }
  }

  countValues(el) {
    return Object.keys(el).filter(k => el[k] != "").length;
  }

  resetForms() {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
    this.initizializeForm();
    this.subscriptions();
    this.show = false;
  }

  private initizializeForm() {
    this.firstFormGroup = new FormGroup({
      attendeeNumber: new FormControl('-1'),
      attendeeInput_1: new FormControl(''),
      attendeeInput_2: new FormControl(''),
      attendeeInput_3: new FormControl(''),
      attendeeInput_4: new FormControl(''),
      attendeeInput_5: new FormControl('')
    });
    this.secondFormGroup = new FormGroup({
      companyRadio: new FormControl(''),
      companyInput: new FormControl(''),
      accomodationRadio: new FormControl(''),
      accomodationTextArea: new FormControl('')
    });
    this.thirdFormGroup = new FormGroup({
      rockCheck: new FormControl('')
    })
  }

  private subscriptions() {
    this.firstFormGroup.valueChanges.subscribe(val => {
      this.secondFormEditable = true;
      if(parseInt(val.attendeeNumber) === (this.countValues(val) -1)) {
        this.secondFormEditable = false;
      }
    })

    this.secondFormGroup.valueChanges.subscribe(val => {
      console.log(val)
      this.showCompany = false;
      this.showAccomodation = false;
      this.thirdFormEditable = true;
      if((val.companyRadio && val.accomodationRadio !== "") && ( val.companyInput !== "")) {
        this.thirdFormEditable = false;
      }

      if (val.companyRadio) {
        this.showCompany = true;
      }

      if (val.accomodationRadio) {
        this.showAccomodation = true;
      }
    })

    this.thirdFormGroup.valueChanges.subscribe(val => {
      this.disableButton = true;
      if(val.rockCheck) {
        this.disableButton = false;
      }
    })    
  }

}
