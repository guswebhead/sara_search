import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { NetlifyFormsService } from './../../services/netlify-forms.service';
import dataForm from './dataForm.json';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  dataCheckbox = dataForm.coffee
  dataCheckboxOccupation = dataForm.occupation

  formCliente = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    relationship: new FormControl('', Validators.required),
    child:new FormControl( null , Validators.required),
    manyChilds: new FormControl(),
    sex: new FormControl(),
    address: new FormControl(),
    occupation: new FormArray<any>([]),
    coffe:  new FormArray<any>([]),
    themeDomain: new FormControl(),
    prevents : new FormControl(),
    dream: new FormControl(),
    fear: new FormControl(),
    commitment: new FormControl(),
    involvementChurch: new FormControl(),
    attracted: new FormControl(),
    LikeToinvolved:  new FormControl(),
    satisfaction:new FormControl(),
    missInChurch: new FormControl(),
    references: new FormControl(),
    search: new FormControl(),
  })

  checkBoxCoffee: Array<string> = []
  errorMsg = '';

 teste: any


  constructor(
    public formBuilder: FormBuilder,
    private netlifyForms: NetlifyFormsService){
      this.dataCheckbox = dataForm.coffee
      this.dataCheckboxOccupation= dataForm.occupation
  }

  ngOnInit(){

  }

  checkboxCoffee(e:any){
    const checkArray: FormArray = this.formCliente.get('coffe') as FormArray;

    if (e.source.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.source.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  checkboxOccupation(e:any){
    const checkArray: FormArray = this.formCliente.get('occupation') as FormArray;
    if (e.source.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.source.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  submit(){
    this.netlifyForms.submitFeedback(this.formCliente.value).subscribe(
      () => {
        //  this.router.navigateByUrl('/success');
        this.formCliente.reset();
       Swal.fire({
         icon: 'success',
         title: 'Sucesso!',
         text: 'O arquivo foi disponibilizado em uma nova aba!',
         footer: ''
       })
      //  window.open('https://app-sara-connect.s3.sa-east-1.amazonaws.com/OLHE+PARA+O+ALTO.pdf', '_blank');
     },
     err => {
        this.errorMsg = err;
        Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Ocorreu um erro no servidor!',
         footer: ''
       })
      }
    );
    console.log(this.formCliente.value)
  }
  clearForm(){
    location.reload()
    // this.formCliente.reset();
    // const occupation: FormArray = this.formCliente.get('occupation') as FormArray;
    // const coffe: FormArray = this.formCliente.get('coffe') as FormArray;

    // occupation.controls.forEach((item: any,i) => {
    //     occupation.removeAt(i);

    // });
    // coffe.controls.forEach((item: any,i) => {
    //     occupation.removeAt(i);

    // });

    // this.formCliente.controls.occupation.clear()
  }

}
