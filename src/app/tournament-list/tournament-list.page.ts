import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.page.html',
  styleUrls: ['./tournament-list.page.scss'],
})
export class TournamentListPage implements OnInit {

  tournaments: any = []
  token: string;


  constructor(private router: Router, private api: ApiService, private util: UtilService,private alertController:AlertController) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
 //  this.getTournaments()
  
  }
  ionViewWillEnter(){
    this.util.presentLoading()
    this.api.Tournamnets(this.token).subscribe((res: any) => {
      console.log(res);
      this.tournaments = res;
    }, (err: HttpErrorResponse) => {
      console.log(err);
 
    })
  }
  getTournaments(){
    this.util.presentLoading()
    this.api.Tournamnets(this.token).subscribe((res: any) => {
      console.log(res);
      this.tournaments = res;
    }, (err: HttpErrorResponse) => {
      console.log(err);

    })
  }
  edit(item){
    this.util.setStatus('EDIT').then((res)=>{
      if(res === true){
        this.router.navigate(['create-tournament',item.id])
      }
      
    })
   
  }
  async delete(item){
 
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: 'Are you sure ,want to delete this Tournament ?',
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
              this.util.presentLoading();
              this.api.deleteTournament(this.token,item.id).subscribe((res)=>{
                this.util.presentToast('Tournament deleted Successfully')
                this.getTournaments();
              },(err:HttpErrorResponse)=>{
                this.util.presentAlert('Something went wrong');
              })
              console.log('Confirm Okay');
            }
          }
        ]
      });
  
      await alert.present();
    
  
  }
  view(item){
    console.log(item);
    this.router.navigate(['tournament-view',item.id])
  }

  users() {

    this.router.navigate(['users'])
  }
  profile() {
    this.router.navigate(['update-profile'])
  }
  createTournament(){
    this.util.setStatus('ADD').then((res)=>{
      if(res === true){
        this.router.navigate(['create-tournament',''])
      }
      
    })
  }

}