import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Res } from "../../app/app.constants";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  private title: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    console.log('SettingsPage');
    this.title = Res.Strings.settings;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
