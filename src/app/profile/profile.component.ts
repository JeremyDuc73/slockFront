import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {ProfileService} from "../profile.service";
import {Profile} from "../interfaces/profile";
import {NgForOf} from "@angular/common";
import {FriendService} from "../friend.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  protected router = inject(Router)
  profileService = inject(ProfileService)
  profiles: Profile[] = []
  friendService = inject(FriendService)
  constructor() {
    if (!localStorage.getItem("Token")) {
      this.router.navigateByUrl("/login")
    }
    this.getAllProfiles()
  }

  getAllProfiles()
  {
    this.profileService.getProfiles().subscribe({
      next: (allProfiles: any) => {
        this.profiles = []
        for (let i=0; i<allProfiles.length; i++)
        {
          let profile:Profile={
            id: allProfiles[i].id,
            email: allProfiles[i].ofUser.email
          }
          this.profiles.push(profile)
        }
      }
    })
  }

  sendRequest(id : number)
  {
    this.friendService.sendFriendRequest(id).subscribe({
      next: (response) => {
        console.log(response)
      }
    })
  }

}
