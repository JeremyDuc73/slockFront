import {Component, inject} from '@angular/core';
import {UserService} from "../user.service";
import {RouterLink} from "@angular/router";
import {Globals} from "../common/globals";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userService = inject(UserService)
  protected readonly Globals = Globals;
  protected readonly localStorage = localStorage;
}
