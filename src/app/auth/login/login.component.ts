import {Component, inject} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {UserService} from "../../user.service";
import {Globals} from "../../common/globals";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected router = inject(Router)
  constructor() {
    if (localStorage.getItem("Token")){
      this.router.navigateByUrl("/home")
    }
  }


  private service = inject(UserService);

  onSubmit(form: NgForm) {
    this.service.login(form.value)
  }

}
