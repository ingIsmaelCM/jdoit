export interface IParams {
  limit?: number;
  search?: string;
  order?: string;
  desc?: boolean;
  filter?: string[];
  include?: string;
  page?: number;
  perpage?: number;
  fields?: string;
  scopes?: string;
  withtrashed?: boolean;
  onlytrashed?: boolean;
  op?: string;
  isNull?: string;
  notNUll?: string;
  like?: string;
  notlike?: string;
  operation?: string;
}

export interface ICommonField {
  id?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}


export  enum  EWhatsappStatus{
  pending="Pendiente",
  qrCode="Enviando QR",
  connected="Conectado",
  cancelled="Cancelado"
}

export interface IMailOptions{
  subject: string,
  to: string,
  context?: Record<string, any>,
  template: string,
  attachment?: any[],

}

export interface  SuccessResponse{
  title: string;
  content: string|Record<string, any>
}