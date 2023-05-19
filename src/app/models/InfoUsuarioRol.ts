import { AdmiRol } from "./AdmiRol";
import { AdmiUsuario } from "./AdmiUsuario";

export type InfoUsuarioRol = {
  id?: number;
  usuario: AdmiUsuario;
  rol: AdmiRol;
  usuarioCreacion?: string;
  fechaCreacion?: Date;
  usuarioModificacion?: string;
  fechaModificacion?: Date;
  estado?: string;
};