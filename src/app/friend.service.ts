import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FriendRequest} from "./interfaces/friendRequest";
import {Globals} from "./common/globals";
import {Profile} from "./interfaces/profile";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  constructor(private http: HttpClient) { }

  getFriends()
  {
    return this.http.get<Profile[]>(Globals.baseUrl+"/friends")
  }

  getSentFriendRequests()
  {
    return this.http.get<FriendRequest[]>(Globals.baseUrl+"/friendrequests/sent")
  }

  getReceivedFriendRequests()
  {
    return this.http.get<FriendRequest[]>(Globals.baseUrl+"/friendrequests/received")
  }

  sendFriendRequest(id: number)
  {
    return this.http.post<FriendRequest>(Globals.baseUrl+"/friendrequest/send/"+id, [])
  }

  acceptFriendRequest(id: number)
  {
    return this.http.post<FriendRequest>(Globals.baseUrl+"/friendrequest/accept/"+id, [])
  }

  declineFriendRequest(id: number)
  {
    return this.http.post<FriendRequest>(Globals.baseUrl+"/friendrequest/deny/"+id, [])
  }
}
