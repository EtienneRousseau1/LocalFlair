import  {Product } from "../interface/Product"

export interface Artisan {
    id: number;
    name: string;
    location: string;
    description: string;
    imageUrl: string;
    products: Product[];
}