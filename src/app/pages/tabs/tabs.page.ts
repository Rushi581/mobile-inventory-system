import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { gridOutline, addOutline, settingsOutline, shieldOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

/*
 * Tabs Navigation Page
 * Main container for all 4 tabs
 * Student ID: 25108934
 */

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor() {
    addIcons({ gridOutline, addOutline, settingsOutline, shieldOutline });
  }
}
