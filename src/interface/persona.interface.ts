export interface Persona {
  id_cedula: number; //PK
  nombre?: string; 
  telefono?: number;
  sexo?: 'Femenino' | 'Masculino';
  fecha_de_nacimiento?: string;
}
