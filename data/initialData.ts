
import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ugali with Sukuma Wiki',
    price: 150,
    description: 'Traditional Kenyan staple white cornmeal served with sautéed collard greens.',
    image: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa?q=80&w=1000&auto=format&fit=crop',
    category: 'Main Dish',
    vendorId: 'v1',
    vendorName: 'Mama Ntilie Kitchen'
  },
  {
    id: '2',
    name: 'Nyama Choma',
    price: 850,
    description: 'Succulent grilled goat meat, perfectly seasoned and smoky.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
    category: 'Meat',
    vendorId: 'v1',
    vendorName: 'Mama Ntilie Kitchen'
  },
  {
    id: '3',
    name: 'Beef Pilau',
    price: 450,
    description: 'Fragrant Swahili rice cooked with tender beef and aromatic spices.',
    image: 'https://images.unsplash.com/photo-1512058560366-cd2427ff1101?q=80&w=1000&auto=format&fit=crop',
    category: 'Rice',
    vendorId: 'v2',
    vendorName: 'Coastal Delights'
  },
  {
    id: '4',
    name: 'Samaki wa Kupaka',
    price: 1200,
    description: 'Whole grilled fish in a rich, creamy coconut curry sauce.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000&auto=format&fit=crop',
    category: 'Seafood',
    vendorId: 'v2',
    vendorName: 'Coastal Delights'
  },
  {
    id: '5',
    name: 'Githeri',
    price: 200,
    description: 'Hearty mix of maize and beans slow-cooked with fresh vegetables.',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1000&auto=format&fit=crop',
    category: 'Vegetarian',
    vendorId: 'v1',
    vendorName: 'Mama Ntilie Kitchen'
  },
  {
    id: '6',
    name: 'Chapati & Madondo',
    price: 250,
    description: 'Soft layered flatbread served with delicious yellow bean stew.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb39795?q=80&w=1000&auto=format&fit=crop',
    category: 'Main Dish',
    vendorId: 'v3',
    vendorName: 'The Chapati Hub'
  },
  {
    id: '7',
    name: 'Matoke with Beef',
    price: 350,
    description: 'Cooked green bananas mashed into a savory stew with tender beef.',
    image: 'https://images.unsplash.com/photo-1589187151003-0dd331ad2d12?q=80&w=1000&auto=format&fit=crop',
    category: 'Main Dish',
    vendorId: 'v3',
    vendorName: 'The Chapati Hub'
  },
  {
    id: '8',
    name: 'Mandazi (4 pcs)',
    price: 80,
    description: 'Sweet, fluffy Kenyan doughnuts, perfect with morning tea.',
    image: 'https://images.unsplash.com/photo-1579590182441-628c6bc6146c?q=80&w=1000&auto=format&fit=crop',
    category: 'Snacks',
    vendorId: 'v1',
    vendorName: 'Mama Ntilie Kitchen'
  },
  {
    id: '9',
    name: 'Kuku Choma',
    price: 750,
    description: 'Grilled organic chicken with local herbs and pili pili sauce.',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=1000&auto=format&fit=crop',
    category: 'Meat',
    vendorId: 'v2',
    vendorName: 'Coastal Delights'
  }
];
