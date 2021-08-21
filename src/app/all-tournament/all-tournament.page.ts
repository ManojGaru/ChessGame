import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-all-tournament',
  templateUrl: './all-tournament.page.html',
  styleUrls: ['./all-tournament.page.scss'],
})
export class AllTournamentPage implements OnInit {
  tournaments:any=[]
  tournamentss:any=[1];
  token:any=''

  constructor(private router:Router,private api:ApiService,private util:UtilService) {
    this.token = localStorage.getItem('token');
   }

  ngOnInit() {
    this.util.presentLoading()
   this.api.home(this.token).subscribe((res:any)=>{
    console.log(res,'Dashboard data');
    this.util.dismissLoading()
    this.tournaments = res;
  },(err:HttpErrorResponse)=>{
    console.log(err);
    
  })
  }

  ionViewWillEnter(){

  }
  logout(){
    localStorage.clear();
    this.router.navigate(['home'])
  }

  login(){
  //  this.router.navigate(['create-tournament'])
  }

  board(item) {
    this.router.navigate(['chess-board', item.id])
  }

}
