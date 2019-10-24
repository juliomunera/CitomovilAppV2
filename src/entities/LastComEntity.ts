
export class LastComEntity {
  public totalInstancias : number;
  public resultados : Valores[]
  public token : string;
  public excepcion : Exception;
  public ruta : string;
}

export class TotalMsgEntity {
    public totalInstancias : number;
    public resultados : ValueTotalMsg[]
    public token : string;
    public excepcion : Exception;
  }

export class ValueTotalMsg {
    public Tipo : string;
    public Total : number;
}

export class ListComEntity {
    public totalInstancias : number;
    public resultados : Valores[]
    public token : string;
    public excepcion : Exception;
    public ruta : string;
  }

export class item {
    public 0 : Valores;
    public 1 : Valores;
}

export class Valores {
    IdComunicacion: string;
    Asunto: string;
    Comentario: string;
    Adjunto: string;
    Fecha: string;
    ComunicacionLeida: string;
    Tipo: string;
}

export class Exception {
    codigo: number;
    descripcion : string;
}

export class PostEntity{
    numeroMovil : string;
    codigoCliente : string;
    codigoProyecto : string;
    codigoAplicacion : string;
    codigoAPI : string = '5c6c7318c72ea';
    token : string;
}