export interface Vivienda {
    id_vivienda: number; //PK autoIncrement
    direccion?: string;
    capacidad?: number;
    niveles?: number;
    baños?: number;
    estrato?: number;
    area?: number;
    municipio_id_municipio: number; //FK
}