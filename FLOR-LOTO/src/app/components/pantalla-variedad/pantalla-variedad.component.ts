import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importar HttpClient

@Component({
  selector: 'app-pantalla-variedad',
  templateUrl: './pantalla-variedad.component.html',
  styleUrls: ['./pantalla-variedad.component.css']
})
export class PantallaVariedadComponent {
  flores = [
    { nombre: 'Rosa', descripcion: 'Una flor roja hermosa.', imagen: 'assets/img/rosa.jpg' },
    { nombre: 'Tulipán', descripcion: 'Un tulipán amarillo vibrante.', imagen: 'assets/img/tulipan.jpg' },
    { nombre: 'Girasol', descripcion: 'Un girasol brillante y alegre.', imagen: 'assets/img/girasol.jpg' },
    { nombre: 'Orquídea', descripcion: 'Elegante y exótica.', imagen: 'assets/img/orquidea.jpg' },
    { nombre: 'Margarita', descripcion: 'Pequeña y delicada.', imagen: 'assets/img/margarita.jpg' },
    { nombre: 'Clavel', descripcion: 'Colorida y fragante.', imagen: 'assets/img/clavel.jpg' },
  ];

  florSeleccionada: any = null;

  flor = {
    nombre: '',
    estado: '',
    largo: 0,
    colorID: 0,
    familiaID: 0,
    variedadID: 0
  };

  constructor(private http: HttpClient) {}

  // Método para ver más detalles de una flor
  verFlor(flor: any): void {
    this.florSeleccionada = flor;
  }

  // Método para cerrar el modal
  cerrarModal(): void {
    this.florSeleccionada = null;
  }

  // Método que se ejecuta al enviar el formulario
onSubmit(): void {
  if (!this.flor.nombre.trim()) {
    alert('El nombre de la flor es obligatorio.');
    return;
  }

  this.http.post('http://localhost:4000/api/flores', this.flor)
    .subscribe(
      response => {
        alert('Flor agregada con éxito');
        this.flor = { nombre: '', estado: '', largo: 0, colorID: 0, familiaID: 0, variedadID: 0 };
      },
      error => {
        alert('Error al agregar la flor');
      }
    );
}

}

