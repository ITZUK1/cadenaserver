import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importar HttpClient

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
      imagen: 'assets/img/flor.png'
    },
    // Agrega más flores aquí
  ];

  // Modelo para el formulario
  flor = {
    nombre: '',
    estado: '',
    largo: 0, // Evita valores nulos
    colorID: 0,
    familiaID: 0,
    variedadID: 0
  };
  

  constructor(private http: HttpClient) {}

  // Método para ver más detalles de una flor
  verFlor(flor: any): void {
    console.log('Información de la flor:', flor);
    alert(`Has seleccionado la flor: ${flor.nombre}`);
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (!this.flor.nombre.trim()) {
      alert('El nombre de la flor es obligatorio.');
      return;
    }
  
    console.log('Datos a enviar:', this.flor);
    
    this.http.post('http://localhost:4000/api/flores', this.flor)
      .subscribe(
        response => {
          console.log('Flor agregada con éxito:', response);
          alert('Flor agregada con éxito');
          this.flor = { nombre: '', estado: '', largo: 0, colorID: 0, familiaID: 0, variedadID: 0 };
        },
        error => {
          console.error('Error al agregar la flor:', error);
          alert('Error al agregar la flor');
        }
      );
  }
  
  
  
}
