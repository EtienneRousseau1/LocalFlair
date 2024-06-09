import  {Product } from "../interface/Product"

export interface Artisan {
    id: number;
    name: string;
    location: string;
    biography: string;
    email: string;
    picture: string;
    products: Product[];
}