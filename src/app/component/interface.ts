export interface Productall {
  _id: string;
  title: string;
  description: string;
  price: { current: number; currency: string; beforeDiscount?: number; discountPercentage?: number; };
  thumbnail: string;
  images: string[];
  stock: number;
  rating: number;
  brand: string;
  warranty?: number;
  category: { id: string; name: string; image: string; };
}



