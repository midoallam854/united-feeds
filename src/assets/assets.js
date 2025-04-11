import feedBag2 from './feedBag2.svg';
import feedBag3 from './feedBag3.svg';
import feedBag4 from './feedBag4.png';
import feedBag5 from './feedBag5.png';
import feedBag6 from './feedBag6.png';
import feedBagD2 from './feedBagD2.png';
import feedBagD3 from './feedBagD3.png';
import feedBagD4 from './feedBagD4.png';
import feedBagD5 from './feedBagD5.png';

export const products = [
  // Barley products
  {
    _id: '1',
    name_en: 'Barley 50 Kg - AL Rai',
    name_ar: 'شعير 50 كجم - الراعي',
    image: [feedBag3, feedBagD3],
    stars: 5,
    price: 55.8,
    description_en:
      'A product consisting of nutrient-rich granules, providing animals with a healthy and sound structure. Cost-effective for consumers. Features of whole barley: Easily available at all stations, easy to store.',
    description_ar:
      'منتج عبارة عن حبيبات غنية بالقيم الغذائية، تمد الحيوانات ببنية صحية وسليمة. ذو تكلفة منخفضة على المستهلك. مميزات شعير الحب الكامل: سهولة توفره في جميع المحطات، سهل التخزين.',
    category: 'Barley',
    productType: 'Whole',
    size: 50,
    bestseller: true,
    arrivalDate: '2025-03-10', // This week
    isDiscounted: false,
    inStock: true,
  },
  {
    _id: '2',
    name_en: 'Rolled Barley 40Kg',
    name_ar: 'شعير مجروش 40 كجم',
    image: [feedBag4, feedBagD4],
    stars: 0,
    price: 45.6,
    description_en:
      'A barley product that aids in accelerating the digestion process for animals, designed for feeding animals without any waste. It is the fastest and easiest to digest compared to regular barley. Features of rolled barley: Easily available at all stations, easy to store.',
    description_ar:
      'منتج شعير يساعد في تسريع عملية الهضم للحيوان، مخصص لتغذية الحيوانات دون أي هدر في الشعير. يعتبر الأكثر سرعة وسهولة في الهضم مقارنة بهضم الشعير العادي. مميزات الشعير المجروش: سهولة توفره في جميع المحطات، سهل التخزين.',
    category: 'Barley',
    productType: 'Whole',
    size: 40,
    bestseller: true,
    arrivalDate: '2025-03-03', // Last week
    isDiscounted: true,
    inStock: false,
  },
  {
    _id: '3',
    name_en: 'Barley 40 Kg - UFC',
    name_ar: 'شعير 40 كجم - UFC',
    image: [feedBag5, feedBagD5],
    stars: 4.6,
    price: 45.4,
    description_en:
      'A product consisting of nutrient-rich granules, providing animals with a healthy and sound structure. Cost-effective for consumers. Features of whole barley: Easily available at all stations, easy to store.',
    description_ar:
      'منتج عبارة عن حبيبات غنية بالقيم الغذائية، تمد الحيوانات ببنية صحية وسليمة. ذو تكلفة منخفضة على المستهلك. مميزات شعير الحب الكامل: سهولة توفره في جميع المحطات، سهل التخزين.',
    category: 'Barley',
    productType: 'Whole',
    size: 40,
    bestseller: true,
    arrivalDate: '2025-02-15', // This month (February)
    isDiscounted: false,
    inStock: true,
  },
  {
    _id: '4',
    name_en: 'Barley 50 Kg - UFC',
    name_ar: 'شعير 50 كجم - UFC',
    image: [feedBag6, feedBagD5],
    stars: 4.9,
    price: 54.2,
    description_en:
      'A product consisting of nutrient-rich granules, providing animals with a healthy and sound structure. Cost-effective for consumers. Features of whole barley: Easily available at all stations, easy to store.',
    description_ar:
      'منتج عبارة عن حبيبات غنية بالقيم الغذائية، تمد الحيوانات ببنية صحية وسليمة. ذو تكلفة منخفضة على المستهلك. مميزات شعير الحب الكامل: سهولة توفره في جميع المحطات، سهل التخزين.',
    category: 'Barley',
    productType: 'Whole',
    size: 50,
    bestseller: true,
    arrivalDate: '2025-03-08', // This week
    isDiscounted: true,
    inStock: true,
  },
  {
    _id: '5',
    name_en: 'Barley 40 Kg - AL Rai',
    name_ar: 'شعير 40 كجم - الراعي',
    image: [feedBag2, feedBagD2],
    stars: 5,
    price: 105.4,
    description_en:
      'A product consisting of nutrient-rich granules, providing animals with a healthy and sound structure. Cost-effective for consumers. Features of whole barley: Easily available at all stations, easy to store.',
    description_ar:
      'منتج عبارة عن حبيبات غنية بالقيم الغذائية، تمد الحيوانات ببنية صحية وسليمة. ذو تكلفة منخفضة على المستهلك. مميزات شعير الحب الكامل: سهولة توفره في جميع المحطات، سهل التخزين.',
    category: 'Barley',
    productType: 'Whole',
    size: 40,
    bestseller: true,
    arrivalDate: '2025-03-01', // Last week
    isDiscounted: false,
    inStock: false,
  },
  {
    _id: '6',
    name_en: 'Barley 60 Kg - AL Rai',
    name_ar: 'شعير 60 كجم - الراعي',
    image: [feedBag3, feedBagD3],
    stars: 5,
    price: 185.8,
    description_en:
      'A product consisting of nutrient-rich granules, providing animals with a healthy and sound structure. Cost-effective for consumers. Features of whole barley: Easily available at all stations, easy to store.',
    description_ar:
      'منتج عبارة عن حبيبات غنية بالقيم الغذائية، تمد الحيوانات ببنية صحية وسليمة. ذو تكلفة منخفضة على المستهلك. مميزات شعير الحب الكامل: سهولة توفره في جميع المحطات، سهل التخزين.',
    category: 'Barley',
    productType: 'Whole',
    size: 60,
    bestseller: false,
    arrivalDate: '2025-02-10', // This month (February)
    isDiscounted: true,
    inStock: true,
  },
  {
    _id: '7',
    name_en: 'Barley 100 Kg - UFC',
    name_ar: 'شعير 100 كجم - UFC',
    image: [feedBag3, feedBagD3],
    stars: 4.1,
    price: 203,
    description_en:
      'A product consisting of nutrient-rich granules, providing animals with a healthy and sound structure. Cost-effective for consumers. Features of whole barley: Easily available at all stations, easy to store.',
    description_ar:
      'منتج عبارة عن حبيبات غنية بالقيم الغذائية، تمد الحيوانات ببنية صحية وسليمة. ذو تكلفة منخفضة على المستهلك. مميزات شعير الحب الكامل: سهولة توفره في جميع المحطات، سهل التخزين.',
    category: 'Barley',
    productType: 'Whole',
    size: 100,
    bestseller: false,
    arrivalDate: '2025-01-15', // Older
    isDiscounted: false,
    inStock: false,
  },
  {
    _id: '8',
    name_en: 'Barley 100 Kg',
    name_ar: 'شعير 100 كجم',
    image: [feedBag3, feedBagD3],
    stars: 4.7,
    price: 173,
    description_en:
      'A product consisting of nutrient-rich granules, providing animals with a healthy and sound structure. Cost-effective for consumers. Features of whole barley: Easily available at all stations, easy to store.',
    description_ar:
      'منتج عبارة عن حبيبات غنية بالقيم الغذائية، تمد الحيوانات ببنية صحية وسليمة. ذو تكلفة منخفضة على المستهلك. مميزات شعير الحب الكامل: سهولة توفره في جميع المحطات، سهل التخزين.',
    category: 'Barley',
    productType: 'Whole',
    size: 100,
    bestseller: false,
    arrivalDate: '2025-01-20', // Older
    isDiscounted: true,
    inStock: true,
  },
  // Corn products
  {
    _id: '9',
    name_en: 'Corn 50 Kg',
    name_ar: 'ذرة 50 كجم',
    image: [feedBag2, feedBagD2],
    stars: 4.5,
    price: 65.0,
    description_en:
      'Corn granules rich in nutritional value, providing animals with a healthy and sound structure.',
    description_ar:
      'حبيبات الذرة غنية بالقيم الغذائية، توفر للحيوانات بنية صحية وسليمة.',
    category: 'Corn',
    productType: 'Whole',
    size: 50,
    bestseller: false,
    arrivalDate: '2025-03-09', // This week
    isDiscounted: false,
    inStock: true,
  },
  {
    _id: '10',
    name_en: 'Corn 40 Kg',
    name_ar: 'ذرة 40 كجم',
    image: [feedBag3, feedBagD3],
    stars: 4.0,
    price: 50.0,
    description_en:
      'Corn granules rich in nutritional value, providing animals with a healthy and sound structure.',
    description_ar:
      'حبيبات الذرة غنية بالقيم الغذائية، توفر للحيوانات بنية صحية وسليمة.',
    category: 'Corn',
    productType: 'Whole',
    size: 40,
    bestseller: false,
    arrivalDate: '2025-03-02', // Last week
    isDiscounted: true,
    inStock: true,
  },
  // Soya products
  {
    _id: '11',
    name_en: 'Soya 50 Kg',
    name_ar: 'صويا 50 كجم',
    image: [feedBag4, feedBagD4],
    stars: 4.8,
    price: 75.0,
    description_en:
      'Soya granules rich in nutritional value, providing animals with a healthy and sound structure.',
    description_ar:
      'حبيبات الصويا غنية بالقيم الغذائية، توفر للحيوانات بنية صحية وسليمة.',
    category: 'Soya',
    productType: 'Whole',
    size: 50,
    bestseller: false,
    arrivalDate: '2025-02-20', // This month (February)
    isDiscounted: false,
    inStock: true,
  },
  {
    _id: '12',
    name_en: 'Soya 40 Kg',
    name_ar: 'صويا 40 كجم',
    image: [feedBag5, feedBagD5],
    stars: 4.2,
    price: 60.0,
    description_en:
      'Soya granules rich in nutritional value, providing animals with a healthy and sound structure.',
    description_ar:
      'حبيبات الصويا غنية بالقيم الغذائية، توفر للحيوانات بنية صحية وسليمة.',
    category: 'Soya',
    productType: 'Whole',
    size: 40,
    bestseller: false,
    arrivalDate: '2025-03-07', // This week
    isDiscounted: true,
    inStock: true,
  },
  // Wheat products
  {
    _id: '13',
    name_en: 'Wheat 50 Kg',
    name_ar: 'قمح 50 كجم',
    image: [feedBag6, feedBagD5],
    stars: 4.3,
    price: 55.0,
    description_en:
      'Wheat granules rich in nutritional value, providing animals with a healthy and sound structure.',
    description_ar:
      'حبيبات القمح غنية بالقيم الغذائية، توفر للحيوانات بنية صحية وسليمة.',
    category: 'Wheat',
    productType: 'Whole',
    size: 50,
    bestseller: false,
    arrivalDate: '2025-03-05', // This week
    isDiscounted: false,
    inStock: true,
  },
  {
    _id: '14',
    name_en: 'Wheat 40 Kg',
    name_ar: 'قمح 40 كجم',
    image: [feedBag2, feedBagD2],
    stars: 4.0,
    price: 45.0,
    description_en:
      'Wheat granules rich in nutritional value, providing animals with a healthy and sound structure.',
    description_ar:
      'حبيبات القمح غنية بالقيم الغذائية، توفر للحيوانات بنية صحية وسليمة.',
    category: 'Wheat',
    productType: 'Whole',
    size: 40,
    bestseller: false,
    arrivalDate: '2025-02-25', // This month (February)
    isDiscounted: true,
    inStock: true,
  },
  // Additional Barley products
  {
    _id: '15',
    name_en: 'Barley 60 Kg - UFC',
    name_ar: 'شعير 60 كجم - UFC',
    image: [feedBag4, feedBagD4],
    stars: 4.4,
    price: 70.0,
    description_en:
      'A product consisting of nutrient-rich granules, providing animals with a healthy and sound structure. Cost-effective for consumers.',
    description_ar:
      'منتج عبارة عن حبيبات غنية بالقيم الغذائية، تمد الحيوانات ببنية صحية وسليمة. ذو تكلفة منخفضة على المستهلك.',
    category: 'Barley',
    productType: 'Loose',
    size: 60,
    bestseller: false,
    arrivalDate: '2025-03-12', // This week
    isDiscounted: false,
    inStock: true,
  },
  {
    _id: '16',
    name_en: 'Barley 50 Kg - Premium',
    name_ar: 'شعير 50 كجم - بريميوم',
    image: [feedBag5, feedBagD5],
    stars: 4.8,
    price: 58.0,
    description_en:
      'A product consisting of nutrient-rich granules, providing animals with a healthy and sound structure. Cost-effective for consumers.',
    description_ar:
      'منتج عبارة عن حبيبات غنية بالقيم الغذائية، تمد الحيوانات ببنية صحية وسليمة. ذو تكلفة منخفضة على المستهلك.',
    category: 'Barley',
    productType: 'Whole',
    size: 50,
    bestseller: true,
    arrivalDate: '2025-03-01', // Last week
    isDiscounted: true,
    inStock: true,
  },
  // Additional Corn products
  {
    _id: '17',
    name_en: 'Corn 60 Kg - AL Rai',
    name_ar: 'ذرة 60 كجم - الراعي',
    image: [feedBag6, feedBagD5],
    stars: 4.2,
    price: 80.0,
    description_en:
      'Corn granules rich in nutritional value, providing animals with a healthy and sound structure.',
    description_ar:
      'حبيبات الذرة غنية بالقيم الغذائية، توفر للحيوانات بنية صحية وسليمة.',
    category: 'Corn',
    productType: 'Loose',
    size: 60,
    bestseller: false,
    arrivalDate: '2025-02-28', // This month (February)
    isDiscounted: false,
    inStock: true,
  },
  {
    _id: '18',
    name_en: 'Corn 100 Kg',
    name_ar: 'ذرة 100 كجم',
    image: [feedBag2, feedBagD2],
    stars: 4.6,
    price: 120.0,
    description_en:
      'Corn granules rich in nutritional value, providing animals with a healthy and sound structure.',
    description_ar:
      'حبيبات الذرة غنية بالقيم الغذائية، توفر للحيوانات بنية صحية وسليمة.',
    category: 'Corn',
    productType: 'Whole',
    size: 100,
    bestseller: false,
    arrivalDate: '2025-01-10', // Older
    isDiscounted: true,
    inStock: true,
  },
  // Additional Soya products
  {
    _id: '19',
    name_en: 'Soya 60 Kg - UFC',
    name_ar: 'صويا 60 كجم - UFC',
    image: [feedBag3, feedBagD3],
    stars: 4.7,
    price: 85.0,
    description_en:
      'Soya granules rich in nutritional value, providing animals with a healthy and sound structure.',
    description_ar:
      'حبيبات الصويا غنية بالقيم الغذائية، توفر للحيوانات بنية صحية وسليمة.',
    category: 'Soya',
    productType: 'Loose',
    size: 60,
    bestseller: false,
    arrivalDate: '2025-03-11', // This week
    isDiscounted: false,
    inStock: true,
  },
  {
    _id: '20',
    name_en: 'Soya 100 Kg',
    name_ar: 'صويا 100 كجم',
    image: [feedBag4, feedBagD4],
    stars: 4.3,
    price: 150.0,
    description_en:
      'Soya granules rich in nutritional value, providing animals with a healthy and sound structure.',
    description_ar:
      'حبيبات الصويا غنية بالقيم الغذائية، توفر للحيوانات بنية صحية وسليمة.',
    category: 'Soya',
    productType: 'Whole',
    size: 100,
    bestseller: false,
    arrivalDate: '2025-02-15', // This month (February)
    isDiscounted: true,
    inStock: true,
  },
  // Additional Wheat products
  {
    _id: '21',
    name_en: 'Wheat 60 Kg - AL Rai',
    name_ar: 'قمح 60 كجم - الراعي',
    image: [feedBag5, feedBagD5],
    stars: 4.5,
    price: 65.0,
    description_en:
      'Wheat granules rich in nutritional value, providing animals with a healthy and sound structure.',
    description_ar:
      'حبيبات القمح غنية بالقيم الغذائية، توفر للحيوانات بنية صحية وسليمة.',
    category: 'Wheat',
    productType: 'Loose',
    size: 60,
    bestseller: false,
    arrivalDate: '2025-03-06', // This week
    isDiscounted: false,
    inStock: true,
  },
  {
    _id: '22',
    name_en: 'Wheat 100 Kg - UFC',
    name_ar: 'قمح 100 كجم - UFC',
    image: [feedBag6, feedBagD5],
    stars: 4.1,
    price: 110.0,
    description_en:
      'Wheat granules rich in nutritional value, providing animals with a healthy and sound structure.',
    description_ar:
      'حبيبات القمح غنية بالقيم الغذائية، توفر للحيوانات بنية صحية وسليمة.',
    category: 'Wheat',
    productType: 'Whole',
    size: 100,
    bestseller: false,
    arrivalDate: '2025-01-25', // Older
    isDiscounted: true,
    inStock: true,
  },
  // Additional products for variety
  {
    _id: '23',
    name_en: 'AL Murrah Gold',
    name_ar: 'المرة الذهبية',
    image: [feedBag2, feedBagD2],
    stars: 0,
    price: 50.44,
    description_en:
      'Premium feed product rich in nutritional value, providing animals with a healthy and sound structure.',
    description_ar:
      'منتج علف فاخر غني بالقيم الغذائية، يوفر للحيوانات بنية صحية وسليمة.',
    category: 'Barley',
    productType: 'Whole',
    size: 50,
    bestseller: true,
    arrivalDate: '2025-03-10', // This week
    isDiscounted: false,
    inStock: true,
  },
  {
    _id: '24',
    name_en: 'Corn 50 Kg - Premium',
    name_ar: 'ذرة 50 كجم - بريميوم',
    image: [feedBag3, feedBagD3],
    stars: 4.9,
    price: 70.0,
    description_en:
      'Corn granules rich in nutritional value, providing animals with a healthy and sound structure.',
    description_ar:
      'حبيبات الذرة غنية بالقيم الغذائية، توفر للحيوانات بنية صحية وسليمة.',
    category: 'Corn',
    productType: 'Whole',
    size: 50,
    bestseller: true,
    arrivalDate: '2025-03-08', // This week
    isDiscounted: false,
    inStock: true,
  },
  {
    _id: '25',
    name_en: 'Soya 40 Kg - AL Rai',
    name_ar: 'صويا 40 كجم - الراعي',
    image: [feedBag4, feedBagD4],
    stars: 4.0,
    price: 55.0,
    description_en:
      'Soya granules rich in nutritional value, providing animals with a healthy and sound structure.',
    description_ar:
      'حبيبات الصويا غنية بالقيم الغذائية، توفر للحيوانات بنية صحية وسليمة.',
    category: 'Soya',
    productType: 'Loose',
    size: 40,
    bestseller: false,
    arrivalDate: '2025-02-10', // This month (February)
    isDiscounted: true,
    inStock: true,
  },
];