import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInPreloadAllModules } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { IonicConfig, provideIonicAngular } from '@ionic/angular/standalone';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

const ionicConfig: IonicConfig = {
  mode: 'ios',
  animated: true,
  swipeBackEnabled: true
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withInPreloadAllModules()),
    provideAnimations(),
    provideHttpClient(),
    provideIonicAngular(ionicConfig)
  ]
}).catch(err => console.log(err));
