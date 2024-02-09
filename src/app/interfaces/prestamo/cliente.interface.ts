export interface PrestamoInterface {
  createdAt?: Date;
  updatedAt?: Date;
  libroId: number;
  clienteId: number;
  fechaPrestamo: Date;
  dias_prestamo: number;
  estado: string;
}
