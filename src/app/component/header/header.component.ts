import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/services/userModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  fromvalue!: FormGroup;
  userModelObj: User = new User();
  allUserData: any;
  showAdd!:boolean;
  showbtn!:boolean;

  constructor(private fromBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllUserData();
    this.fromvalue = this.fromBuilder.group({
      fname: [''],
      lname: [''],
      email: [''],
      mobile: [''],
    });
    this.getAllUserData()
  }
  clickAddUsers(){
    this.fromvalue.reset();
    this.showAdd=true;
    this.showbtn=false;

  }
  addUserList() {
    this.userModelObj.fname = this.fromvalue.value.fname;
    this.userModelObj.lname = this.fromvalue.value.lname;
    this.userModelObj.email = this.fromvalue.value.email;
    this.userModelObj.mobile = this.fromvalue.value.mobile;
    this.api.postUser(this.userModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('User Records Added Sucesfully');
        this.fromvalue.reset();
        this.getAllUserData();
      },
      (err) => {
        alert('Error...User not added');
      }
    );
  }

  getAllUserData() {
    this.api.getUser().subscribe((res) => {
      this.allUserData = res;
    });
  }
  deleteUserdata(data: any) {
    this.api.deleteUser(data.id).subscribe((res) => {
      alert('User data deleted sucessfully');
      this.getAllUserData();
    });
  }
  allEditData(data: any) {
    // console.log(data)
    this.showAdd=false;
    this.showbtn=true;
    this.userModelObj.id = data.id;
    this.fromvalue.controls['fname'].setValue(data.fname);
    this.fromvalue.controls['lname'].setValue(data.lname);
    this.fromvalue.controls['email'].setValue(data.email);
    this.fromvalue.controls['mobile'].setValue(data.mobile);
  }

  updateUserdata() {
    this.userModelObj.fname = this.fromvalue.value.fname;
    this.userModelObj.lname = this.fromvalue.value.lname;
    this.userModelObj.email = this.fromvalue.value.email;
    this.userModelObj.mobile = this.fromvalue.value.mobile;
    this.api
      .updateUser(this.userModelObj, this.userModelObj.id)
      .subscribe((res) => {
        alert('User data updated sucessfully');
        this.fromvalue.reset()
        this.getAllUserData();
      });
  }
}
