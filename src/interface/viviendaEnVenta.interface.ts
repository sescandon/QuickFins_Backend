// viviendaEnVenta.interface.ts

export interface ViviendaEnVenta {
    id_venta: number; //PK autoincrement
    vivienda_id_vivienda: number; //FK
    persona_id_cedula: number; //FK
    precio: number;
    estado: 'disponible' | 'vendida' | 'reservada';
    fechaPublicacion?: Date;
}
