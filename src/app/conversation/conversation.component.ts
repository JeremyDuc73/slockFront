import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConversationService} from "../conversation.service";
import {Message} from "../interfaces/message";
import {FormsModule, NgForm} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class ConversationComponent {
  protected router = inject(Router)
  conversationService = inject(ConversationService)
  messages: Message[] = []
  convId
  constructor(private route:ActivatedRoute) {
    if (!localStorage.getItem("Token")){
      this.router.navigateByUrl("/login")
    }
    this.convId = this.route.snapshot.params["id"]
    this.getMessages()
  }

  onSubmit(form: NgForm)
  {
    this.conversationService.sendMessage(form.value, this.convId)
    window.location.reload()
  }

  getMessages()
  {
    this.conversationService.getMessagesFromConversation(this.convId).subscribe({
      next: (allMessages: any) => {
        this.messages = []
        for (let i = 0; i < allMessages.length; i++)
        {
          let message: Message = {
            id: allMessages[i].id,
            content:allMessages[i].content,
            createdAt: allMessages[i].createdAt.toLocaleString(),
            author: allMessages[i].author.ofUser.email
          }
          this.messages.push(message)
        }
      }
    })
  }

  protected readonly localStorage = localStorage;
}
