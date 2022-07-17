import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  postUser(data:any){
    return this.httpClient.post<any>("http://localhost:1000/posts",data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getUser(){
    return this.httpClient.get<any>("http://localhost:1000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }
  updateUser(data:any,id:number){
    return this.httpClient.put<any>("http://localhost:1000/posts/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteUser(id:number){
    return this.httpClient.delete<any>("http://localhost:1000/posts/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }

}
