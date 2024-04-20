import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Conversation} from "./interfaces/conversation";
import {Globals} from "./common/globals";
import {Message} from "./interfaces/message";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient) { }

  getMyConversations()
  {
    return this.http.get<Conversation[]>(Globals.baseUrl+"/privconvs")
  }

  createConversation(id: number)
  {
    return this.http.post<Conversation>(Globals.baseUrl+"/privconv/create/"+ id, [])
  }

  getMessagesFromConversation(id : number)
  {
    return this.http.get<Message[]>(Globals.baseUrl+"/privconv/get/"+ id)
  }

  sendMessage(message: any, id: number)
  {
    this.http.post<any>(Globals.baseUrl+"/privconv/"+id+"/message/send", message).subscribe({
      next: (response) => {
        console.log(response.data)
      }
    })
  }
}
