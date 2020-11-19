import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreateRouteFormComponent } from './create-route-form/create-route-form.component';
import { RippleDirective } from './ripple.directive';

@NgModule({
  declarations: [
    AppComponent,
    CreateRouteFormComponent,
    RippleDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
