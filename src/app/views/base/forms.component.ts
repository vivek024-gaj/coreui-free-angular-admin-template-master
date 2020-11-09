import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent implements OnInit{

  constructor(
    private userService: UserService,
    public formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.loadUserList();
    this.createUserForm();
  }


  userForm: FormGroup;
  mode: any;
  user: any;
  userDataList: any;

  isSubmitted: boolean = false;
  isSuccess: boolean = false;
  _statusMsg: any;


  createUserForm() {
     this.userForm = this.formBuilder.group({
       id: [],
       name: ['', Validators.required],
       email: ['', Validators.required],
       password: ['', Validators.required],
       mobileNo: ['', Validators.required],
       address: ['', Validators.required]
     });
  }


  loadUserList() {
      this.userService.userList().subscribe((res) => {
          this.userDataList = res;
          console.log('user list', this.userDataList);

      }, error => {
        console.log('error', error);

      });
  }

  submitUserForm() {
    for (let controller in this.userForm.controls) {
      this.userForm.get(controller).markAsTouched();
    }
    if (this.userForm.invalid) {
      return;
    }
    if (this.mode === 'edit') {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  addUser() {
    this.userService.addUser(this.userForm.value).subscribe((res: any) => {
      this.isSubmitted = true;
      console.log('datalog', res.message);

      if (res) {
        this.isSuccess = res.status;
        if (res.status) {
          this._statusMsg = res.message;
          console.log(this._statusMsg);

          this.userForm.reset();
          setTimeout(() => {
            this.isSubmitted = false;
            this.isSuccess = false;
          }, 4000);

        } else {
          this._statusMsg = res.error;
        }
      }
    }, err => {
      console.log(err);
    })
  }

  editUser(data) {
    this.mode = "edit"
    this.userForm.patchValue(data);
}

deleteFieldValue(i) {
  this.userService.deleteUser(i).subscribe((res) => {
    if (res) {
      this.isSuccess = res.status;
      if (this.isSuccess) {
        this._statusMsg = res.message;
        setTimeout(() => {
          this.isSubmitted = false;
          this.isSuccess = false;
        }, 4000);
      } else {
        this._statusMsg = res.error;
      }
    }
  });
}


  updateUser() {
    this.userService.updateUser(this.userForm.value.id, this.userForm.value).subscribe((res: any) => {
      this.isSubmitted = true;
      if (res) {
        this.isSuccess = res.status;
        if (this.isSuccess) {
          this._statusMsg = res.message;
          this.user = {};
          this.userForm.reset();
          this.mode = "add";
          this.createUserForm();

          setTimeout(() => {
            this.isSubmitted = false;
            this.isSuccess = false;
          }, 4000);
        } else {
          this._statusMsg = res.error;
        }
      }
    }, err => {
      console.log(err);
    });
  }

}
