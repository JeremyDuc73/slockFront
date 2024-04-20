import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {FriendService} from "../friend.service";
import {Profile} from "../interfaces/profile";
import {NgForOf} from "@angular/common";
import {ConversationService} from "../conversation.service";

@Component({
  selector: 'app-friend',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.css'
})
export class FriendComponent {
  protected router = inject(Router)
  friendService = inject(FriendService)
  friends: Profile[] = []
  conversationService = inject(ConversationService)

  constructor() {
    if (!localStorage.getItem("Token")) {
      this.router.navigateByUrl("/login")
    }
    this.getFriends()
  }

  getFriends()
  {
    this.friendService.getFriends().subscribe({
      next: (allFriends: any) => {
        this.friends = []
        for (let i=0; i<allFriends.length; i++)
        {
          let friend: Profile={
            id: allFriends[i].id,
            email: allFriends[i].ofUser.email
          }
          this.friends.push(friend)
        }
      }
    })
  }

  createConversation(id: number)
  {
    this.conversationService.createConversation(id).subscribe({
      next: (response) => {
        console.log(response)
        window.location.reload()
      }
    })
  }


}
