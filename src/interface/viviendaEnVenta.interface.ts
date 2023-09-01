// viviendaEnVenta.interface.ts

export interface ViviendaEnVenta {
    idVenta: number;
    idVivienda: number;
    precio: number;
    estado: string; // Replace with enum if you have it defined
    fechaPublicacion: Date;
}
