import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class  LoginComponent implements OnInit {
  aim="Your perfect bank partner"
  accno="enter account number"
  acno=""
  pswd=""

  //login group model creation
  loginForm = this.fb.group({
    //form array create
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  })


    // database:any={
    //   1000:{acno:1000,uname:"neer",password:1000,balance:5000},
    //   1001:{acno:1001,uname:"vyom",password:1001,balance:4000},
    //   1002:{acno:1002,uname:"laisha",password:1002,balance:3000}


    // }

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }


  // acnoChange(event:any){
  //   this.acno=event.target.value
  //   console.log(this.acno)
    
  // }
  // pswdChange(event:any){
  //   this.pswd=event.target.value
  //   console.log(this.pswd)
  // }


  //login with template referencing value:-
  // login(a:any,p:any){
  //   console.log(a)
  //   var acno = a.value
  //   var pswd = p.value
  //   let  database = this.database
  //   if(acno in database){
  //     if(pswd == database[acno]["password"]){
  //       alert("Login Successfull")
  //     }
  //     else{
  //       alert("incorrect password")
  //     }

  //   }
  //   else{
  //     alert("Account No doesn't exist")
  //   }

  // }


  // login function defining
  login(){
    var acno = this.loginForm.value.acno
    var pswd = this.loginForm.value.pswd

    if(this.loginForm.valid){
      //asynchrnous call for login
   
    this.ds.login(acno,pswd)
    .subscribe((result:any)=>{
      if(result){
        localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
        localStorage.setItem('currentUname',JSON.stringify(result.currentUname))
        localStorage.setItem('token',JSON.stringify(result.token))
        alert(result.message)
        this.router.navigateByUrl('dashboard')

      }

    },
    (result)=>{
      alert(result.error.message)
    }
    )

    }
    else{
      alert("invalid form")
    }

  }

}
