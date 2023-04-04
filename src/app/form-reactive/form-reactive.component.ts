import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-reactive',
  templateUrl: './form-reactive.component.html',
  styleUrls: ['./form-reactive.component.css']
})
export class FormReactiveComponent implements OnInit {
  
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required,, Validators.minLength(4)]],
      apellido: ['',[Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email,this.comEmailValidator]],
      telefono: ['', [Validators.required,Validators.minLength(8)]]
    });
  }

  comEmailValidator(control: AbstractControl) { // Definimos la función de validación personalizada
    if (control.value && control.value.indexOf('.com') === -1) { // Si el email no termina en '.com'
      return { comEmail: true }; // Retornamos un objeto que indica que hay un error en la validación
    }
    return null; // Si la validación es exitosa, retornamos null
  }

  get nombreRequerido() {
    const control = this.form.get('nombre');
    return control ? (control.touched && (control.hasError('required')|| control.hasError('minlenght')))  : false;
  }

  get apellidoRequerido() {
    const control = this.form.get('apellido');
    return control ? (control.touched && (control.hasError('required')|| control.hasError('minlength')))  : false;
  }

  get emailRequerido() {
    const control = this.form.get('email');
    return control ? (control.touched && control.hasError('required')|| control.hasError('minlenght')) : false;
  }
  
  get telefonoRequerido() {
    const control = this.form.get('telefono');
    return control ? control.touched && control.hasError('required') : false;
  }
  

}
