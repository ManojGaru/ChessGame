import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, PopoverController } from '@ionic/angular';
import { iif } from 'rxjs';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-tournament-pop',
  templateUrl: './tournament-pop.page.html',
  styleUrls: ['./tournament-pop.page.scss'],
})
export class TournamentPopPage implements OnInit {
  id: any;
  is_approved: any=false;

  constructor(public router: Router, public popoverController: PopoverController, public navParams: NavParams,private util:UtilService) {
    console.log(this.navParams, 'ooooooooooooooooooo');
    this.id = navParams.data.id;
    this.is_approved = navParams.data.approved;
  }

  ngOnInit() {
  }
  goToDesiredPage(type) {
    console.log(type,this.id,'.................');
    if(this.id === ''){
      this.util.presentAlert('You are creating a Tournamnet')
    }else{
      switch (type) {
        case 1:
          this.router.navigate(['create-tournament', this.id])
          break;
        case 2:
          this.router.navigate(['add-player', this.id])
          break;
        case 3:
          this.router.navigate(['add-rounds', this.id])
          break;
        case 4:
          this.router.navigate(['add-pgn', this.id])
          break;
        default:
          break;
      }
    }
    
    this.popoverController.dismiss()
  }

}
