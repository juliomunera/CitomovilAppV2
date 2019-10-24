


export class AuthEntity {
  public token : string;
  public resultados : Valores[];
  public excepcion : Exception;
  public totalInstancias : number;
}

export class Valores {
    CodigoCliente: string;
    CodigoProyecto: string;
    CodigoAplicacion: string;
    NumeroMovil: string;
    CodigoDispositivo: string;
    NumeroMovilPortero : string;
}

export class Exception {
    codigo: number;
    descripcion : string;
}
