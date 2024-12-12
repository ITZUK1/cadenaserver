import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PantallaInicioComponent } from './components/pantalla-inicio/pantalla-inicio.component';
import { PantallaVariedadComponent } from './components/pantalla-variedad/pantalla-variedad.component';
import { PantallaFlorComponent } from './components/pantalla-flor/pantalla-flor.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: PantallaInicioComponent },
  { path: 'variety', component: PantallaVariedadComponent },
  { path: 'flower', component: PantallaFlorComponent },
  { path: '**', redirectTo: '/home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
