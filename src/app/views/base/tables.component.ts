import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'tables.component.html'
})
export class TablesComponent implements OnInit{


  userLists: any;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.getUsers();
  }

getUsers(){
  this.userService.userList().subscribe((res) => {
    this.userLists = res;
    console.log('user list ', this.userLists);

  },
  error => {
    console.log('errot ', error);
  })
}

}
