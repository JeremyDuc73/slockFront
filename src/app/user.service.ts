import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Globals} from "./common/globals";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient)
  private router = inject(Router)

  register(user: any)
  {
    this.http.post<any>("https://localhost:8000/register", user).subscribe({
      next: (response) => {
        console.log(response.data)
        this.router.navigateByUrl("/login")
      }
    })
  }

  login(user:any)
  {
    this.http.post(Globals.baseUrl+"/login_check", user).subscribe({
      next: (response: any) => {
        localStorage.setItem("Token", response.token)
        console.log(localStorage.getItem("Token"))
        this.http.get(Globals.baseUrl+"/myprofile").subscribe({
          next : (response: any) => {
            localStorage.setItem("currentEmail", response.ofUser.email)
          }
        })
        this.router.navigateByUrl("/home")
      }
    })
  }

  logout()
  {
    localStorage.clear()
    this.router.navigate(["/login"])
    location.reload()
  }

}
