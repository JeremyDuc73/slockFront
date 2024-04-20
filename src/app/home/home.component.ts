import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {ConversationService} from "../conversation.service";
import {Conversation} from "../interfaces/conversation";
import {NgForOf} from "@angular/common";
import {Globals} from "../common/globals";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  protected router = inject(Router)
  conversationService = inject(ConversationService)
  convs: Conversation[] = []
  constructor() {
    if (!localStorage.getItem("Token")){
      this.router.navigateByUrl("/login")
    }
    this.getMyConversations()
  }

  getMyConversations()
  {
    this.conversationService.getMyConversations().subscribe({
      next: (allConvs: any) => {
        this.convs = []
        for (let i=0; i<allConvs.length; i++)
        {
          let emailToShow
          if (allConvs[i].member.ofUser.email == localStorage.getItem("currentEmail"))
          {
            emailToShow = allConvs[i].creator.ofUser.email
          } else
          {
            emailToShow = allConvs[i].member.ofUser.email
          }
          let conv: Conversation = {
            id: allConvs[i].id,
            profileEmail: emailToShow,
            messages: []
          }
          this.convs.push(conv)
        }
      }
    })
  }

  protected readonly Globals = Globals;
  protected readonly localStorage = localStorage;
}
