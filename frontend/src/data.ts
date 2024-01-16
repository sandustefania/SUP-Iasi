import { Food } from './app/shared/models/Food';

export const sample_foods: Food[] = [
  {
    id: '1',
    name: 'Pizza carne',
    price: 35,
    tags: ['FastFood', 'Pizza', 'Lunch'],
    favorite: false,
    stars: 4.0,
    imageUrl: 'assets/food-standard.jpg',
    origins: ['Italy', 'Rome'],
    cookTime: '40',
  },
  {
    id: '2',
    name: 'Calzone',
    price: 20,
    tags: ['FastFood', 'Calzone', 'Snack'],
    favorite: true,
    stars: 5.0,
    imageUrl: 'assets/food-standard.jpg',
    origins: ['Italy', 'Rome'],
    cookTime: '20',
  },
  {
    id: '3',
    name: 'Lasagna',
    price: 25,
    tags: ['FastFood', 'Lasagna', 'Lunch'],
    favorite: false,
    stars: 3.5,
    imageUrl: 'assets/food-standard.jpg',
    origins: ['Italy', 'Rome'],
    cookTime: '30',
  },
  {
    id: '4',
    name: 'Pizza Chicken',
    price: 35,
    tags: ['FastFood', 'Pizza', 'Lunch'],
    favorite: true,
    stars: 4.0,
    imageUrl: 'assets/food-standard.jpg',
    origins: ['Italy', 'Rome'],
    cookTime: '40',
  },
  {
    id: '5',
    name: 'Pizza Vegan',
    price: 30,
    tags: ['FastFood', 'Pizza', 'Vegan'],
    favorite: false,
    stars: 2.0,
    imageUrl: 'assets/food-standard.jpg',
    origins: ['Italy', 'Rome'],
    cookTime: '40',
  },
  {
    id: '6',
    name: 'Tiramisu',
    price: 20,
    tags: ['Desert', 'Tiramisu'],
    favorite: true,
    stars: 4.5,
    imageUrl: 'assets/food-standard.jpg',
    origins: ['Italy', 'Rome'],
    cookTime: '10',
  },
];
