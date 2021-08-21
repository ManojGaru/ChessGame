import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { TournamentPopPage } from '../tournament-pop/tournament-pop.page';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-add-rounds',
  templateUrl: './add-rounds.page.html',
  styleUrls: ['./add-rounds.page.scss'],
})
export class AddRoundsPage implements OnInit {
  player_per_round: any;
  player1: any;
  player2: any;
  title: any;
  token: string;
  rounds: any = [];
  tempArray: any = [];
  playerArray: any = [];
  players: any = [];
  round_opponents: any = [];
  tempData: any = {};
  id: string;
  isApproved: any = true;
  round_id: any;
  config = {
    //  displayFn:(item: any) => { return item.hello.world; }, //to support flexible text displaying for each item
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    search: true,//true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select',// text to be displayed when no item is selected defaults to Select,
    customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more',// text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    searchOnKey: 'id',// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false,// clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }
  isList: boolean = false;
  editableItem: any;
  constructor(private router: Router,
    private api: ApiService,
    private util: UtilService,
    private activatedRoute: ActivatedRoute,
    public popoverController: PopoverController, private alertController: AlertController) {
    this.token = localStorage.getItem('token');
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.id = id;
  }

  ngOnInit() {
    this.getTournamentById()
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: TournamentPopPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {
        "id": this.id,
        "approved": this.isApproved
      }
    });
    return await popover.present();
  }

  getTournamentById() {
    this.api.getTournamentDetails(this.token, this.id).subscribe((res: any) => {
      //if(res.status === 200){
      console.log(res, 'tournamnet details');
      this.isApproved = res.is_approved;
      this.players = res.players_set;
      this.playerArray = res.players_set
      res.heats_set.forEach(element => {
        this.round_opponents.push({ round_id: element.id, player_per_round: element.rounds, player1: element.player1, player2: element.player2 })
      });
      // }

    }, (err: HttpErrorResponse) => {
      console.log(err);

    })
  }
  selectPlayer(event) {
  //  console.log(event.target.value);
    //  let arr = this.tempArray.filter(function( obj ) {
    //     return obj.p != event.target.value;
    //   });
    //   if(arr.length>0){
    //     this.util.presentAlert("This player already added")
    //   }
    console.log(this.players);

  }

  addPlayer() {
    let index = this.round_opponents.indexOf(this.editableItem)
    if(index>-1){
      this.round_opponents.splice(index, 1);
    }
    if (this.round_id) {
      this.tempData["round_id"] = this.round_id
      this.tempData["player_per_round"] = this.player_per_round
      this.tempData["player1"] = this.player1.id
      this.tempData["player2"] = this.player2.id
      this.round_opponents.push(this.tempData)
    } else {
      if ((this.player1 == '' || this.player1 == undefined) && (this.player2 == '' || this.player2 == undefined) && (this.player_per_round == '' || this.player_per_round == undefined)) {
        this.util.presentAlert('Please fill all the field')
      } else {
        this.tempData["player_per_round"] = this.player_per_round
        this.tempData["player1"] = this.player1.id
        this.tempData["player2"] = this.player2.id
        this.round_opponents.push(this.tempData)
      }
    }

    this.round_id = null;
    this.editableItem = null;
    this.tempData = {};
    this.player_per_round = null;
    this.player1 = '';
    this.player2 = '';
    this.tempArray = []


  }
  editRound(item) {
    console.log(item);
    this.editableItem = item
    if (item.round_id) {
      this.round_id = item.round_id
    }
    this.player_per_round = item.player_per_round;
    this.player1 = this.players.filter(e => e.id = item.player1)[0];
    this.player2 = this.players.filter(e => e.id = item.player2)[0];
  }


  async removePlayer(item) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure ,want to delete this Round ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          //role:'cancel',
          handler: () => {
            if (item.round_id) {
              this.util.presentLoading()
              this.api.deleteRound(this.token, item.round_id).subscribe((res) => {
                console.log(res);
                this.util.presentAlert('Round deleted Successfully');
                const index = this.round_opponents.indexOf(item);
                this.round_opponents.splice(index, 1);
              }, (err: HttpErrorResponse) => {
                console.log(err);

              })
            } else {
              const index = this.round_opponents.indexOf(item);
              this.round_opponents.splice(index, 1);
            }

          }
        }
      ]
    });

    await alert.present();



    console.log(item);



    console.log(this.rounds);

  }

  // getNumberofPlayer(event) {
  //   console.log(event.target.value, this.player_per_round);
  //   if (this.player_per_round !== null) {
  //     for (let i = 0; i < this.player_per_round; i++) {
  //       this.tempArray.push({ p: "player" + (i + 1) })
  //     }
  //   } else {
  //     this.tempArray = [];
  //   }
  //   console.log(this.tempArray);


  // }
  goToRound() {

    let data = {
      rounds_opponent: {
        tournament_id: this.id,
        round_opponent: this.round_opponents
      }

    }
    console.log(data);

    this.api.addRound(data, this.token).subscribe((res: any) => {
      console.log(res);
      if (res.success === 1) {
        // this.players = []
        this.util.presentToast(res.message)
        if (this.isApproved) {
          this.router.navigate(['add-pgn', this.id])
        } else {
          // this.util.presentAlert("you are not Approved by Admin")
          this.router.navigate(['tournament-list'])
        }

      } else {
        this.util.presentAlert("something went wrong")
      }

    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.util.presentAlert(err.message)
    })


    // this.router.navigate(['add-pgn'])
  }
  toggleList() {
    this.isList = !this.isList
  }


}
