/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, ProductReview } from '../types';

// Helper to generate realistic customer reviews
const generateReviews = (productId: string, productName: string, avgRating: number): ProductReview[] => {
  const reviewsData = [
    { name: 'John K.', comment: `Absolutely loving this ${productName}! The build quality is top-notch and it exceeds expectations.`, ratings: [5, 4] },
    { name: 'Sarah M.', comment: `Great value for money. Delivery was fast and the packaging was super secure. Highly recommend ShopEase!`, ratings: [5, 5] },
    { name: 'David O.', comment: `Decent product, does what it says. Had a minor delay in delivery but the customer support was extremely helpful.`, ratings: [4, 3] },
    { name: 'Grace W.', comment: `Perfect addition to my routine. Very premium feel and works flawlessly. A solid 5 stars!`, ratings: [5, 5] },
    { name: 'Michael N.', comment: `Good, but could be slightly improved in terms of documentation. Otherwise, excellent product.`, ratings: [4, 4] },
    { name: 'Amina A.', comment: `Incredibly fast shipping to Mombasa! The quality of this is stunning. Exquisite design.`, ratings: [5, 5] },
    { name: 'Kevin O.', comment: `I am very pleased with this purchase. The ShopEase Paybill payment was simple and seamless.`, ratings: [5, 4] }
  ];

  // Pick a subset of reviews based on product ID to make them varied
  const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const reviewCount = 3 + (hash % 4); // 3 to 6 reviews
  const reviews: ProductReview[] = [];

  for (let i = 0; i < reviewCount; i++) {
    const dataIndex = (hash + i) % reviewsData.length;
    const reviewTemplate = reviewsData[dataIndex];
    const rating = Math.min(5, Math.max(1, Math.round(avgRating) + (hash % 2 === 0 ? 1 : -1) * (i % 2)));
    reviews.push({
      id: `${productId}-rev-${i}`,
      userName: reviewTemplate.name,
      rating: rating,
      comment: reviewTemplate.comment,
      date: new Date(2026, 5, 20 - (i * 3)).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })
    });
  }

  return reviews;
};

const ELECTRONICS_IMAGES = [
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80', // smartwatch
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80', // headphones
  'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80', // monitor
  'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80', // tablet
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80', // phone
  'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80', // speaker
  'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80', // laptop
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80', // camera
  'https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?w=600&auto=format&fit=crop&q=80', // powerbank
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80', // keyboard
];

const FASHION_IMAGES = [
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop&q=80', // t-shirt
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80', // red shoes
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80', // sneakers
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80', // heels
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80', // leather jacket
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80', // sweater
  'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600&auto=format&fit=crop&q=80', // backpack
  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80', // black tee
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80', // hoodie
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80', // designer coat
];

const HOME_IMAGES = [
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop&q=80', // modern bed
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80', // green sofa
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80', // desk lamp
  'https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=600&auto=format&fit=crop&q=80', // towels
  'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=80', // dining chair
  'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&auto=format&fit=crop&q=80', // plants pot
  'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop&q=80', // coffee maker
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80', // kitchen utensils
  'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&auto=format&fit=crop&q=80', // minimalist vase
  'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&auto=format&fit=crop&q=80', // armchair
];

const FITNESS_IMAGES = [
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80', // gym weights
  'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=80', // yoga mat
  'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80', // resistance bands
  'https://images.unsplash.com/photo-1517598024396-46c53fb391a1?w=600&auto=format&fit=crop&q=80', // boxing gloves
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80', // skipping rope
  'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=600&auto=format&fit=crop&q=80', // dumbbells
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80', // ab roller
  'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&auto=format&fit=crop&q=80', // smart scale
  'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&auto=format&fit=crop&q=80', // running shoes
  'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=600&auto=format&fit=crop&q=80', // sports bottle
];

const BEAUTY_IMAGES = [
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80', // makeup brushes
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80', // skin cream
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&auto=format&fit=crop&q=80', // serum bottle
  'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80', // lipstick pack
  'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&auto=format&fit=crop&q=80', // hair oil
  'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80', // shampoo
  'https://images.unsplash.com/photo-1608248597481-496100c8c836?w=600&auto=format&fit=crop&q=80', // perfume
  'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop&q=80', // face mask
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&auto=format&fit=crop&q=80', // bath salts
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80', // foundation cream
];

// List of all products templates to expand into 50 products
const productsData = [
  // Electronics (10 items)
  {
    id: 'el-1',
    name: 'AeroPulse Active Smartwatch',
    price: 8500,
    discountPrice: 12000,
    category: 'Electronics',
    brand: 'AeroPulse',
    rating: 4.8,
    reviewsCount: 142,
    imageIndex: 0,
    description: 'Track your health and daily life with the AeroPulse Active Smartwatch. Featuring a vibrant 1.83" AMOLED touch screen, 14-day battery life, real-time heart rate monitoring, sleep analysis, blood oxygen tracking, and 100+ sport modes. Water-resistant up to 50 meters, perfect for workouts or outdoor adventures.',
    features: ['1.83" AMOLED Touch Display', 'Up to 14 days battery life', '5ATM Water Resistance', 'SpO2 & Heart Rate Tracker'],
    specifications: { 'Screen Size': '1.83 inch', 'Battery Capacity': '320 mAh', 'Bluetooth': 'v5.2', 'Compatible OS': 'iOS & Android' },
    stock: 25,
    deliveryEstimate: '1 - 2 business days',
    isBestSeller: true
  },
  {
    id: 'el-2',
    name: 'SyncAudio Pro Wireless Headphones',
    price: 15400,
    discountPrice: 19500,
    category: 'Electronics',
    brand: 'SyncAudio',
    rating: 4.9,
    reviewsCount: 98,
    imageIndex: 1,
    description: 'Immerse yourself in acoustic perfection. The SyncAudio Pro offers hybrid active noise cancelling (ANC) up to 40dB, high-fidelity spatial sound, and deep dynamic bass. Equipped with dual beamforming microphones for crystal-clear calls and soft protein leather memory-foam ear cushions for all-day comfort.',
    features: ['Hybrid Active Noise Cancelling', '40-Hour Playback Time', 'Dual Mic ENC Call Clarity', 'Bluetooth 5.3 Multipoint Connection'],
    specifications: { 'Driver Size': '40 mm', 'Battery Life': '40 Hours (ANC Off)', 'Charging Type': 'USB-C Fast Charging', 'Weight': '260g' },
    stock: 14,
    isNew: true
  },
  {
    id: 'el-3',
    name: 'UltraView 27" 4K Curved Monitor',
    price: 42000,
    category: 'Electronics',
    brand: 'UltraView',
    rating: 4.6,
    reviewsCount: 56,
    imageIndex: 2,
    description: 'Experience stunning visuals with the UltraView 27" Curved Monitor. Featuring a 1500R curvature that matches human field of vision, 4K UHD resolution (3840x2160), 144Hz refresh rate, and HDR10 support. Perfect for video editors, graphic designers, and hardcore gaming enthusiasts alike.',
    features: ['1500R Curvature Panel', 'UHD 4K Resolution', '144Hz Smooth Refresh Rate', 'HDR10 Support & 99% sRGB'],
    specifications: { 'Aspect Ratio': '16:9', 'Brightness': '350 nits', 'Response Time': '1ms MPRT', 'Input Ports': '2x HDMI, 1x DisplayPort' },
    stock: 8,
    isPopular: true
  },
  {
    id: 'el-4',
    name: 'ApexTab Air 10.9" Tablet',
    price: 34500,
    discountPrice: 38000,
    category: 'Electronics',
    brand: 'Apex',
    rating: 4.7,
    reviewsCount: 88,
    imageIndex: 3,
    description: 'Ultra-thin, ultra-powerful. The ApexTab Air features an elegant aluminum unibody, a gorgeous Liquid Retina display with True Tone technology, and a powerful octa-core chipset. Excellent for dynamic productivity, digital sketching, media viewing, and fast multi-tasking.',
    features: ['Liquid Retina True Tone Display', 'Fast Octa-core Processor', 'Quad Speakers Dolby Atmos', 'Stylus Pen Compatible'],
    specifications: { 'Storage': '128 GB (Expandable)', 'RAM': '8 GB', 'Rear Camera': '12 MP Wide', 'Front Camera': '8 MP Ultra-Wide' },
    stock: 19,
    deliveryEstimate: '1 - 3 business days'
  },
  {
    id: 'el-5',
    name: 'Vortex X50 5G Smartphone',
    price: 49999,
    discountPrice: 58000,
    category: 'Electronics',
    brand: 'Vortex',
    rating: 4.7,
    reviewsCount: 215,
    imageIndex: 4,
    description: 'Step into the 5G future. Boasting a flagship-grade triple camera setup with a 108MP main sensor, 120Hz Super AMOLED display, and blazing-fast 67W Turbo Charging. Stay connected with robust, lightning-fast 5G bands and experience gaming without any lag.',
    features: ['108MP Ultra-Clear Triple Camera', '120Hz Super AMOLED Screen', '67W Turbo Charging (0-100% in 45 mins)', 'Dual Stereo Speakers'],
    specifications: { 'Battery': '5000 mAh', 'OS': 'Android 14', 'Chipset': 'Dimensity 7050 5G', 'Security': 'In-display Fingerprint' },
    stock: 22,
    isBestSeller: true
  },
  {
    id: 'el-6',
    name: 'SonicBounce Waterproof Bluetooth Speaker',
    price: 6800,
    category: 'Electronics',
    brand: 'SonicBounce',
    rating: 4.5,
    reviewsCount: 110,
    imageIndex: 5,
    description: 'Bring the party anywhere. The SonicBounce wireless speaker delivers rich 360-degree sound with powerful dual-bass radiators. Fully IPX7 waterproof, it survives rain, spills, or complete submersion. Its 20-hour battery life keeps the music playing from dusk to dawn.',
    features: ['IPX7 Waterproof & Dustproof', '360° Immersive Sound', 'Up to 20 Hours Battery Life', 'PartyConnect wireless sync'],
    specifications: { 'Power Output': '24W', 'Bluetooth Range': '30 meters', 'Weight': '450g', 'Input': 'Bluetooth, AUX, MicroSD' },
    stock: 45,
    deliveryEstimate: 'Same day delivery'
  },
  {
    id: 'el-7',
    name: 'ZenBook Slim 14" Premium Laptop',
    price: 98000,
    category: 'Electronics',
    brand: 'ZenBook',
    rating: 4.9,
    reviewsCount: 42,
    imageIndex: 6,
    description: 'Designed for professionals on the move. The ZenBook Slim weighs only 1.1kg and features the latest Gen Intel Core i7 processor, 16GB LPDDR5 RAM, and a blistering fast 512GB PCIe SSD. Experience the spectacular Pantone-validated OLED display with rich colors.',
    features: ['Intel Evo Core i7 Processor', 'Spectacular OLED Pantone Display', 'Only 1.1kg Ultra-Portable Weight', '18-Hour Long-Lasting Battery'],
    specifications: { 'RAM': '16 GB LPDDR5', 'Storage': '512 GB PCIe NVMe', 'Resolution': '2.8K (2880 x 1800)', 'Ports': '2x Thunderbolt 4, HDMI' },
    stock: 5,
    isNew: true
  },
  {
    id: 'el-8',
    name: 'Lumix Alpha mirrorless 4K Camera',
    price: 115000,
    discountPrice: 130000,
    category: 'Electronics',
    brand: 'Lumix',
    rating: 4.8,
    reviewsCount: 23,
    imageIndex: 7,
    description: 'Create cinematic masterpieces with ease. Featuring a high-speed 24.2MP APS-C sensor, hybrid auto-focus with AI eye tracking, and uncropped 4K video recording up to 60fps. Built-in 5-axis image stabilization ensures silky-smooth vlogging and photography.',
    features: ['24.2 MP APS-C High-Speed Sensor', 'Uncropped 4K/60fps Recording', 'AI Eye & Subject Auto-Tracking', '5-Axis Sensor-Shift Stabilization'],
    specifications: { 'Lens Mount': 'E-Mount', 'ISO Range': '100 - 32000', 'Screen': '3-inch Vari-angle Touchscreen', 'Wifi': 'Yes' },
    stock: 3,
    isPopular: true
  },
  {
    id: 'el-9',
    name: 'VoltSafe Pro 20000mAh Power Bank',
    price: 3200,
    category: 'Electronics',
    brand: 'VoltSafe',
    rating: 4.5,
    reviewsCount: 312,
    imageIndex: 8,
    description: 'Never run out of power. The VoltSafe Pro packs a huge 20,000mAh capacity inside an elegant, fire-resistant shell. Delivers fast 22.5W Power Delivery (PD 3.0) charge via USB-C, letting you charge three devices simultaneously. Safe for airline travel.',
    features: ['22.5W USB-C Power Delivery', 'Charge 3 Devices Simultaneously', 'High-density Li-Polymer Cells', 'LED Digital Battery Display'],
    specifications: { 'Capacity': '20,000 mAh', 'Inputs': 'USB-C & Micro-USB', 'Outputs': '1x USB-C, 2x USB-A', 'Protection': 'Over-charge, short-circuit' },
    stock: 120,
    deliveryEstimate: 'Same day delivery'
  },
  {
    id: 'el-10',
    name: 'KeyCraft RGB Mechanical Keyboard',
    price: 7500,
    discountPrice: 9000,
    category: 'Electronics',
    brand: 'KeyCraft',
    rating: 4.7,
    reviewsCount: 74,
    imageIndex: 9,
    description: 'Write with precision. KeyCraft mechanical keyboard features durable hot-swappable brown tactile switches, sound-dampening foam inserts, double-shot PBT keycaps, and a brilliant per-key RGB backlight with 18 customizable patterns. Ideal for typing or gaming.',
    features: ['Hot-swappable Tactile Switches', 'Pre-lubed stabilizers & Sound foam', 'Per-key Customizable RGB Backlight', 'Wired, 2.4GHz & Bluetooth triple modes'],
    specifications: { 'Layout': '75% Compact', 'Switch Life': '50 Million keystrokes', 'Cable': 'Detachable USB-C', 'Battery': '4000 mAh' },
    stock: 32,
    isNew: true
  },

  // Fashion (10 items)
  {
    id: 'fa-1',
    name: 'UrbanClassic Cotton Crewneck Tee',
    price: 1200,
    discountPrice: 1800,
    category: 'Fashion',
    brand: 'UrbanClassic',
    rating: 4.4,
    reviewsCount: 189,
    imageIndex: 0,
    description: 'The ultimate casual staple. Crafted from 100% premium long-staple combed cotton, this crewneck t-shirt offers unparalleled breathability and softness. Designed with a perfect modern regular fit that holds its shape wash after wash without shrinking.',
    features: ['100% Combed Premium Cotton', 'Pre-shrunk against shrinkage', 'Reinforced double-stitch neck seam', 'Eco-friendly breathable dye'],
    specifications: { 'Material': '100% Cotton', 'Fit': 'Regular Fit', 'Sleeve': 'Short Sleeve', 'Origin': 'Made in Kenya' },
    stock: 150,
    deliveryEstimate: 'Same day delivery'
  },
  {
    id: 'fa-2',
    name: 'StridePro Dynamic Running Shoes',
    price: 6500,
    discountPrice: 8500,
    category: 'Fashion',
    brand: 'StridePro',
    rating: 4.8,
    reviewsCount: 95,
    imageIndex: 1,
    description: 'Elevate your daily runs. Designed with our proprietary CloudBounce foam midsole, these running shoes offer amazing responsive rebound and joint protection. The knit engineered mesh upper provides exceptional airflow, keeping your feet dry and cool.',
    features: ['CloudBounce Energetic Midsole', 'Knit Mesh Ultra-Breathable Upper', 'High-abrasion rubber traction grip', 'Comfortable OrthoLite sockliner'],
    specifications: { 'Surface': 'Road/Track', 'Weight': '240g', 'Support': 'Neutral Stability', 'Closure': 'Lace-up' },
    stock: 45,
    isBestSeller: true
  },
  {
    id: 'fa-3',
    name: 'Vanguard Streetwear Sneaker',
    price: 5200,
    category: 'Fashion',
    brand: 'Vanguard',
    rating: 4.6,
    reviewsCount: 112,
    imageIndex: 2,
    description: 'Set the trend. Combining minimalist retro-court looks with contemporary streetwear details, these leather sneakers feature a durable rubber cupsole and cushioned collar. Easy to style with raw denim or tailored trousers for an effortlessly cool look.',
    features: ['Genuine Soft Action Leather Upper', 'Flexible Rubber Cupsole', 'Cushioned Tongue & Collar', 'Minimalist Clean Aesthetics'],
    specifications: { 'Material': 'Action Leather & Suede', 'Sole': 'Anti-slip Rubber', 'Style': 'Low-top Court', 'Sizes': '38 to 45' },
    stock: 28,
    isPopular: true
  },
  {
    id: 'fa-4',
    name: 'Aura Suede Stiletto Heels',
    price: 4800,
    discountPrice: 6000,
    category: 'Fashion',
    brand: 'Aura',
    rating: 4.5,
    reviewsCount: 61,
    imageIndex: 3,
    description: 'Elegant confidence. These timeless stiletto heels are wrapped in velvety soft premium vegan suede. Handcrafted with a dual-density memory foam insole and reinforced arch support to ensure you can walk gracefully and comfortably throughout the evening.',
    features: ['Velvety Premium Vegan Suede', 'Dual-density Memory Foam Insole', 'Slip-resistant durable outsole', 'Elegant slender 8.5cm heel height'],
    specifications: { 'Heel Height': '8.5 cm', 'Upper': 'Vegan Suede', 'Lining': 'Breathable Faux Leather', 'Color': 'Teal/Classic' },
    stock: 12,
    deliveryEstimate: '1 - 2 business days'
  },
  {
    id: 'fa-5',
    name: 'BikerX Genuine Leather Jacket',
    price: 18500,
    category: 'Fashion',
    brand: 'BikerX',
    rating: 4.9,
    reviewsCount: 38,
    imageIndex: 4,
    description: 'The epitome of classic cool. Tailored from premium full-grain sheepskin leather, this jacket breaks in beautifully over time, forming to your unique silhouette. Accented with heavy-duty YKK gunmetal zippers, snap buttons, and a silky polyester lining.',
    features: ['100% Genuine Full-grain Sheepskin', 'Premium YKK Zippers & Snaps', 'Action-back shoulder pleats', 'Three zipped pockets, one interior'],
    specifications: { 'Shell': 'Sheepskin Leather', 'Lining': 'Satin Polyester', 'Hardware': 'Gunmetal Alloy', 'Fit': 'Slim Biker Fit' },
    stock: 6,
    isNew: true
  },
  {
    id: 'fa-6',
    name: 'CozyWoven Knit Cable Sweater',
    price: 2900,
    category: 'Fashion',
    brand: 'CozyWoven',
    rating: 4.5,
    reviewsCount: 52,
    imageIndex: 5,
    description: 'Embrace chilly weather in complete warmth. This thick cable knit sweater features a classic fisherman braid pattern, ribbed mock collar, cuffs, and hem. Knit with a premium wool-acrylic blend that provides cloud-like softness without any itchiness.',
    features: ['Premium non-itchy wool-blend knit', 'Authentic Cable Braid Patterns', 'Ribbed cuffs & mock neck detailing', 'Warm and heavyweight design'],
    specifications: { 'Material': '30% Wool, 70% Soft Acrylic', 'Care': 'Hand wash only / Dry flat', 'Fit': 'Relaxed Fit', 'Thickness': 'Heavy' },
    stock: 40
  },
  {
    id: 'fa-7',
    name: 'VenturePro 30L Travel Backpack',
    price: 4500,
    discountPrice: 5500,
    category: 'Fashion',
    brand: 'VenturePro',
    rating: 4.7,
    reviewsCount: 144,
    imageIndex: 6,
    description: 'Your reliable travel companion. Made from ultra-durable 1200D water-repellent ballistic nylon, it features a padded 16-inch laptop compartment, a hidden anti-theft pocket, and a smart luggage strap that slides easily over suitcase handles.',
    features: ['1200D Ballistic Water-repellent Nylon', 'Dedicated Padded 16" Laptop Sleeve', 'Hidden Anti-theft Passport Pocket', 'Luggage strap & USB charging port'],
    specifications: { 'Capacity': '30 Liters', 'Dimensions': '48 x 32 x 18 cm', 'Weight': '850g', 'Zippers': 'Waterproof SBS' },
    stock: 55,
    isPopular: true
  },
  {
    id: 'fa-8',
    name: 'Minimalist Signature Black Tee',
    price: 1500,
    category: 'Fashion',
    brand: 'UrbanClassic',
    rating: 4.6,
    reviewsCount: 93,
    imageIndex: 7,
    description: 'Understated elegance. A heavier weight t-shirt crafted for a perfect boxy silhouette. Made of dense combed cotton that drapes beautifully over the torso, creating a clean premium architectural drape. An essential base layer.',
    features: ['Heavyweight 240GSM Organic Cotton', 'Boxy relaxed architectural silhouette', 'Thick ribbed mock neck border', 'Soft silicone washed finish'],
    specifications: { 'Weight': '240 GSM', 'Material': '100% Organic Cotton', 'Fit': 'Boxy Fit', 'Style': 'Streetwear Minimalist' },
    stock: 90
  },
  {
    id: 'fa-9',
    name: 'AeroFleece Comfort Pullover Hoodie',
    price: 3400,
    discountPrice: 4200,
    category: 'Fashion',
    brand: 'AeroFleece',
    rating: 4.7,
    reviewsCount: 121,
    imageIndex: 8,
    description: 'Pure relaxation in clothing form. Our heavy brushback fleece hoodie is thick, warm, and delightfully soft. Built with spacious kangaroo pockets, double-layer hood with metal aglet drawstrings, and snug wide ribbing on the hem and cuffs.',
    features: ['360GSM Heavy Cotton-poly Fleece', 'Double-layered Generous Hood', 'Premium Brushed Fleece interior', 'Kangaroo pocket with reinforced joints'],
    specifications: { 'Fabric': '80% Cotton, 20% Polyester', 'Drawstring': 'Braided with steel aglets', 'Fit': 'Slightly Oversized', 'Warmth': 'High' },
    stock: 65,
    isNew: true
  },
  {
    id: 'fa-10',
    name: 'Savoy Heritage Double-Breasted Coat',
    price: 14500,
    category: 'Fashion',
    brand: 'Savoy',
    rating: 4.8,
    reviewsCount: 19,
    imageIndex: 9,
    description: 'A masterpiece of classic tailoring. The Savoy Heritage Trench Coat is crafted from a warm, textured wool-blend fabric. Featuring structured padded shoulders, tortoiseshell-pattern double-breasted buttons, and a belted waist to create a sharp structural outline.',
    features: ['Thick, windproof textured wool blend', 'Classic tortoiseshell structural buttons', 'Adjustable waist belt with metal buckle', 'Silky branded full interior lining'],
    specifications: { 'Material': '60% Wool, 40% Polyester', 'Length': 'Mid-calf (Overcoat)', 'Lining': 'Satin Viscose', 'Dry Clean': 'Only' },
    stock: 8,
    isPopular: true
  },

  // Home & Kitchen (10 items)
  {
    id: 'ho-1',
    name: 'CloudSlumber Memory Foam Bed Set',
    price: 24000,
    discountPrice: 32000,
    category: 'Home & Kitchen',
    brand: 'CloudSlumber',
    rating: 4.9,
    reviewsCount: 35,
    imageIndex: 0,
    description: 'Sleep on a literal cloud. This premium memory foam mattress topper and orthopaedic bamboo pillow set is designed to alleviate neck, shoulder, and back tension. Highly breathable gel-infused memory foam adapts to your body temperature dynamically.',
    features: ['Gel-infused temperature regulating foam', 'Orthopaedic neck contour support', 'Soft, hypoallergenic bamboo covers', 'Eco-friendly CertiPUR-US certified'],
    specifications: { 'Size': 'Queen (5x6 ft)', 'Thickness': '3 inches topper', 'Hypoallergenic': 'Yes', 'Cover Care': 'Machine Washable' },
    stock: 12,
    isBestSeller: true
  },
  {
    id: 'ho-2',
    name: 'Nordic Velvet Lounger Sofa',
    price: 68000,
    category: 'Home & Kitchen',
    brand: 'NordicHome',
    rating: 4.8,
    reviewsCount: 16,
    imageIndex: 1,
    description: 'Transform your living room into an architectural haven. The Nordic Velvet Lounger features a sleek mid-century silhouette, wrapped in water-resistant, stain-shielded emerald green velvet. Hand-carved solid oak legs provide unwavering support.',
    features: ['Stain-resistant premium velvet', 'Solid timber structural inner frame', 'Hand-carved durable oak legs', 'High-resilience foam seat core'],
    specifications: { 'Dimensions': '180 x 85 x 82 cm', 'Seating Capacity': '3 Adults', 'Fabric Type': 'Performance Velvet', 'Assembly': 'Tool-free' },
    stock: 4,
    isPopular: true
  },
  {
    id: 'ho-3',
    name: 'Lumina Arc Brass Desk Lamp',
    price: 4500,
    discountPrice: 5500,
    category: 'Home & Kitchen',
    brand: 'Lumina',
    rating: 4.6,
    reviewsCount: 41,
    imageIndex: 2,
    description: 'Modern workspace illumination. Featuring an adjustable arched brass neck and a heavy, real marble circular base that prevents tipping. Seamless touch controls allow you to shift between 3 color temperatures and step-less brightness adjustments.',
    features: ['Solid Marble Weighted Base', 'Adjustable Arched Brass Neck', 'Seamless Smart Touch Dimming', 'Eye-safe Flicker-free LED Bulb'],
    specifications: { 'Height': '45 cm', 'Color Temp': '3000K - 6000K', 'Base Diameter': '15 cm', 'Cable Length': '1.8 meters' },
    stock: 22,
    isNew: true
  },
  {
    id: 'ho-4',
    name: 'PlushCotton Zero-Twist Towel Set',
    price: 3800,
    category: 'Home & Kitchen',
    brand: 'PlushCotton',
    rating: 4.7,
    reviewsCount: 89,
    imageIndex: 3,
    description: 'Indulge in 5-star resort luxury at home. This set includes 2 bath towels, 2 hand towels, and 2 face cloths. Woven with 100% long-staple Turkish organic cotton using zero-twist technology for incredible fluffiness and rapid absorption.',
    features: ['100% Organic Turkish Combed Cotton', 'Zero-twist loop fast-drying build', 'Substantial 650GSM luxury thickness', 'Oeko-Tex Certified chemical-free'],
    specifications: { 'GSM': '650', 'Towels Count': '6-Piece Set', 'Towel Sizes': 'Bath (70x140cm), Hand (40x70cm)', 'Origin': 'Turkey' },
    stock: 50,
    deliveryEstimate: 'Same day delivery'
  },
  {
    id: 'ho-5',
    name: 'Eames Silhouette Dining Chair',
    price: 5500,
    discountPrice: 7000,
    category: 'Home & Kitchen',
    brand: 'NordicHome',
    rating: 4.5,
    reviewsCount: 67,
    imageIndex: 4,
    description: 'Ergonomic retro elegance. A beautiful replica of the iconic mid-century modern dining chair. Featuring a robust matte-finished moulded polypropylene seat shell, padded soft faux-leather cushion, and black-braced dowel beechwood legs.',
    features: ['Ergonomic moulded supportive shell', 'Soft padded faux-leather cushion seat', 'Braced solid natural beechwood legs', 'Floor-protecting non-scratch feet caps'],
    specifications: { 'Seat Height': '46 cm', 'Max Weight': '120 kg', 'Shell Material': 'Polypropylene', 'Legs': 'Beechwood' },
    stock: 35
  },
  {
    id: 'ho-6',
    name: 'Terracotta Handcrafted Ceramic Plant Pot',
    price: 2400,
    category: 'Home & Kitchen',
    brand: 'ClayWorks',
    rating: 4.4,
    reviewsCount: 43,
    imageIndex: 5,
    description: 'Give your green companions a stunning home. Hand-thrown by local artisans in Kenya, this natural terracotta pot is fired in wood-fueled kilns. Highly breathable natural clay helps regulate soil moisture, promoting vibrant root growth.',
    features: ['100% Kenyan Hand-thrown Terracotta', 'Breathable natural clay prevents rot', 'Built-in base water drainage hole', 'Includes matching circular clay saucer'],
    specifications: { 'Diameter': '25 cm', 'Height': '22 cm', 'Finish': 'Natural Matte Clay', 'Weight': '2.1 kg' },
    stock: 80,
    deliveryEstimate: 'Same day delivery'
  },
  {
    id: 'ho-7',
    name: 'BaristaPro 15-Bar Espresso Maker',
    price: 36000,
    category: 'Home & Kitchen',
    brand: 'BaristaPro',
    rating: 4.8,
    reviewsCount: 49,
    imageIndex: 6,
    description: 'Master the art of espresso from home. The BaristaPro features a heavy-duty Italian 15-bar electromagnetic pressure pump, a rapid Thermoblock heating system, and a commercial-grade swiveling steam wand for silky micro-foam lattes.',
    features: ['Italian 15-Bar High-Pressure Pump', 'Thermoblock instant water heating', 'Manual Swiveling Steam Milk Wand', 'Removable 1.5L massive water tank'],
    specifications: { 'Wattage': '1350W', 'Housing': 'Brushed Stainless Steel', 'Portafilter': '54mm Professional', 'Pressure Gauge': 'Analog' },
    stock: 10,
    isPopular: true
  },
  {
    id: 'ho-8',
    name: 'ChefCraft 12-Piece Premium Knives Set',
    price: 12500,
    discountPrice: 16000,
    category: 'Home & Kitchen',
    brand: 'ChefCraft',
    rating: 4.7,
    reviewsCount: 112,
    imageIndex: 7,
    description: 'Precision slicing, every time. Forged from high-carbon German steel (X50CrMoV15), these full-tang razor-sharp knives provide incredible edge retention and perfect balance. Set in a gorgeous natural solid walnut wooden block.',
    features: ['High-carbon forged German steel', 'Full-tang steel blade seamless transition', 'Ergonomic triple-riveted dark handles', 'Heavy natural solid walnut storage block'],
    specifications: { 'Steel Type': 'German High Carbon', 'Blade Angle': '15 Degrees', 'Block Material': 'Walnut Wood', 'Set Count': '12 Pieces' },
    stock: 15,
    isNew: true
  },
  {
    id: 'ho-9',
    name: 'ZenStone Minimalist Ceramic Vase',
    price: 3500,
    category: 'Home & Kitchen',
    brand: 'ClayWorks',
    rating: 4.6,
    reviewsCount: 55,
    imageIndex: 8,
    description: 'An elegant statement of empty space. This minimalist donut-shaped ceramic vase features a raw, sandy matte stone texture. Beautiful on its own as a sculptural piece, or paired with a few single sprigs of dry pampas grass or eucalyptus.',
    features: ['Artistic circular donut geometry', 'Unique sandy stone-like matte texture', 'Waterproof inner glaze protective barrier', 'Non-slip foam protective pad on base'],
    specifications: { 'Height': '30 cm', 'Width': '24 cm', 'Material': 'Stoneware Clay', 'Color': 'Warm Sand/Off-white' },
    stock: 30,
    deliveryEstimate: '1 - 2 business days'
  },
  {
    id: 'ho-10',
    name: 'Soren Lounge Velvet Armchair',
    price: 28500,
    category: 'Home & Kitchen',
    brand: 'NordicHome',
    rating: 4.7,
    reviewsCount: 22,
    imageIndex: 9,
    description: 'A cozy corner to read, dream, and live. The Soren Armchair features a deep angled seat with thick premium foam core cushioning. Fabricated in our cloud-soft velvet, and cradled by an elegant matte-black powder-coated steel geometric cradle.',
    features: ['Ergonomic deep-comfort seat pitch', 'Cloud-soft heavy velvet fabric cover', 'Architectural steel frame cradle', 'Stain-guard protective shield coating'],
    specifications: { 'Seat Depth': '58 cm', 'Width': '72 cm', 'Frame': 'Powder-coated Alloy Steel', 'Max Load': '150 kg' },
    stock: 5,
    isPopular: true
  },

  // Fitness (10 items)
  {
    id: 'fi-1',
    name: 'IronForge Hex Dumbbell Set',
    price: 11000,
    discountPrice: 15000,
    category: 'Fitness & Sports',
    brand: 'IronForge',
    rating: 4.8,
    reviewsCount: 76,
    imageIndex: 0,
    description: 'Build core power safely. This dumbbell pair features high-grade cast-iron solid cores encased in heavy-duty commercial virgin rubber. Protects your floors, curbs clattering noise, and will not roll away due to the smart hexagonal shape.',
    features: ['Heavy-duty shock absorbing rubber shell', 'Knurled ergonomic steel grip handle', 'Hexagonal shape resists rolling', 'Friction-welded indestructible joint'],
    specifications: { 'Weight': '10kg x 2 (Total 20kg)', 'Core': 'Solid Cast Iron', 'Outer': 'Impact Vulcanized Rubber', 'Grip': 'Chrome Knurled' },
    stock: 18,
    isBestSeller: true
  },
  {
    id: 'fi-2',
    name: 'AuraAlign Eco TPE Yoga Mat',
    price: 3500,
    category: 'Fitness & Sports',
    brand: 'AuraAlign',
    rating: 4.7,
    reviewsCount: 142,
    imageIndex: 1,
    description: 'Root your practice with perfect alignment. Made from certified eco-friendly TPE, this dual-sided non-slip yoga mat offers luxurious 6mm cushioning. Features etched posture alignment grid lines to guide your hands and feet safely.',
    features: ['6mm High-density Joint Protection', 'Posture alignment laser-etched lines', 'Dual-sided non-slip textured surfaces', '100% Biodegradable eco-friendly TPE'],
    specifications: { 'Dimensions': '183 x 61 x 0.6 cm', 'Material': 'Eco TPE', 'Weight': '850g', 'Strap Included': 'Yes' },
    stock: 60,
    deliveryEstimate: 'Same day delivery'
  },
  {
    id: 'fi-3',
    name: 'FlexBand Latex Resistance Bands Set',
    price: 1800,
    discountPrice: 2500,
    category: 'Fitness & Sports',
    brand: 'FlexBand',
    rating: 4.5,
    reviewsCount: 221,
    imageIndex: 2,
    description: 'Your portable gym. This set of 5 premium multi-color resistance loops ranges from Extra-Light to Extra-Heavy (5lbs to 40lbs resistance). Fabricated from 100% natural Malaysian tree latex that maintains elasticity after thousands of reps.',
    features: ['100% Natural Malaysian Tree Latex', '5 Progressive resistance load levels', 'Includes fabric travel carry pouch', 'Free instructional exercise guide booklet'],
    specifications: { 'Bands Count': '5 Resistance Loops', 'Length': '30 cm', 'Material': 'Natural Latex', 'Resistance Range': '5 - 40 lbs' },
    stock: 200,
    deliveryEstimate: 'Same day delivery'
  },
  {
    id: 'fi-4',
    name: 'Contender Pro Leather Boxing Gloves',
    price: 7200,
    category: 'Fitness & Sports',
    brand: 'Contender',
    rating: 4.8,
    reviewsCount: 37,
    imageIndex: 3,
    description: 'Throw punches with confidence. Handcrafted from selected premium microfiber leather, these boxing gloves feature quadruple-layer foam padding that absorbs impact seamlessly. Secure hook-and-loop wrap-around wrist closure stabilizes wrist.',
    features: ['Quad-layer High-impact Shock Foam', 'Handcrafted premium micro-leather', 'Robust wrap-around locking wrist strap', 'Breathable palm mesh ventilating air'],
    specifications: { 'Weight': '12 oz / 14 oz', 'Closure': 'Heavy Velcro Strap', 'Inner Lining': 'Moisture-wicking Satin', 'Thumb': 'Locked Safety Thumb' },
    stock: 15,
    isNew: true
  },
  {
    id: 'fi-5',
    name: 'AeroSpeed High-Speed Skipping Rope',
    price: 1200,
    category: 'Fitness & Sports',
    brand: 'AuraAlign',
    rating: 4.6,
    reviewsCount: 154,
    imageIndex: 4,
    description: 'Burn calories in high gear. Built with lightning-fast dual stainless-steel 360° ball bearings in each handle for frictionless rotations. The adjustable polymer-coated steel cable is sturdy and does not twist or kink.',
    features: ['360° Smooth Ball Bearing Core', 'Adjustable braided steel wire cable', 'Ergonomic light silicone anti-slip grip', 'Comes with spare backup cable & parts'],
    specifications: { 'Cable Length': '3.0 meters (Adjustable)', 'Cable Thick': '2.5 mm', 'Handle': 'Aluminum Alloy & Silicone', 'Weight': '140g' },
    stock: 130,
    deliveryEstimate: 'Same day delivery'
  },
  {
    id: 'fi-6',
    name: 'IronForge Cast Iron Kettlebell',
    price: 4900,
    discountPrice: 6000,
    category: 'Fitness & Sports',
    brand: 'IronForge',
    rating: 4.7,
    reviewsCount: 62,
    imageIndex: 5,
    description: 'The foundation of absolute power. Solid single-piece cast iron with no welds, seams, or weak spots. Finished with a durable textured black powder coating that holds chalk beautifully and provides an incredible slip-free grip during high-rep swings.',
    features: ['Solid single-cast iron structural core', 'Black textured powder anti-corrode coat', 'Extra wide comfortable two-hand handle', 'Flat base sits perfectly flush on floor'],
    specifications: { 'Weight': '12 kg', 'Material': 'Solid Cast Iron', 'Handle Dia': '33 mm', 'Finish': 'Textured Powder' },
    stock: 25
  },
  {
    id: 'fi-7',
    name: 'AbCore Pro Dual Wheel Roller',
    price: 2200,
    category: 'Fitness & Sports',
    brand: 'FlexBand',
    rating: 4.5,
    reviewsCount: 44,
    imageIndex: 6,
    description: 'Chisel your midsection. Features a wide, stable dual-wheel system made of high-quality PVC that will not slip. The interior steel core axle supports up to 180kg, and the comfortable dense foam handles prevent hand fatigue during rolls.',
    features: ['Ultra-wide double wheel stability design', 'High-tensile steel core support pipe', 'Ergonomic sweat-absorbing foam grips', 'Includes soft dense EVA foam knee pad'],
    specifications: { 'Wheel Width': '16 cm', 'Max Capacity': '180 kg', 'Wheel Material': 'Skid-proof Solid PVC', 'Knee Pad Size': '34 x 17 cm' },
    stock: 45
  },
  {
    id: 'fi-8',
    name: 'AeroScale Smart Body Composition Scale',
    price: 4500,
    discountPrice: 5800,
    category: 'Fitness & Sports',
    brand: 'AeroPulse',
    rating: 4.8,
    reviewsCount: 93,
    imageIndex: 7,
    description: 'Know your body inside out. This smart glass scale measures 13 key body biometrics, including Weight, Body Fat %, Muscle Mass, BMI, and Bone Mass. Syncs instantly with Apple Health, Google Fit, and Fitbit via our responsive Bluetooth app.',
    features: ['13 Core Bio-impedance metrics', 'High-precision G-shape sensor tech', 'Toughened premium 6mm tempered glass', 'Syncs effortlessly with fitness platforms'],
    specifications: { 'Weight Range': '0.2 - 180 kg', 'App Link': 'Bluetooth 4.2+', 'Battery': '3x AAA Batteries (Included)', 'Glass': 'Tempered Safety Glass' },
    stock: 30,
    isPopular: true
  },
  {
    id: 'fi-9',
    name: 'StridePro Energy Trail Running Shoes',
    price: 8500,
    category: 'Fitness & Sports',
    brand: 'StridePro',
    rating: 4.7,
    reviewsCount: 51,
    imageIndex: 8,
    description: 'Conquer the wild trails. Built with aggressive multi-directional rubber lugs that claw onto wet, muddy, or sandy surfaces. A reinforced TPU toe box shields feet against hard rocks, while the responsive foam midsole keeps you moving.',
    features: ['Deep-lug aggressive trail outsole', 'Reinforced hard TPU toe armor cap', 'Water-resistant ripstop mesh upper', 'Speed-lace rapid adjustment system'],
    specifications: { 'Weight': '290g', 'Lug Depth': '5 mm', 'Drop': '8 mm', 'Waterproof': 'Splash Resistant' },
    stock: 20,
    isNew: true
  },
  {
    id: 'fi-10',
    name: 'HydraTech Insulated Sports Bottle',
    price: 2500,
    category: 'Fitness & Sports',
    brand: 'HydraTech',
    rating: 4.6,
    reviewsCount: 110,
    imageIndex: 9,
    description: 'Ice cold hydration for 24 hours. The HydraTech sports bottle is constructed with double-wall copper-plated vacuum insulation and food-grade 18/8 stainless steel. Will not sweat or transfer metal flavor, keeping drinks frosty.',
    features: ['Double-wall copper vacuum insulation', 'Keeps drinks: Cold (24h) / Hot (12h)', 'Leak-proof wide sports straw cap', 'Premium sweat-free powder finish'],
    specifications: { 'Capacity': '950 ml (32 oz)', 'Steel': 'Pro-grade 18/8 Stainless', 'BPA Free': 'Yes', 'Mouth Width': '5.8 cm' },
    stock: 140,
    deliveryEstimate: 'Same day delivery'
  },

  // Beauty & Personal Care (10 items)
  {
    id: 'be-1',
    name: 'AuraBrush 12-Piece Pro Makeup Brush Set',
    price: 3900,
    discountPrice: 5000,
    category: 'Beauty & Care',
    brand: 'AuraBrush',
    rating: 4.7,
    reviewsCount: 88,
    imageIndex: 0,
    description: 'Paint your canvas flawlessly. This comprehensive 12-piece set features premium ultra-soft hypoallergenic synthetic bristles that mimic squirrel hair density. Handles are carved from sustainable FSC timber and secured with thick copper ferrules.',
    features: ['Hypoallergenic ultra-soft vegan fiber', 'Full collection for face, eyes & cheeks', 'Durable solid birchwood elegant handles', 'Includes designer vegan leather roll bag'],
    specifications: { 'Brushes Count': '12 Brushes', 'Bristle': 'Vegan Syn-Fibers', 'Handle': 'FSC Birchwood', 'Ferrule': 'Anodized Copper' },
    stock: 35,
    isBestSeller: true
  },
  {
    id: 'be-2',
    name: 'PureRadiance Hyaluronic Hydration Cream',
    price: 2800,
    category: 'Beauty & Care',
    brand: 'PureRadiance',
    rating: 4.6,
    reviewsCount: 134,
    imageIndex: 1,
    description: 'Dewy, youthful hydration that lasts. Formulated with 5 molecular weights of hyaluronic acid, organic aloe extract, and barrier-repairing ceramides. Absorbs instantly into the skin, plumping out fine lines and sealing moisture for 72 hours.',
    features: ['5-Weight Multi-depth Hyaluronic Acid', 'Restorative barrier-building Ceramides', 'Fragrance-free, hypoallergenic formula', 'Dermatologist tested & approved'],
    specifications: { 'Volume': '50 ml', 'Skin Type': 'Dry, Normal, Sensitive', 'Ph Level': '5.5 Balance', 'Cruelty Free': 'Yes' },
    stock: 65,
    deliveryEstimate: 'Same day delivery'
  },
  {
    id: 'be-3',
    name: 'GlowSkin Advanced Vitamin C Serum',
    price: 3500,
    discountPrice: 4500,
    category: 'Beauty & Care',
    brand: 'PureRadiance',
    rating: 4.8,
    reviewsCount: 104,
    imageIndex: 2,
    description: 'Brighten and defend. Packing a stable 15% Pure Vitamin C (L-Ascorbic Acid) combined with Ferulic Acid and Vitamin E. This powerful antioxidant blend reverses sun spots, stimulates collagen, and shields skin against pollutants.',
    features: ['15% Potent Stable Vitamin C', 'Ferulic Acid & Vitamin E booster', 'Fades hyperpigmentation & spots', 'Protects against UV photo-aging'],
    specifications: { 'Volume': '30 ml', 'Packaging': 'UV-Protected Amber Glass', 'Cruelty Free': 'Yes', 'Scent': 'Unscented' },
    stock: 45,
    isPopular: true
  },
  {
    id: 'be-4',
    name: 'VelvetKiss Creamy Matte Lipstick Pack',
    price: 3200,
    category: 'Beauty & Care',
    brand: 'VelvetKiss',
    rating: 4.5,
    reviewsCount: 71,
    imageIndex: 3,
    description: 'Unapologetic bold lips. This designer trio pack includes three iconic shades: Crimson Red, Dusty Rose, and Nude Cocoa. Infused with wild organic shea butter and argan oil, it glides on creamy and dries into a comfortable, budge-proof velvet matte.',
    features: ['Budge-proof 12h long-wear formula', 'Infused with organic hydrating Argan Oil', 'Intense high-pigment velvety matte finish', 'Trio of universally flattering tones'],
    specifications: { 'Set Count': '3 Lipsticks', 'Net Weight': '3.5g x 3', 'Finish': 'Velvet Matte', 'Free From': 'Parabens' },
    stock: 28,
    isNew: true
  },
  {
    id: 'be-5',
    name: 'SilkRoots Organic Argan Hair Oil',
    price: 1900,
    discountPrice: 2600,
    category: 'Beauty & Care',
    brand: 'SilkRoots',
    rating: 4.8,
    reviewsCount: 143,
    imageIndex: 4,
    description: 'Liquid gold for dry, frizzy locks. 100% pure cold-pressed organic Moroccan Argan Oil. Rich in essential fatty acids and Vitamin E, it instantly tames frizz, seals split ends, and infuses hair with a breathtaking reflective gloss. Non-greasy.',
    features: ['100% Pure Cold-pressed Organic oil', 'Tames flyaways & repairs dry split ends', 'Thermally shields hair up to 230°C', 'Free from mineral oil, silicones, sulfates'],
    specifications: { 'Volume': '100 ml', 'Ingredient': '100% Argania Spinosa', 'Cold Pressed': 'Yes', 'Origin': 'Morocco' },
    stock: 80,
    deliveryEstimate: 'Same day delivery'
  },
  {
    id: 'be-6',
    name: 'SilkRoots Deep Revitalizing Shampoo',
    price: 1500,
    category: 'Beauty & Care',
    brand: 'SilkRoots',
    rating: 4.6,
    reviewsCount: 92,
    imageIndex: 5,
    description: 'Restore body and shine. This sulfate-free shampoo is enriched with organic keratin proteins, biotin, and rosemary herbal extract. Gently cleanses buildup while nourishing the hair follicles, stimulating healthy thick growth and curbing breakage.',
    features: ['Sulfate, paraben & silicone-free base', 'Infused with Follicle-active Biotin & Keratin', 'Calms dry itchy scalps with Aloe Vera', 'Locks in color vibrancy on dyed hair'],
    specifications: { 'Volume': '400 ml', 'Scent': 'Rosemary & Mint', 'Sulfate Free': 'Yes', 'pH Balanced': 'Yes' },
    stock: 110,
    deliveryEstimate: 'Same day delivery'
  },
  {
    id: 'be-7',
    name: 'Elysium Noir Eau de Parfum',
    price: 9500,
    discountPrice: 12000,
    category: 'Beauty & Care',
    brand: 'Elysium',
    rating: 4.9,
    reviewsCount: 53,
    imageIndex: 6,
    description: 'An unforgettable olfactory journey. Elysium Noir is a complex, seductive fragrance. Opening with refreshing top notes of black pepper and bergamot, leading to a dark, luxurious heart of Turkish rose and incense, grounded by warm sandalwood.',
    features: ['High-concentration long-lasting EDP', 'Intricate fragrance evolution profiles', 'Elegant heavy crystalline glass bottle', 'Suitable for day wear or seductive nights'],
    specifications: { 'Volume': '100 ml', 'Concentration': 'EDP (Eau de Parfum)', 'Scent Family': 'Woody Spicy Floral', 'Gender': 'Unisex' },
    stock: 12,
    isNew: true
  },
  {
    id: 'be-8',
    name: 'PureRadiance Dead Sea Mud Mask',
    price: 2400,
    category: 'Beauty & Care',
    brand: 'PureRadiance',
    rating: 4.5,
    reviewsCount: 65,
    imageIndex: 7,
    description: 'Deep skin pore vacuuming. Formulated with 100% authentic mineral-rich Dead Sea silt, organic jojoba oil, and soothing calendula extracts. Gently extracts blackheads, absorbs excess oil, and refines texture, leaving skin calm and clean.',
    features: ['Mineral-rich authentic Dead Sea mud', 'Pulls out whiteheads & unclogs large pores', 'Soothing Organic Calendula extract base', 'Will not crack or painfully dry out skin'],
    specifications: { 'Weight': '250 g', 'Usage': '1-2 times weekly', 'Free From': 'Synthetic Fragrances', 'Cruelty Free': 'Yes' },
    stock: 50
  },
  {
    id: 'be-9',
    name: 'Himalayan Pink Rose Bath Salts',
    price: 1800,
    category: 'Beauty & Care',
    brand: 'Elysium',
    rating: 4.7,
    reviewsCount: 42,
    imageIndex: 8,
    description: 'Melt the fatigue away. Woven with authentic Himalayan pink salt crystals, dried organic damask rose petals, and infused with calming French lavender essential oil. Replenishes magnesium, soothes sore muscles, and promotes deep sound sleep.',
    features: ['100% Authentic Himalayan Rock Salt', 'Infused with real damask rose petals', 'Aromatherapeutic lavender essential oil', 'Deeply relaxes muscles & reduces tension'],
    specifications: { 'Weight': '500 g', 'Packaging': 'Resealable Kraft bag', 'Vegan': 'Yes', 'Ingredients': 'Mineral Salts, Essential Oils' },
    stock: 75
  },
  {
    id: 'be-10',
    name: 'GlowSkin Matte Mineral Foundation',
    price: 2900,
    discountPrice: 3800,
    category: 'Beauty & Care',
    brand: 'VelvetKiss',
    rating: 4.6,
    reviewsCount: 57,
    imageIndex: 9,
    description: 'Airbrushed look, naturally. Our weightless mineral foundation offers buildable medium-to-full coverage with a healthy velvet-matte finish. Protects skin with SPF 15 zinc oxide barrier and controls oil production throughout the day.',
    features: ['Oil-absorbing weightless active minerals', 'Buildable medium-to-full coverage', 'Natural physical SPF 15 Zinc protection', 'Sweat-resistant, non-comedogenic formula'],
    specifications: { 'Net Weight': '30 ml', 'SPF': '15', 'Finish': 'Velvet Matte', 'Available Shades': 'Warm Sand, Rich Honey, Olive' },
    stock: 40,
    isPopular: true
  }
];

// Let's programmatically expand these 50 products using variations to fill exactly 50 items if needed, or we can duplicate them with minor modifications and unique IDs.
// Wait! Let's build exactly 50 distinct products by copying our templates and tweaking them, ensuring they look extremely high quality and unique.
export const generate50Products = (): Product[] => {
  const finalProducts: Product[] = [];
  
  // Categories maps for images
  const categoryImagesMap: Record<string, string[]> = {
    'Electronics': ELECTRONICS_IMAGES,
    'Fashion': FASHION_IMAGES,
    'Home & Kitchen': HOME_IMAGES,
    'Fitness & Sports': FITNESS_IMAGES,
    'Beauty & Care': BEAUTY_IMAGES
  };

  // 1. First append the 30 unique template products above
  productsData.forEach((item, index) => {
    const imagesList = categoryImagesMap[item.category];
    const mainImg = imagesList[item.imageIndex % imagesList.length];
    
    // Provide a nice 3-image gallery for each product using Unsplash photos of similar category
    const gallery = [
      mainImg,
      imagesList[(item.imageIndex + 1) % imagesList.length],
      imagesList[(item.imageIndex + 2) % imagesList.length],
    ];

    finalProducts.push({
      id: item.id,
      name: item.name,
      price: item.price,
      discountPrice: item.discountPrice,
      category: item.category,
      brand: item.brand,
      rating: item.rating,
      reviewsCount: item.reviewsCount,
      images: gallery,
      description: item.description,
      features: item.features,
      specifications: item.specifications,
      reviews: generateReviews(item.id, item.name, item.rating),
      stock: item.stock,
      deliveryEstimate: item.deliveryEstimate || '2 - 4 business days',
      isNew: item.isNew,
      isBestSeller: item.isBestSeller,
      isPopular: item.isPopular
    });
  });

  // 2. We have 30 highly detailed core products. Let's create another 20 products with varied IDs to hit exactly 50!
  // This will ensure we have plenty of products in all categories.
  const additionalProducts = [
    // Electronics extra (4 items)
    { id: 'el-extra-1', name: 'NanoCharge Wireless Fast Pad', price: 2100, category: 'Electronics', brand: 'VoltSafe', rating: 4.4, imgIdx: 8, stock: 110, isNew: true },
    { id: 'el-extra-2', name: 'ApexTrack GPS Fitband', price: 5400, discountPrice: 6500, category: 'Electronics', brand: 'AeroPulse', rating: 4.5, imgIdx: 0, stock: 45, isPopular: true },
    { id: 'el-extra-3', name: 'SoundStream Multiroom Soundbar', price: 29500, category: 'Electronics', brand: 'SonicBounce', rating: 4.7, imgIdx: 5, stock: 12 },
    { id: 'el-extra-4', name: 'Vortex Dual USB-C Car Fast Charger', price: 1500, category: 'Electronics', brand: 'Vortex', rating: 4.3, imgIdx: 8, stock: 150 },

    // Fashion extra (4 items)
    { id: 'fa-extra-1', name: 'Savoy Silk Designer Scarf', price: 2500, category: 'Fashion', brand: 'Savoy', rating: 4.6, imgIdx: 9, stock: 35 },
    { id: 'fa-extra-2', name: 'VenturePro Daily Canvas Tote', price: 1800, discountPrice: 2200, category: 'Fashion', brand: 'VenturePro', rating: 4.4, imgIdx: 6, stock: 95 },
    { id: 'fa-extra-3', name: 'UrbanClassic Denim Jeans Fit', price: 3800, category: 'Fashion', brand: 'UrbanClassic', rating: 4.5, imgIdx: 7, stock: 64, isBestSeller: true },
    { id: 'fa-extra-4', name: 'StridePro Comfort Cushioned Socks (3 Pack)', price: 900, category: 'Fashion', brand: 'StridePro', rating: 4.7, imgIdx: 1, stock: 210 },

    // Home & Kitchen extra (4 items)
    { id: 'ho-extra-1', name: 'Soren Bamboo Cutting Board Set', price: 1900, category: 'Home & Kitchen', brand: 'ChefCraft', rating: 4.5, imgIdx: 7, stock: 80 },
    { id: 'ho-extra-2', name: 'PlushCotton Heavy Waffle Bathrobe', price: 6500, discountPrice: 8000, category: 'Home & Kitchen', brand: 'PlushCotton', rating: 4.8, imgIdx: 3, stock: 25, isNew: true },
    { id: 'ho-extra-3', name: 'BaristaPro Milk Frother Pitcher', price: 1800, category: 'Home & Kitchen', brand: 'BaristaPro', rating: 4.6, imgIdx: 6, stock: 110 },
    { id: 'ho-extra-4', name: 'NordicHome Velvet Cushion Cover Set', price: 2200, category: 'Home & Kitchen', brand: 'NordicHome', rating: 4.4, imgIdx: 1, stock: 75 },

    // Fitness extra (4 items)
    { id: 'fi-extra-1', name: 'FlexBand Anti-Burst Exercise Ball', price: 2800, category: 'Fitness & Sports', brand: 'FlexBand', rating: 4.5, imgIdx: 6, stock: 48 },
    { id: 'fi-extra-2', name: 'Contender Protective Hand Wraps', price: 1000, category: 'Fitness & Sports', brand: 'Contender', rating: 4.7, imgIdx: 3, stock: 140, isNew: true },
    { id: 'fi-extra-3', name: 'AuraAlign Foam Massage Roller', price: 2400, discountPrice: 3200, category: 'Fitness & Sports', brand: 'AuraAlign', rating: 4.6, imgIdx: 1, stock: 72 },
    { id: 'fi-extra-4', name: 'HydraTech Shaker Cup 600ml', price: 1500, category: 'Fitness & Sports', brand: 'HydraTech', rating: 4.4, imgIdx: 9, stock: 160 },

    // Beauty extra (4 items)
    { id: 'be-extra-1', name: 'GlowSkin Jade Facial Roller & Gua Sha Set', price: 2500, category: 'Beauty & Care', brand: 'PureRadiance', rating: 4.6, imgIdx: 2, stock: 85 },
    { id: 'be-extra-2', name: 'Elysium Rose Water Soothing Facial Mist', price: 1800, category: 'Beauty & Care', brand: 'Elysium', rating: 4.5, imgIdx: 8, stock: 90, isPopular: true },
    { id: 'be-extra-3', name: 'AuraBrush Portable Makeup Sponge Trio', price: 1200, discountPrice: 1500, category: 'Beauty & Care', brand: 'AuraBrush', rating: 4.4, imgIdx: 0, stock: 180 },
    { id: 'be-extra-4', name: 'SilkRoots Intense Repair Hair Mask', price: 2200, category: 'Beauty & Care', brand: 'SilkRoots', rating: 4.7, imgIdx: 4, stock: 55, isBestSeller: true }
  ];

  additionalProducts.forEach((item, idx) => {
    const imagesList = categoryImagesMap[item.category];
    const mainImg = imagesList[item.imgIdx % imagesList.length];
    
    const gallery = [
      mainImg,
      imagesList[(item.imgIdx + 1) % imagesList.length],
      imagesList[(item.imgIdx + 2) % imagesList.length],
    ];

    // Derive descriptions and features
    const description = `The high-performance, premium ${item.name} from ${item.brand || 'ShopEase'}. Perfect for daily usage, crafted with care, and fully optimized to deliver a exceptional user experience. Made with sustainable high-quality materials to ensure durability and style.`;
    
    finalProducts.push({
      id: item.id,
      name: item.name,
      price: item.price,
      discountPrice: item.discountPrice,
      category: item.category,
      brand: item.brand || 'ShopEase',
      rating: item.rating,
      reviewsCount: 15 + (idx * 7),
      images: gallery,
      description: description,
      features: [`Premium quality materials`, `Tested for performance and safety`, `Modern design & comfortable feel`, `Highly durable construction`],
      specifications: { 'Brand': item.brand || 'ShopEase', 'Warranty': '1 Year ShopEase Warranty', 'Type': 'Genuine Brand Product', 'Package': 'Retail Box Included' },
      reviews: generateReviews(item.id, item.name, item.rating),
      stock: item.stock,
      deliveryEstimate: '2 - 3 business days',
      isNew: item.isNew,
      isBestSeller: item.isBestSeller,
      isPopular: item.isPopular
    });
  });

  return finalProducts;
};

export const mockProducts = generate50Products();

export const categoriesList = [
  { id: 'all', name: 'All Categories', count: 50 },
  { id: 'electronics', name: 'Electronics', count: 14, icon: 'Laptop', img: ELECTRONICS_IMAGES[0] },
  { id: 'fashion', name: 'Fashion', count: 14, icon: 'Shirt', img: FASHION_IMAGES[1] },
  { id: 'home', name: 'Home & Kitchen', count: 14, icon: 'Home', img: HOME_IMAGES[1] },
  { id: 'fitness', name: 'Fitness & Sports', count: 14, icon: 'Dumbbell', img: FITNESS_IMAGES[0] },
  { id: 'beauty', name: 'Beauty & Care', count: 14, icon: 'Sparkles', img: BEAUTY_IMAGES[6] }
];
