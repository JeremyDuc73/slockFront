import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "./interfaces/profile";
import {Globals} from "./common/globals";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient)

  getProfiles()
  {
    return this.http.get<Profile[]>(Globals.baseUrl+"/profiles")
  }
  constructor() { }
}
