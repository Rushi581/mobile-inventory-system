import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { gridOutline, addOutline, settingsOutline, shieldOutline, statsChartOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

/*
 * Tabs Navigation Page
 * Main container for all 5 tabs
 * Student ID: 25108934
 */

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, RouterModule],
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor() {
    addIcons({ gridOutline, addOutline, settingsOutline, shieldOutline, statsChartOutline });
  }
}
