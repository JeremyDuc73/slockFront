import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {FriendComponent} from "./friend/friend.component";
import {ReceivedRequestsComponent} from "./request/received-requests/received-requests.component";
import {SentRequestsComponent} from "./request/sent-requests/sent-requests.component";
import {ConversationComponent} from "./conversation/conversation.component";

export const routes: Routes = [
  {
    path:'', redirectTo:"/login", pathMatch: "full"
  },
  {
    path:'home', component: HomeComponent
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'register', component: RegisterComponent
  },
  {
    path: 'profiles', component: ProfileComponent
  },
  {
    path: 'friends', component: FriendComponent
  },
  {
    path: 'received/requests', component: ReceivedRequestsComponent
  },
  {
    path: 'sent/requests', component: SentRequestsComponent
  },
  {
    path: 'conversation/:id', component: ConversationComponent
  }
];
