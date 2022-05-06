import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers : new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentAcno:any
  currentUname:any

  // database:any={
  //   1000:{acno:1000,uname:"neer",password:1000,balance:5000,transaction:[]},
  //   1001:{acno:1001,uname:"vyom",password:1001,balance:4000,transaction:[]},
  //   1002:{acno:1002,uname:"laisha",password:1002,balance:3000,transaction:[]}


  // }

  constructor(private http:HttpClient) { 
    // this.getData() 
  }

  //to store data in local storage

  // storeData(){
  //   localStorage.setItem("databaseNew",JSON.stringify(this.database))

  //   if(this.currentAcno){
  //     localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
  //   }

  //   if(this.currentUname){
  //     localStorage.setItem("currentUname",JSON.stringify(this.currentUname))
  //   }

  // }

  //to get item from local storage
  // getData(){
  //   if(localStorage.getItem("databaseNew")){
  //     this.database = JSON.parse(localStorage.getItem("databaseNew") || '')
  //   }

  //   if(localStorage.getItem("currentAcno")){
  //     this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
  //   }

  //   if(localStorage.getItem("currentUname")){
  //     this.currentUname = JSON.parse(localStorage.getItem("currentUname") || '')
  //   }



  // }
//register definition
  register(acno:any,password:any,uname:any){
    //json data//rqst body
    const data ={
      acno,
      password,
      uname
    }
    //register API-- api call
    return this.http.post('http://localhost:3000/register',data)
    

    // let database = this.database

    // if(acno in database){
    //   return false
    // }
    // else{
    //   database[acno]={
    //     acno,
    //     uname,
    //     password:pswd,
    //     balance:0,
    //     transaction:[]
        
    //   }
    //   console.log(database)
    //   this.storeData()
    //   return true
    // }


  }
//login definition 
  login(acno:any,password:any){
    //rqst body
    const data ={
      acno,
      password
    }
    //login api call
    return this.http.post('http://localhost:3000/login',data)

    // let  database = this.database
    // if(acno in database){
    //   if(pswd == database[acno]["password"]){
    //     this.currentAcno= acno

    //    this.currentUname = this.database[acno]["uname"]
    //    this.storeData()

    //     return true
    //   }
    //   else{
    //     alert("incorrect password")
    //     return false
    //   }

    // }
    // else{
    //   alert("Account No doesn't exist")
    //   return false
    // }

  }
  //deposit 

  deposit(acno:any,password:any,amt:any){
    //rqst body
    const data ={
      acno,password,amt
    }

    //deposit api call
    return this.http.post('http://localhost:3000/deposit',data,this.getOptions())


    // var amount = parseInt(amt)

    // let database = this.database

    // if(acno in database){
      
    //   if(password == database[acno]["password"]){
    //     database[acno]["balance"] += amount
    //     database[acno]["transaction"].push({
    //       amount:amount,
    //       type:"CREDIT"
    //     })
    //     this.storeData()

    //     return database[acno]["balance"] 

    //   }
    //   else{
    //     alert("password is incorrect")
    //     return false

    //   }

    // }
    // else{
    //   alert("User not exist")
    //   return false
    // }
  }
  getOptions(){

        //token fetch
        const token = JSON.parse(localStorage.getItem("token") || '')
        //to create rqst header
        if(token){
          let headers = new HttpHeaders()
          if(token){
            headers = headers.append('x-access-token',token)
            options.headers = headers
          }
          
        }
        return options  
    
  }

    //withdraw 

  withdraw(acno:any,password:any,amt:any){
        //rqst body
        const data ={
          acno,
          password,
          amt
        }
    
        //withdraw api 
        return this.http.post('http://localhost:3000/withdraw',data,this.getOptions())
    

    // var amount = parseInt(amt)

    // let database = this.database

    // if(acno in database){
      
    //   if(password == database[acno]["password"]){

    //     if(database[acno]["balance"] > amount){
    //       database[acno]["balance"] = database[acno]["balance"] - amount
    //       database[acno]["transaction"].push({
    //         amount:amount,
    //         type:"DEBIT"
    //       })

    //       this.storeData()

  
    //       return database[acno]["balance"] 
    //     }
    //     else{
    //       alert("insufficent balance")
    //       return false
    //     }



    //   }
    //   else{
    //     alert("password is incorrect")
    //     return false

    //   }

    // }
    // else{
    //   alert("User not exist")
    //   return false
    // }
    

  }

  //transaction
  getTransaction(acno:any){
    //rqst body
    const data ={
      acno
    }

    //transaction API
    return this.http.post('http://localhost:3000/transaction',data,this.getOptions())


    // return this.database[acno]["transaction"]

  }

  delete(acno:any){
    //delete api
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno, this.getOptions())


  }

}





