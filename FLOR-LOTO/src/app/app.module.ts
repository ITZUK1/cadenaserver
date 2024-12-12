import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PantallaInicioComponent } from './components/pantalla-inicio/pantalla-inicio.component';
import { PantallaVariedadComponent } from './components/pantalla-variedad/pantalla-variedad.component';
import { PantallaFlorComponent } from './components/pantalla-flor/pantalla-flor.component';

@NgModule({
  declarations: [
    AppComponent,
    PantallaInicioComponent,
    PantallaVariedadComponent,
    PantallaFlorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
