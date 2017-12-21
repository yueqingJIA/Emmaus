import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, AlertController} from 'ionic-angular';

import {VetementinfoPage} from '../vetementinfo/vetementinfo';

import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/**
 * Generated class for the InfogeneralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-infogeneral',
  templateUrl: 'infogeneral.html',
})
export class InfogeneralPage {

  avatar1: string = "";
  avatar2: string = "";
  avatar3: string = "";
  avatar4: string = "";
  avatar5: string = "";
  avatar6: string = "";
  public counter=1; 
  //public scannedText: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController, 
    public alertCtrl: AlertController, 
    public imagePicker: ImagePicker, 
    public camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfogeneralPage');
  }

  //Sauter sur une page définie
  change(c,nom,fourni){
    if(c=='Vetement-femme'||c=='Vetement-homme'){
      this.navCtrl.push(VetementinfoPage,{
        Nom: nom,
        Categorie: c,
        //Founisseur: fourni,
        Founisseur: fourni,
        Image1: this.avatar1,
        Image2: this.avatar2,
        Image3: this.avatar3,
        Image4: this.avatar4,
        Image5: this.avatar5,
        Image6: this.avatar6
  });
    }
  }

  //photo
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: 'Prendre une photo',
        role: 'takePhoto',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: 'Importer sur album',
        role: 'chooseFromAlbum',
        handler: () => {
          this.chooseFromAlbum();
        }
      }, {
        text: 'Annuler',
        role: 'cancel',
        handler: () => {
          console.log("cancel");
        }
      }]
    });

    actionSheet.present().then(value => {
      return value;
    });
  }
  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      targetWidth: 200,
      targetHeight: 200,
      saveToPhotoAlbum: true,
      encodingType: this.camera.EncodingType.JPEG, 
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(image => {
      console.log('Image URI: ' + image);
      //alert("pai zhao");
      //this.avatar1 = image.slice(7);
      //alert(image.slice(7));
      //alert(this.counter);
      if(this.counter == 1){this.avatar1 = 'data:image/jpeg;base64,' + image;}
      if(this.counter == 2){this.avatar2 = 'data:image/jpeg;base64,' + image;}
      if(this.counter == 3){this.avatar3 = 'data:image/jpeg;base64,' + image;}
      if(this.counter == 4){this.avatar4 = 'data:image/jpeg;base64,' + image;}
      if(this.counter == 5){this.avatar5 = 'data:image/jpeg;base64,' + image;}
      if(this.counter == 6){this.avatar6 = 'data:image/jpeg;base64,' + image;}
      if(this.counter >= 6){alert("6 photos maximals !");}
      this.counter++;
      //this.avatar = image.slice(7);
    }, error => {
      console.log('Error: ' + error);
    });
  }

  chooseFromAlbum() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      width: 200,
      height: 200,
      outputType:1
    };
    this.imagePicker.getPictures(options).then(images => {
      if (images.length + this.counter > 7) {
        this.presentAlert();
      } //else if (images.length === 1) {
        else{
        console.log('Image URI: ' + images[0]);
        //let i = images.length;
        for(let i = 0; i < images.length ; i++ ){
          //alert("counter "+this.counter);
          //alert("i "+i);
          if(i + this.counter == 1){this.avatar1 = 'data:image/jpeg;base64,' + images[i];}
          if(i + this.counter == 2){this.avatar2 = 'data:image/jpeg;base64,' + images[i];}
          if(i + this.counter == 3){this.avatar3 = 'data:image/jpeg;base64,' + images[i];}
          if(i + this.counter == 4){this.avatar4 = 'data:image/jpeg;base64,' + images[i];}
          if(i + this.counter == 5){this.avatar5 = 'data:image/jpeg;base64,' + images[i];}
          if(i + this.counter == 6){this.avatar6 = 'data:image/jpeg;base64,' + images[i];}
          //this.avatar = images[0].slice(7);
        }
        this.counter = this.counter + images.length;
        //this.avatar = images[0].slice(7);
      }
    }, error => {
      console.log('Error: ' + error);
    });
  }

  deletePhoto(){
    this.counter = 1;
    this.avatar1 = "";
    this.avatar2 = "";
    this.avatar3 = "";
    this.avatar4 = "";
    this.avatar5 = "";
    this.avatar6 = "";
  }

  presentAlert() {
    let alert = this.alertCtrl.create({title: "failed", message: "6 photos maximal!", buttons: ["confirmer"]});
    alert.present().then(value => {
      return value;
    });
  }

}
