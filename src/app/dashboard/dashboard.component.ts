import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // acno=""
  // pswd=""
  // amount=""

  // acno1=""
  // pswd1=""
  // amount1=""

  user:any
  lDate:any
  acno:any

    //dashboard group model creation
    depositForm = this.fb.group({
      //form array create
      acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
      pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
      amount:['',[Validators.required,Validators.pattern('[0-9.]*')]]
    })

    withdrawForm = this.fb.group({
      //form array create
      acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
      pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
      amount:['',[Validators.required,Validators.pattern('[0-9.]*')]]
    })

  

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) {
    if(localStorage.getItem('currentUname')){
      this.user = JSON.parse(localStorage.getItem('currentUname') ||'')
    }

    this.lDate = new Date()
   }

  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("please login")
      this.router.navigateByUrl("")
    }
  }

  deposit(){
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount

    if(this.depositForm.valid){
          //calling deposit function of dataservice -asynchronous
    this.ds.deposit(acno,pswd,amount)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
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

  //withdraw
  withdraw(){
    var acno = this.withdrawForm.value.acno
    var pswd = this.withdrawForm.value.pswd
    var amount = this.withdrawForm.value.amount

    if(this.withdrawForm.valid){

    //calling withdraw function of dataservice -asynchronus

    this.ds.withdraw(acno,pswd,amount)


    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
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

logout(){
  localStorage.removeItem("currentAcno")
  localStorage.removeItem("currentUname")
  this.router.navigateByUrl("")
}

deleteAccount(){
  this.acno = JSON.parse(localStorage.getItem("currentAcno") || '')
}

cancel(){
  this.acno=''
}
delete(event:any){
  // alert("Delete account "+event+" from parent")
  //asynchronous
  this.ds.delete(event)
  .subscribe((result:any)=>{
    if(result){
      alert(result.message)
      localStorage.removeItem("currentAcno")
      localStorage.removeItem("currentUname")
      localStorage.removeItem("token")

      this.router.navigateByUrl("")
    

    }

  },
  (result)=>{
    alert(result.error.message)
  }
  )
  
}

}
