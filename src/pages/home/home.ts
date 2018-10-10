import { FIREBASE_CONFIG } from './../../app/firebase.config';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { storage, initializeApp } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  img: any;
  constructor(private camera: Camera, public navCtrl: NavController) {
    initializeApp(FIREBASE_CONFIG);
    const img = storage().ref('pictures/myPhoto').getDownloadURL().then((url) => {
        this.img = url;
    })
    console.log(img);
  }


  async takePhoto() {
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      const result = await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;
      const pictures = storage().ref('pictures/myPhoto');
      pictures.putString(image, 'data_url');
    }
    catch(e)
    {
      console.log(e);
    }
  }
}
