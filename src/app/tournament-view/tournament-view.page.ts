import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-tournament-view',
  templateUrl: './tournament-view.page.html',
  styleUrls: ['./tournament-view.page.scss'],
})
export class TournamentViewPage implements OnInit {
  token: string;
  tournamentdetails:any;

  constructor(private router: Router, private api: ApiService, private util: UtilService, private activatedRoute: ActivatedRoute) {
    this.token = localStorage.getItem('token');
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(id);
    if (id) {
      this.api.getTournamentDetails(this.token, id).subscribe((res: any) => {
        console.log(res);
        this.tournamentdetails = res;
        // this.tournament_name = res.name;
        // this.tournament_description = res.desc;
        // this.location = res.location;
        // this.country = res.country;
        // this.laws_of_chess = res.laws;
        // this.timezone = res.timezone;
        // this.rounds = res.rounds;
        // this.start_date = new Date(res.startdate);
        // this.end_date = new Date(res.enddate);
        // this.start_time = res.starttime
        // this.end_time = res.endtime;
        // this.type = res.type;
        // this.isApproved = res.is_approved;
      }, (err: HttpErrorResponse) => {
        console.log(err);

      });

     
    }
    
   }

  ngOnInit() {
    
  }

}
