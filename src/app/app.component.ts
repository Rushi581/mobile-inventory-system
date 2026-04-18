import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { KeyboardService } from './services/keyboard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IonApp, IonRouterOutlet],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private keyboardService: KeyboardService) {}
}
