import {Message} from "./message";

export interface Conversation {
  id: number
  profileEmail: string
  messages: Message[]
}
