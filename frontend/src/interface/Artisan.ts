import  {Product } from "../interface/Product"

export interface Artisan {
    id: number;
    name: string;
    location: string;
    biography: string;
    email: string;
    imageUrl: string;
    products: Product[];
}