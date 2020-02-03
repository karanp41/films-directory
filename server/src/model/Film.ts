export interface Film {
  id: number;
  name: string;
  slug: string;
  description: string;
  release_date: string;
  rating: number;
  price: number;
  country: string;
  image: string;
  genre?: any;
}
