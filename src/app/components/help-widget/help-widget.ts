import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { IonFabButton, IonIcon, IonFab } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { helpCircleOutline } from 'ionicons/icons';

/*
 * Help Widget Component
 * Reusable help button with alert popup
 * Student ID: 25108934
 */

@Component({
  selector: 'app-help-widget',
  standalone: true,
  imports: [CommonModule, IonFab, IonFabButton, IonIcon],
  templateUrl: 'help-widget.html',
  styleUrls: ['help-widget.scss']
})
export class HelpWidgetComponent {
  @Input() helpTitle: string = 'Help';
  @Input() helpMessage: string = 'Need assistance? This feature helps you manage inventory items efficiently.';

  constructor(private alertController: AlertController) {
    addIcons({ helpCircleOutline });
  }

  /**
   * Show help alert popup
   */
  async showHelp(): Promise<void> {
    const alert = await this.alertController.create({
      header: this.helpTitle,
      message: this.helpMessage,
      buttons: [
        {
          text: 'Close',
          handler: () => {
            console.log('Help closed');
          }
        }
      ],
      cssClass: 'help-alert'
    });

    await alert.present();
  }
}

