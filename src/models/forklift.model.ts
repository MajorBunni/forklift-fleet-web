export interface Forklift {
  id: string;
  name: string;
  modelNumber: string;
  manufacturingDate: Date;
}

export interface AddForklift {
  name: string;
  modelNumber: string;
  manufacturingDate: string;
}