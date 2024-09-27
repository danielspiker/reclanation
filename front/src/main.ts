import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { appRouterProviders } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), appRouterProviders]
})
  .catch((err) => console.error(err));
