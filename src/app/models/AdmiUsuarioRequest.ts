import { AdmiRol } from "./AdmiRol";
import { AdmiUsuario } from "./AdmiUsuario";

export type AdmiUsuarioRequest = {
    admiUsuario?:AdmiUsuario;
    admiRolList?:AdmiRol[];
  };