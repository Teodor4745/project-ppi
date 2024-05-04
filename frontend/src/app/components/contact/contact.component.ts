import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ContactComponent implements OnInit {
  isLoggedIn = false;
  contactForm: FormGroup;
  feedbackMessage: string = '';
  messageType: string = ''; 
  user: any = null;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.contactForm = new FormGroup({
      name: new FormControl({value: '', disabled: true}),
      email: new FormControl({value: '', disabled: true}),
      question: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getUser(); 
  }

  getUser(): void {
    this.authService.getUser()?.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.user = user;
        this.contactForm.get('name')?.setValue(user.firstname + ' ' + user.lastname);
        this.contactForm.get('email')?.setValue(user.email);
        this.contactForm.get('name')?.disable();
        this.contactForm.get('email')?.disable();
      } else {
        this.contactForm.get('name')?.enable();
        this.contactForm.get('email')?.enable();
      }
    });
  }

  onSubmit(event: any): void {
    event.stopPropagation();
    event.preventDefault();

    this.feedbackMessage = '';
    this.messageType = '';

    if (this.contactForm.valid) {
      const submissionData = {
        name: this.user ? (this.user.firstname + ' ' + this.user.lastname) : this.contactForm.get('name')?.value,
        email: this.user ? this.user.email : this.contactForm.get('email')?.value,
        question: this.contactForm.get('question')?.value,
      };

      this.messageService.sendMessage(submissionData).subscribe({
        next: (response) => {
          this.feedbackMessage = 'Thank you for your inquiry. We will get back to you soon.';
          this.messageType = 'success';
          this.contactForm.reset();
          if (this.user) {
            this.contactForm.get('name')?.setValue((this.user.firstname + ' ' + this.user.lastname));
            this.contactForm.get('email')?.setValue(this.user.email);
            this.contactForm.get('name')?.disable();
            this.contactForm.get('email')?.disable();
          }
        },
        error: (error) => {
          this.feedbackMessage = 'Failed to send your inquiry. Please try again.';
          this.messageType = 'error';
        }
      });
    }
  }
}
