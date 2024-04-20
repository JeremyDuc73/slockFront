import {Component, inject} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private service = inject(UserService);

  onSubmit(form: NgForm) {
    this.service.register(form.value)
  }
}
