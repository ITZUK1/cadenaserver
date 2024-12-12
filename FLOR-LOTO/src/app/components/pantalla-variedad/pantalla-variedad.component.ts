import { Component } from '@angular/core';

@Component({
  selector: 'app-pantalla-variedad',
  templateUrl: './pantalla-variedad.component.html',
  styleUrls: ['./pantalla-variedad.component.css']
})
export class PantallaVariedadComponent {
  flores = [
    {
      nombre: 'Rosa',
      descripcion: 'Una flor clásica con colores vibrantes.',
      imagen: 'assets/img/flor.png'
    },
    {
      nombre: 'Tulipán',
      descripcion: 'Elegante y perfecta para la primavera.',
      imagen: 'assets/tulipan.jpg'
    },
    // Agrega más flores aquí
  ];

  verFlor(flor: any): void {
    console.log('Información de la flor:', flor);
    alert(`Has seleccionado la flor: ${flor.nombre}`);
  }
}
