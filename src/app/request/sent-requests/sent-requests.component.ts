import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {FriendService} from "../../friend.service";
import {FriendRequest} from "../../interfaces/friendRequest";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-sent-requests',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './sent-requests.component.html',
  styleUrl: './sent-requests.component.css'
})
export class SentRequestsComponent {
  protected router = inject(Router)
  friendService = inject(FriendService)
  requests: FriendRequest[] = []

  constructor() {
    if (!localStorage.getItem("Token")) {
      this.router.navigateByUrl("/login")
    }
    this.getSentRequests()
  }

  getSentRequests()
  {
    this.friendService.getSentFriendRequests().subscribe({
      next: (allRequests: any) => {
        this.requests = []
        for (let i=0; i<allRequests.length; i++)
        {
          let request: FriendRequest = {
            id: allRequests[i].id,
            email: allRequests[i].toUser.ofUser.email,
            status: allRequests[i].status
          }
          this.requests.push(request)
        }
      }
    })
  }
}
