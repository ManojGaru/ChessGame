import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }

  login() {
  //  this.router.navigate(['chess-board',1])
    let token = localStorage.getItem('token');
    console.log(token,'tttttttttttttt')
    if (token) {
      this.router.navigate(['dashboard'])
    } else {
      this.router.navigate(['login'])
     // this.router.navigate(['chess-board-details',1,1])
    }

  }

}
