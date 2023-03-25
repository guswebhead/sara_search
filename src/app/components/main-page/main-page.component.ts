import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { NetlifyFormsService } from './../../services/netlify-forms.service';
import dataForm from './dataForm.json';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss', './responsividade.scss']
})
export class MainPageComponent implements OnInit {

  dataCheckbox = dataForm.coffee
  dataCheckboxOccupation = dataForm.occupation

  formCliente = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    relationship: new FormControl('', Validators.required),
    child:new FormControl( '', Validators.required),
    manyChilds: new FormControl(),
    sex: new FormControl(null, Validators.required),
    address: new FormControl('', Validators.required),
    occupation: new FormArray<any>([], Validators.required),
    coffe:  new FormArray<any>([], Validators.required),
    themeDomain: new FormControl(null,  Validators.required),
    prevents : new FormControl('',  Validators.required),
    dream: new FormControl('',  Validators.required),
    fear: new FormControl('',  Validators.required),
    commitment: new FormControl(null,  Validators.required),
    involvementChurch: new FormControl('',  Validators.required),
    attracted: new FormControl('',  Validators.required),
    LikeToinvolved:  new FormControl('',  Validators.required),
    satisfaction:new FormControl(null,  Validators.required),
    missInChurch: new FormControl('',  Validators.required),
    references: new FormControl('',  Validators.required),
    search: new FormControl(null,  Validators.required),
  })

  checkBoxCoffee: Array<string> = []
  errorMsg = '';

  otherCoffeeValue = {
    checked: false,
    field: ''
  }
  otherOccupationValue = {
    checked: false,
    field: ''
  }

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
  otherCoffee(e:any){
    this.otherCoffeeValue.checked = e.checked
    if(!e.checked){
      this.otherCoffeeValue.field = ''
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

  otherOccupation(e:any){
    this.otherOccupationValue.checked = e.checked
    if(!e.checked){
      this.otherOccupationValue.field = ''
    }
  }
  submit(){
    if(this.otherOccupationValue.checked){
      const checkArray: FormArray = this.formCliente.get('occupation') as FormArray;
      checkArray.push(new FormControl(this.otherOccupationValue.field));
    }
    if(this.otherCoffeeValue.checked){
      const checkArray: FormArray = this.formCliente.get('coffe') as FormArray;
      checkArray.push(new FormControl(this.otherCoffeeValue.field));
    }

    this.netlifyForms.submitFeedback(this.formCliente.value).subscribe(
      () => {
        //  this.router.navigateByUrl('/success');
        this.formCliente.reset();
       Swal.fire({
         icon: 'success',
         title: 'Sucesso!',
         text: 'O arquivo foi disponibilizado em uma nova aba!',
         footer: ''
       }).then(
        ()=>{
          window.open('https://drive.google.com/uc?export=download&id=1LyqTkfO2UXBPE1LxpW1hQFmmr63Z0HEB', '_blank')
          location.reload()
        }
       )
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
  }
  clearForm(){
    Swal.fire({
      title: 'Deseja realmente limpar o formulário?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        location.reload()
      } else {
      }
    })
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
