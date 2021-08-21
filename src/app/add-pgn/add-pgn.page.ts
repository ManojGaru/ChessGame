import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { TournamentPopPage } from '../tournament-pop/tournament-pop.page';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-add-pgn',
  templateUrl: './add-pgn.page.html',
  styleUrls: ['./add-pgn.page.scss'],
})
export class AddPGNPage implements OnInit {

  round: any;
  game: any;
  link: any;
  title: any;
  token: string;
  games:any = [];
  pgns: any = [];
  tournament_id: any;
  id: any;
  //temp
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
    searchOnKey: 'name',// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false,// clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }
  rounds: any = [];
  isList: boolean;
  constructor(private router: Router, private alertController: AlertController, private api: ApiService, private util: UtilService, private activatedRoute: ActivatedRoute, public popoverController: PopoverController) {
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
      }
    });
    return await popover.present();
  }

  getTournamentById() {
    this.api.getTournamentDetails(this.token, this.id).subscribe((res: any) => {
      console.log(res, 'tournamnet details');
      res.heats_set.forEach(element => {
        let pl1,pl2;
        let p1 = res.players_set.filter(e=>e.id === element.player1)
        if(p1){
          pl1 = p1[0].name
        }
        let p2 = res.players_set.filter(e=>e.id === element.player2)
        if(p1){
          pl2 = p2[0].name
        }
        this.games.push(pl1+'_vs_'+pl2)
      });
      res.document_set.forEach((e) => {
        this.pgns.push({ pgn_id: e.id, round: e.rounds, game: e.games, dgt_link: e.loc })
      })

      this.tournament_id = res.id;
      for (let i = 1; i <= res.rounds; i++) {
        this.rounds.push({ id: "Round-" + i, name: "Round-" + i })
      }
      console.log(this.rounds);

    }, (err: HttpErrorResponse) => {
      console.log(err);

    })
  }

  addPgn() {
    console.log(this.round.name, this.game, this.link);

    if ((this.link && this.link.length > 0) && (this.game && this.game.length > 0) && (this.round && this.round.name.length > 0)) {
      this.pgns.push({
        round: this.round.name, game: this.game, dgt_link: this.link
      })
      this.link = '';
      this.game = '';
      this.round = ''
    } else {
      this.util.presentAlert("Please fill all the fields")
    }

  }
  async removePgn(item) {


    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure ,want to delete this PGN ?',
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

            if (item.pgn_id) {
              this.util.presentLoading()
              this.api.deletePGN(this.token, item.pgn_id).subscribe((res) => {
                console.log(res);
                this.util.presentAlert('PGN deleted Successfully');
                const index = this.pgns.indexOf(item);
                this.pgns.splice(index, 1);
              }, (err: HttpErrorResponse) => {
                console.log(err);

              })
            } else {
              const index = this.pgns.indexOf(item);
              this.pgns.splice(index, 1);
            }
          }
        }
      ]
    });

    await alert.present();

    console.log(item, this.token);



  }
  submit() {
    if (this.pgns.length > 0) {


      let data = {
        pgn: {
          tournament_id: this.tournament_id,
          pgns: this.pgns
        }

      }
     // console.log(data);
      this.util.presentLoading();
      this.api.addPgn(data, this.token).subscribe((res: any) => {
        console.log(res);
        if (res.error) {
          this.util.presentAlert(res.error);
          this.router.navigate(['tournament-list'])
        } else {
          this.router.navigate(['tournament-list'])
        }


      }, (err: HttpErrorResponse) => {
        console.log(err);
        this.util.presentAlert("Something went wrong")
      })
    } else {
      this.util.presentAlert("Please Add atleast one Item")
    }


  }
  toggleList() {
    this.isList = !this.isList
  }


}
