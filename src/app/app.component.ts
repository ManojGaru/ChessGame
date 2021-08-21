import { Component, OnChanges, OnInit } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { UtilService } from './util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  public selectedIndex = 0;
  public appPages: any = [];
  public appPagesB = [
    {
      title: 'EVENT',
      url: 'test',
      // url: '/folder/Inbox',
      icon: 'apps'
    },
    {
      title: 'BRODCAST',
      url: 'test',
      // url: '/folder/Outbox',
      icon: 'globe'
    },
    {
      title: 'ANDROID APP',
      url: 'test',
      // url: '/folder/Favorites',
      icon: 'apps'
    },
    {
      title: 'IOS APP',
      url: 'test',
      icon: 'apps'
    },
    {
      title: 'SIGNUP',
      url: 'signup',
      // url: '/folder/Trash',
      icon: 'person-add'
    },
    {
      title: 'LOGIN',
      url: 'login',
      // url: '/folder/Spam',
      icon: 'log-in'
    }
  ];

  public appPagesL = [
    {
      title: 'DASHBOARD',
      url: 'dashboard',

      icon: 'apps'
    },
    {
      title: 'ALL TOURNAMENT',
      url: 'all-tournament',
      icon: 'home'
    },
    {
      title: 'TOURNAMENT',
      url: 'tournament-list',
      icon: 'play-circle'
    },
    {
      title: 'MEMBERSHIP',
      url: 'membership',
      icon: 'people'
    },
    {
      title: 'PROFILE',
      url: 'profile',
      icon: 'person-circle'
    },
    {
      title: 'LOGOUT',
      url: 'login',
      icon: 'log-out'
    },
    {
      title: 'PASSWORD',
      url: 'change-password',
      icon: 'lock-closed'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private util: UtilService,
    // public event:Event,
    public menuCtrl: MenuController, private network: Network
  ) {
    this.initializeApp();
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.util.presentToast('network was disconnected :-(')
    });

    // stop disconnect watch
    disconnectSubscription.unsubscribe();


    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.util.presentToast('network connected!')
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a  connection!');
          this.util.presentToast('we got a  connection!')
        }
      }, 3000);
    });

    // stop connect watch
    connectSubscription.unsubscribe();

  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


    });
  }
  menuClosed() {
    //code to execute when menu has closed
    console.log('111111111111111111111111111111');
  }

  menuOpened() {
    //  this.menuCtrl.isOpen()
    //code to execute when menu ha opened

    let d = localStorage.getItem('loggedIn');
    if (d) {
      this.appPages = this.appPagesL
    } else {
      this.appPages = this.appPagesB
    }
    console.log('222222222222222222222222222222222');
  }
  menuClick() {
    console.log('lllllllllllllllllll');

  }

  ngOnChanges() {
    console.log('pppppppppp');

  }
  logout(data) {
    console.log(data);
    if (data === 'LOGOUT') {
      localStorage.clear();
    }

    // localStorage.clear();
  }

  ngOnInit() {

    document.addEventListener('offline', () => {
   //   console.log('jjjjhjhjhjhjhjhjjhjhjhjhjh');
      this.util.presentToast('network was disconnected :-(')
    })
    // document.addEventListener('online', () => {
    //   this.util.presentToast('network connected :-(')
    // })
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
