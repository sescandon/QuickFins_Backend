export interface Persona {
  id_cedula: number; //PK
  nombre?: string; 
  telefono?: number;
  sexo?: 'Femenino' | 'Masculino';
  fechaDeNacimiento?: string;
}
