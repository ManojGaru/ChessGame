import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { TournamentPopPage } from '../tournament-pop/tournament-pop.page';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.page.html',
  styleUrls: ['./add-player.page.scss'],
})
export class AddPlayerPage implements OnInit {
  first_name: any;
  last_name: any;
  gender: any;
  title: any;
  rating: any;
  ranking: any;
  country_ranking: any;
  token: string;
  players: any = [];
  player_id: any;
  type: any;
  isList: any = false;
  config = {
    //  displayFn:(item: any) => { return item.hello.world; }, //to support flexible text displaying for each item
    displayKey: "value", //if objects array passed which key to be displayed defaults to description
    search: true,//true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select',// text to be displayed when no item is selected defaults to Select,
    customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more',// text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    searchOnKey: 'name',// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false,// clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }
  types: any = [
    'Women GM',
    'International Master',
    'WOMEN IM',
    'FIDE M',
    'Women FIDE M',
    'CM',
    'Women CM',
    'National Master',
    'W N M'
  ];
  genders = ["Female", "Male", "Other", "Not known"]
  id: string;
  isApproved: any = true;
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
    //  this.getTournamentById()
    this.api.getTournamentDetails(this.token, this.id).subscribe((res: any) => {
      console.log(res, 'tournamnet details');
      this.isApproved = res.is_approved;
      res.players_set.forEach(e => {
        this.players.push({
          player_id: e.id, first_name: e.name, last_name: e.last, title: e.title, gender: e.gender, reating: e.rating, ranking: e.ranking, country_ranking: e.COUNTRY_RATING

        })
      });
      this.players.sort(function (a, b) {
        return a[1] - b[1];
      });


    }, (err: HttpErrorResponse) => {
      console.log(err);

    })
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
      console.log(res, 'tournamnet details');
      this.isApproved = res.is_approved;
      res.players_set.forEach(e => {
        this.players.push({
          player_id: e.id, first_name: e.name, last_name: e.last, title: e.title, gender: e.gender, reating: e.rating, ranking: e.ranking, country_ranking: e.COUNTRY_RATING

        })
      });
      this.players.sort(function (a, b) {
        return a[1] - b[1];
      });


    }, (err: HttpErrorResponse) => {
      console.log(err);

    })
  }
  addPlayer() {
    const index = this.players.indexOf(this.editableItem);
    if (index > -1) {
      this.players.splice(index, 1);
    }

    if (this.player_id) {
      this.players.push({
        player_id: this.player_id, first_name: this.first_name, last_name: this.last_name, title: this.title, gender: this.gender, reating: this.rating, ranking: this.ranking, country_ranking: this.country_ranking
      })
      this.player_id = null
    } else {
      console.log(this.first_name, 'njcbjbcbecuebc');

      if ((this.first_name && this.first_name.length > 0) && (this.last_name && this.last_name.length > 0) && (this.title && this.title.length > 0) && (this.gender && this.gender.length > 0) && (this.rating && this.rating > 0) && (this.ranking && this.ranking > 0) && (this.country_ranking && this.country_ranking > 0)) {
        this.players.push({
          first_name: this.first_name, last_name: this.last_name, title: this.title, gender: this.gender, reating: this.rating, ranking: this.ranking, country_ranking: this.country_ranking
        })
      } else {

        this.util.presentAlert('please fill all the field')
      }

    }
    this.player_id = null
    this.editableItem = null;
    this.first_name = '';
    this.last_name = '';
    this.title = '';
    this.gender = '';
    this.rating = '';
    this.ranking = '';
    this.country_ranking = '';
    // console.log(this.players, 'ppppppppppppppp');


    this.players.sort((a, b) => (a.player_id > b.player_id) ? 1 : -1)

  }

  editPlayer(item) {
    console.log(item);
    this.editableItem = item
    if (item.player_id) {
      this.player_id = item.player_id
    }
    this.first_name = item.first_name;
    this.last_name = item.last_name;
    this.title = item.title;
    this.gender = item.gender;
    this.rating = item.reating;
    this.ranking = item.ranking;
    this.country_ranking = item.country_ranking;

    const index = this.players.indexOf(item);
    // this.players.splice(index, 1);
  }
  async removePlayer(item) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure ,want to delete this Player ?',
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
            if (item.player_id) {
              this.util.presentLoading()
              this.api.deletePlayer(this.token, item.player_id).subscribe((res) => {
                // console.log(res);
                this.util.presentAlert('Player deleted Successfully');
                const index = this.players.indexOf(item);
                this.players.splice(index, 1);
              }, (err: HttpErrorResponse) => {
                console.log(err);

              })
            } else {
              const index = this.players.indexOf(item);
              this.players.splice(index, 1);
            }

          }
        }
      ]
    });

    await alert.present();




  }
  goToRound() {
    this.util.presentLoading();
    if (this.players.length > 0) {
      let data = {
        players: {
          tournament_id: this.id,
          players: this.players
        }
      }
      console.log(data, 'get formatted data for add player');

      this.api.addPlayer(data, this.token).subscribe((res: any) => {
        console.log(res);
        if (res.success === 1) {
          this.players = []
          this.util.presentToast(res.message)
          this.router.navigate(['add-rounds', this.id])
        } else {
          this.util.presentAlert("something went wrong")
        }

      }, (err: HttpErrorResponse) => {
        console.log(err);
        this.util.presentAlert(err.message)
      })

    } else {
      this.util.presentAlert("please Add player")
    }



  }
  selectionChanged(event) {

  }

  toggleList() {
    this.isList = !this.isList
  }
}
