export type DriverAdSpace = "puertas" | "luneta" | "techo";

export interface TaxiDriver {
  id?: string;
  name: string;
  phone: string;
  plate_number: string;
  zone: string;
  taxi_model?: string;
  photo_url?: string;
  ad_spaces: DriverAdSpace[];
  created_at?: string;
}
