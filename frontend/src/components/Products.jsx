

// Import images
import americanoImg from '../assets/img/61790277.jpg';
import  cappuccinoImg from '../assets/img/61790278.jpg';
import cafeLattesImg from '../assets/img/61790279.jpg';
import spanishLatteImg from '../assets/img/61790280.jpg';
import vanillaLatteImg from '../assets/img/61790281.jpg';
import caramelLatteImg from '../assets/img/61790282.jpg';
import whiteMochaImg from '../assets/img/61790283.jpg';
import javaChipsImg from '../assets/img/61790284.jpg';
import einspannerLatteImg from '../assets/img/61790285.jpg';
import matchaLatteImg from '../assets/img/61790286.jpg';
import merryMatchaImg from '../assets/img/61790287.jpg';
import strawberryMatchaImg from '../assets/img/61790288.jpg';
import matchaEspressoImg from '../assets/img/61790289.jpg';
import ubeTaroImg from '../assets/img/61790290.jpg';
import strawberryImg from '../assets/img/61790291.jpg';
import darkCocoaImg from '../assets/img/61790292.jpg';
import cocoaBerryImg from '../assets/img/61790293.jpg';
import pinkLycheeImg from '../assets/img/61790294.jpg';
import purpleLemonadeImg from '../assets/img/61790295.jpg';
import creamyCocoaImg from '../assets/img/61790296.jpg';

// Coffee product data
export const products = [
   {
      id: 1,
      name: 'Americano',
      price: 79.2,
      originalPrice: 99,
      category: 'coffee',
      image: americanoImg,
      description:
         'Bold and invigorating, this classic drink combines rich espresso with chilled water and ice for a refreshing, smooth, and energizing coffee experience.',
   },
   {
      id: 2,
      name: 'Cafe Latte',
      price: 79.2,
      originalPrice: 99,
      category: 'coffee',
      image: cafeLattesImg,
      description:
         'A classic blend of rich espresso and creamy milk, served over ice for a smooth and refreshing coffee experience. Perfectly light and satisfying.',
   },
   {
      id: 3,
      name: 'Spanish Latte',
      price: 79.2,
      originalPrice: 99,
      category: 'coffee',
      image: spanishLatteImg,
      description:
         'A luscious combination of bold espresso, creamy milk, and a hint of sweetness, served over ice. This indulgent drink offers a perfectly balanced and refreshing coffee treat.',
   },
   {
      id: 4,
      name: 'Vanilla Latte',
      price: 79.2,
      originalPrice: 99,
      category: 'coffee',
      image: vanillaLatteImg,
      description:
         'A refreshing blend of smooth espresso, creamy milk, and a touch of sweet vanilla syrup, served over ice. Perfectly balanced for a delightful pick-me-up on warm days.',
   },
   {
      id: 5,
      name: 'Caramel Latte',
      price: 79.2,
      originalPrice: 99,
      category: 'coffee',
      image: caramelLatteImg,
      description:
         'Smooth espresso paired with creamy milk and sweet caramel syrup, served over ice.',
   },
   {
      id: 6,
      name: 'White Mocha',
      price: 79.2,
      originalPrice: 99,
      category: 'coffee',
      image: whiteMochaImg,
      description:
         'A delightful mix of bold espresso, creamy milk, and sweet white chocolate syrup, served over ice.',
   },
   {
      id: 7,
      name: 'Java Chips',
      price: 79.2,
      originalPrice: 99,
      category: 'coffee',
      image: javaChipsImg,
      description:
         'A deliciously indulgent blend of rich coffee, chocolate chips, and creamy milk, all served over ice. A perfect treat for coffee and chocolate lovers, offering a smooth and satisfying crunch in every sip.',
   },
   {
      id: 8,
      name: 'Einspanner Latte',
      price: 79.2,
      originalPrice: 99,
      category: 'coffee',
      image: einspannerLatteImg,
      description:
         'A bold espresso paired with chilled milk, topped with a thick layer of whipped cream, and served over ice. A rich and creamy coffee treat with a smooth, indulgent finish.',
   },
   {
      id: 9,
      name: 'Matcha Latte',
      price: 79.2,
      originalPrice: 99,
      category: 'matcha',
      image: matchaLatteImg,
      description:
         'A refreshing blend of premium matcha green tea and creamy milk, served over ice. Smooth, earthy, and naturally energizing.',
   },
   {
      id: 10,
      name: 'Merry Matcha',
      price: 79.2,
      originalPrice: 99,
      category: 'matcha',
      image: merryMatchaImg,
      description:
         'A refreshing blend of premium matcha green tea and creamy milk, served over ice and topped with a velvety layer of foam.',
   },
   {
      id: 11,
      name: 'Strawberry Matcha',
      price: 79.2,
      originalPrice: 99,
      category: 'matcha',
      image: strawberryMatchaImg,
      description:
         'A delightful fusion of sweet strawberry, earthy matcha green tea, and creamy milk, served over ice. A vibrant and refreshing treat with layers of flavor.',
   },
   {
      id: 12,
      name: 'Matcha Espresso',
      price: 79.2,
      originalPrice: 99,
      category: 'matcha',
      image: matchaEspressoImg,
      description:
         'A bold combination of smooth espresso and rich matcha green tea, blended with creamy milk and served over ice. A perfect balance of earthy and energizing flavors for a refreshing boost.',
   },
   {
      id: 13,
      name: 'Ube Taro',
      price: 79.2,
      originalPrice: 99,
      category: 'milk',
      image: ubeTaroImg,
      description:
         'A creamy and refreshing blend of sweet ube and taro, mixed with smooth milk and served over ice. A deliciously vibrant drink with a unique, nutty flavor and a hint of sweetness.',
   },
   {
      id: 14,
      name: 'Strawberry',
      price: 79.2,
      originalPrice: 99,
      category: 'milk',
      image: strawberryImg,
      description:
         'A sweet and creamy blend of fresh strawberry jam and smooth milk, served over ice.',
   },
   {
      id: 15,
      name: 'Dark Cocoa',
      price: 79.2,
      originalPrice: 99,
      category: 'milk',
      image: darkCocoaImg,
      description:
         'A rich and indulgent blend of smooth dark cocoa and creamy milk, served over ice. A refreshing, chocolatey treat with a deep, velvety flavor.',
   },
   {
      id: 16,
      name: 'Cocoa Berry',
      price: 79.2,
      originalPrice: 99,
      category: 'milk',
      image: cocoaBerryImg,
      description:
         'A delicious fusion of rich cocoa and sweet strawberry jam, blended with creamy milk and served over ice. A refreshing and indulgent treat with a perfect balance of chocolate and fruity sweetness.',
   },
   {
      id: 17,
      name: 'Pink Lychee',
      price: 63.2,
      originalPrice: 79,
      category: 'juice',
      image: pinkLycheeImg,
      description:
         'A refreshing mix of tangy lemonade and sweet lychee, served over ice. This vibrant, fruity drink offers a perfect balance of sweetness and citrus, making it a refreshing and exotic treat.',
   },
   {
      id: 18,
      name: 'Purple Lemonade',
      price: 63.2,
      originalPrice: 79,
      category: 'juice',
      image: purpleLemonadeImg,
      description:
         'A refreshing and tangy blend of zesty lemon and vibrant red tea, served over ice.',
   },
   {
      id: 19,
      name: 'Creamy Cocoa',
      price: 63.2,
      originalPrice: 79,
      category: 'hot',
      image: creamyCocoaImg,
      description:
         "A rich and velvety blend of smooth cocoa and creamy milk, perfectly heated to offer a warm and indulgent treat. A comforting drink that's sweet, chocolaty, and irresistibly cozy.",
   },
   {
      id: 20,
      name: 'Cappuccino',
      price: 63.2,
      originalPrice: 79,
      category: 'hot',
      image: cappuccinoImg,
      description:
         'A classic espresso-based drink with equal parts rich espresso, creamy steamed milk, and light foam on top. A smooth, balanced, and aromatic coffee.',
   },
];

// Helper functions to get data in different formats
export const getProductsByCategory = (category) => {
   return products.filter((product) => product.category === category);
};

export const getAllCategories = () => {
   return [...new Set(products.map((product) => product.category))];
};

export const getProductById = (id) => {
   return products.find((product) => product.id === id);
};

// Export default products for simple import
export default products;
