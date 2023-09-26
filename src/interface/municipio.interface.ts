export interface municipio {
    id_municipio: number; //PK
    nombre: string;
    area?: number;
    presupuesto?: number;
    departamento_id_departamento: number; //FK
}