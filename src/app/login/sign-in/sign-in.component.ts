import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email!: string;
  password!: string;
  otp!: string;

  constructor(private router: Router) {}

  onSubmit(): void {
    if (!this.email || !this.password || !this.otp) {
      alert("Please fill in all fields.");
      return;
    }

    // TODO: Perform login authentication or further processing
    // You can send the form data to a server using HTTP requests or perform any other required actions.
    
    // Navigate to the dashboard page
    this.router.navigate(['/dashboard']);
  }
}


