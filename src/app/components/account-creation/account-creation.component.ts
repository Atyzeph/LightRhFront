import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss'],
})
export class CreationCompteComponent {
  formData: any = {};
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastName: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      manager: [''],
      isAdmin: [false],
      isManager: [false],
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      console.info('Données à envoyer :', formData);
      // this.router.navigate(['/', 'absences_view']);
    }
  }
}
