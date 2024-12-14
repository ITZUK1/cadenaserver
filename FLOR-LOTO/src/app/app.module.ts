import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Importar HttpClientModule
import { FormsModule } from '@angular/forms';  // Importa FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PantallaInicioComponent } from './components/pantalla-inicio/pantalla-inicio.component';
import { PantallaVariedadComponent } from './components/pantalla-variedad/pantalla-variedad.component';
import { PantallaFlorComponent } from './components/pantalla-flor/pantalla-flor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PantallaInicioComponent,
    PantallaVariedadComponent,
    PantallaFlorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule  // Agrega FormsModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
