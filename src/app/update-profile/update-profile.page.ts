import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { UtilService } from '../util.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
//import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import * as moment from 'moment';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {
  token: string;
  user: any;
  username: any;
  first_name: any;
  last_name: any;
  age: any;
  contact: any;
  gender: any;
  dob: any = new Date();
  bio: any;
  tempImage: any;
  image: any = 'https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500';
  imageShow: any='https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500';



  constructor(private router: Router, private api: ApiService, private util: UtilService, private camera: Camera,
    public actionSheetController: ActionSheetController, private filePath: FilePath,private platform:Platform,private webview:WebView
    //private file: File
    ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.util.presentLoading()
    this.api.UserDetails(this.token).subscribe((res: any) => {
      console.log(res);
      this.util.dismissLoading()
      this.user = res;
      this.username = res.user.username;
      this.age = res.age;
      this.bio = res.bio;
      this.first_name = res.user.first_name;
      this.last_name = res.user.last_name;
      this.gender = res.gender;
      this.dob =res.dob
      this.contact = res.contact
      this.imageShow = 'http://54.183.117.48:8000'+res.image
    }, (err: HttpErrorResponse) => {
      console.log(err);

    })
  }

  openGallery(sourceType) {
    
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
    //  console.log(imageData, '111111111111111');
      let ftftft ='data:image/jpeg;base64,'+ imageData;
      let fts = this.dataURItoBlob(ftftft)
      console.log(fts);
      const imageName ='1234.jpeg';
     // this.image = new File([fts], imageName, { type: 'image/jpeg' })
      this.image = fts
      this.imageShow = (<any>window).Ionic.WebView.convertFileSrc(ftftft);
      // if(this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY){
      //   this.tempImage = 'file://'+imageData
      //  // this.image = (<any>window).Ionic.WebView.convertFileSrc(imageData);
      //   console.log(this.image, '22222222222222222222222');
      
      //   // this.file.resolveLocalFilesystemUrl(this.tempImage)
  
      //   //   .then(filePath => {
      //   //     console.log(filePath, 'lllllllllllllll')
  
      //   //   })
      //   //   .catch(err => console.log(err));
      // }else{
      //   console.log(imageData,'3333333333333333333333');
        
      //   this.tempImage = imageData
      //  // this.image = (<any>window).Ionic.WebView.convertFileSrc(imageData);
      // }
     
      // imageData is either a base64 encoded string or a file URI
      // this.croppedImagePath = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}
dataURItoBlob2(dataURI) {
  const byteString = window.atob(dataURI);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
   }
  const blob = new Blob([int8Array], { type: 'image/jpeg' });    
 return blob;
}
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.openGallery(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.openGallery(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  update() {
    this.util.presentLoadingWithoutTime();
    let data = new FormData();
    data.append('contact',this.contact)
    data.append('gender',this.gender)
    data.append('age',this.age)
    data.append('bio',this.bio)
    data.append('dob',moment(this.dob).format("YYYY-MM-DD"))
    data.append('image',this.image,'123.jpg')

    
    data.forEach(e=>{
      console.log(e);
      
    })
    console.log(data, '......................');

    this.api.updateProfile(data, this.token).subscribe((res: any) => {
      console.log(res);
      this.util.dismissLoading();
      this.util.presentAlert('Profile updated successfully')
      this.router.navigate(['profile'])
    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.util.dismissLoading()

    })


  }

  changeListener(event){
    console.log(event);
    console.log(event.srcElement.files[0]);
    let ddd = URL.createObjectURL(event.srcElement.files[0])
    this.image = event.srcElement.files[0]
    console.log(ddd);
    let reeder = new FileReader();
    reeder.readAsArrayBuffer(event.srcElement.files[0])
    console.log(reeder,'111111');
    
   // this.image = ddd
    
  }
}


