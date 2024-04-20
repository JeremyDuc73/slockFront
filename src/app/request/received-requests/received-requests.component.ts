import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {FriendService} from "../../friend.service";
import {FriendRequest} from "../../interfaces/friendRequest";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-received-requests',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './received-requests.component.html',
  styleUrl: './received-requests.component.css'
})
export class ReceivedRequestsComponent {
  protected router = inject(Router)
  friendService = inject(FriendService)
  requests: FriendRequest[] = []
  constructor() {
    if (!localStorage.getItem("Token")) {
      this.router.navigateByUrl("/login")
    }
    this.getReceivedRequests()
  }

  getReceivedRequests()
  {
    this.friendService.getReceivedFriendRequests().subscribe({
      next: (allRequests: any) => {
        this.requests = []
        for (let i=0; i<allRequests.length; i++)
        {
          let request: FriendRequest = {
            id: allRequests[i].id,
            email: allRequests[i].fromUser.ofUser.email,
            status: allRequests[i].status
          }
          this.requests.push(request)
        }
      }
    })
  }

  acceptRequest(id: number)
  {
    this.friendService.acceptFriendRequest(id).subscribe({
      next: (response) => {
        console.log(response)
        window.location.reload()
      }
    })
  }

  declineRequest(id: number)
  {
    this.friendService.declineFriendRequest(id).subscribe({
      next: (response) => {
        console.log(response)
        window.location.reload()
      }
    })
  }
}
