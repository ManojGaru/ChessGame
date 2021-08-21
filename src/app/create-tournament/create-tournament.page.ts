import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ADD } from 'src/constant';
import { ApiService } from '../api.service';
import { UtilService } from '../util.service';
import * as moment from 'moment';
import { PopoverController } from '@ionic/angular';
import { TournamentPopPage } from '../tournament-pop/tournament-pop.page';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.page.html',
  styleUrls: ['./create-tournament.page.scss'],
})
export class CreateTournamentPage implements OnInit {
  tournament_name: any;
  tournament_description: any;
  location: any;
  type: any;
  types:any=[
    'Standard Chess Position','Chess960','King Of The Hill'
  ]
  country: any;
  laws_of_chess: any;
  start_date: any = new Date();
  start_time: any = new Date();
  end_date: any = new Date();
  end_time: any = new Date();
  timezone: any;
  rounds: any;
  token: string;
  timeZones: any = [];
  state: any='ADD';
  id:any;
  dataModel:any;
  isApproved:any=true;
  config = {
  //  displayFn:(item: any) => { return item.hello.world; }, //to support flexible text displaying for each item
    displayKey:"description", //if objects array passed which key to be displayed defaults to description
    search:true ,//true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Select' ,// text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more' ,// text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Search', // label thats displayed in search input,
    searchOnKey: 'name' ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false ,// clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }
  options: any=[];

  constructor(private router: Router, private api: ApiService, private util: UtilService, private activatedRoute: ActivatedRoute,public popoverController: PopoverController) {
    this.token = localStorage.getItem('token');
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.id = id;
    if (id) {
      this.api.getTournamentDetails(this.token, id).subscribe((res: any) => {
        console.log(res);
        this.tournament_name = res.name;
        this.tournament_description = res.desc;
        this.location = res.location;
        this.country = res.country;
        this.laws_of_chess = res.laws;
        this.timezone = res.timezone;
        this.rounds = res.rounds;
        this.start_date = new Date(res.startdate);
        this.end_date = new Date(res.enddate);
        this.start_time = res.starttime
        this.end_time = res.endtime;
        this.type = res.type;
        this.isApproved = res.is_approved;
      }, (err: HttpErrorResponse) => {
        console.log(err);

      });

     
    }
    this.util.getStatus().then(res => {
      console.log(res);
      this.state = res;

    })

   

  }

  ngOnInit() {
    this.getTomezone();
    this.options.push({id: 34, description: 'Adding new item'});
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: TournamentPopPage,
      cssClass: 'my-custom-pop-class',
      event: ev,
      translucent: true,
      componentProps: {
        "id": this.id,
        "approved":this.isApproved
      }
    });
    return await popover.present();
  }
  getTomezone() {
    this.api.getTimeZone(this.token).subscribe((res: any) => {
      console.log(res);
      this.timeZones = res.timezone
    }, (err: HttpErrorResponse) => {
      console.log(err);

    })
  }

  tournaments() {
    console.log(
      this.tournament_name.length,
      this.tournament_description,
      this.location,
      this.type,
      this.country,
      this.laws_of_chess,
      this.start_date,
      this.start_time,
      this.end_date,
      this.end_time,
       this.timezone,
      this.rounds
    );

    if ((this.tournament_name && this.tournament_name.length > 0) && (this.tournament_description && this.tournament_description.length > 0)
      && (this.location && this.location.length > 0) && (this.type && this.type.length > 0) && (this.country && this.country.length > 0)
      && (this.laws_of_chess && this.laws_of_chess.length > 0) && (this.timezone && this.timezone.length > 0) && (this.rounds && this.rounds > 0)) {
      console.log('succes',this.state,ADD);
      let data= {};
      if (this.state === ADD) {
        data = {
          tournament: {
            tournament_name: this.tournament_name,
            tournament_description: this.tournament_description,
            location: this.location,
            type: this.type,
            country: this.country,
            laws_of_chess: this.laws_of_chess,
            start_date:moment(this.start_date).format("YYYY-MM-DD"),
            start_time: new Date(this.start_time).toLocaleTimeString("en-ud", { hour: "2-digit", minute: "2-digit" }),
            end_date:  moment(this.end_date).format("YYYY-MM-DD"),
            end_time: new Date(this.end_time).toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" }),
            timezone: this.timezone,
            rounds: this.rounds
          }
        }
      }else{
        data = {
          tournament: {
            tournament_id:this.id,
            tournament_name: this.tournament_name,
            tournament_description: this.tournament_description,
            location: this.location,
            type: this.type,
            country: this.country,
            laws_of_chess: this.laws_of_chess,
            start_date:moment(this.start_date).format("YYYY-MM-DD"),
            start_time: this.start_time,
            end_date: moment(this.end_date).format("YYYY-MM-DD"),
            end_time:this.end_time,
            timezone: this.timezone,
            rounds: this.rounds
          }
        }
      }
    
      console.log(data);

      this.api.addTournamentStep1(data, this.token).subscribe((res:any) => {
        console.log(res);
        
        this.router.navigate(['add-player',this.id?this.id:res.tournament_id])
      }, (err: HttpErrorResponse) => {
        console.log(err);

      })


    
    } else {
      this.util.presentAlert('Please fill all the fields')
     // this.router.navigate(['add-player']);
    }


  }

  selectionChanged(data){
  
  }
}
