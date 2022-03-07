export interface Client {
  Id: string;
  ClientNumber: string;
  ClientOwner: string;
  CompanyName: string;
  CompanyType: string;
}

export interface ClientColumn {
  label: string;
  field: keyof Client;
}
