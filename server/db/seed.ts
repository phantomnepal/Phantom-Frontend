/**
 * Seed the products table with the 6 existing Phantom SKUs.
 *
 * Run:  npx tsx server/db/seed.ts   (requires DATABASE_URL)
 *
 * Images point at the existing /public/products assets.
 */
import './load-env';
import { db } from './index';
import { products, type NewProduct } from './schema';

const seed: NewProduct[] = [
  {
    sku: 'PH-CUBESAT-1U',
    slug: 'educational-1u-cubesat',
    title: 'Educational 1U CubeSat',
    priceNpr: 10000,
    stock: 'preorder',
    category: 'Aerospace Education',
    images: ['/products/project1.jpg'],
    description:
      'A learning platform designed to introduce students to satellite systems, embedded electronics, communications, and aerospace engineering principles.',
    specs: [],
    tags: ['Aerospace', 'CubeSat', 'Education'],
  },
  {
    sku: 'PH-F722',
    slug: 'phantom-f722-flight-controller',
    title: 'Phantom F722 Flight Controller',
    priceNpr: 18000,
    stock: 'preorder',
    category: 'FPV Flight Controller',
    images: ['/products/project2.jpg'],
    description:
      'A custom STM32F722-based flight controller designed for high-end FPV drones and industrial UAV applications requiring millisecond precision.',
    specs: [],
    tags: ['FPV', 'Flight Control', 'Avionics'],
  },
  {
    sku: 'PH-F405',
    slug: 'phantom-f405-flight-controller',
    title: 'Phantom F405 Flight Controller',
    priceNpr: 14000,
    stock: 'preorder',
    category: 'FPV Flight Controller',
    images: ['/products/phantom-f405.png'],
    description:
      'A STM32F405-based flight controller designed for high-end FPV drones and industrial UAV applications requiring millisecond precision.',
    specs: [],
    tags: ['FPV', 'Flight Control', 'Avionics'],
  },
  {
    sku: 'PH-KIT-STARTER',
    slug: 'phantom-electronics-starter-kit',
    title: 'Phantom Electronics Starter Kit',
    priceNpr: 2500,
    stock: 'in-stock',
    category: 'Educational Products',
    images: ['/products/project3.jpg'],
    description:
      'A beginner-friendly electronics kit designed to teach fundamental concepts through hands-on projects involving sensors, displays, and basic automation systems.',
    specs: [],
    tags: ['Electronics', 'STEM Education', 'Beginners'],
  },
  {
    sku: 'PH-KIT-ROBOTICS',
    slug: 'phantom-robotics-kit',
    title: 'Phantom Robotics Kit',
    priceNpr: 2800,
    stock: 'in-stock',
    category: 'Educational Products',
    images: ['/products/project4.jpg'],
    description:
      'Explore robotics through practical projects involving motion control, sensors, actuators, and autonomous system development.',
    specs: [],
    tags: ['Robotics', 'Automation', 'Motion Control'],
  },
  {
    sku: 'PH-KIT-EMBEDDED',
    slug: 'phantom-embedded-systems-kit',
    title: 'Phantom Embedded Systems Kit',
    priceNpr: 3000,
    stock: 'preorder',
    category: 'Educational Products',
    images: ['/products/project5.jpg'],
    description:
      'Learn real embedded systems development with industry-relevant hardware and programming concepts, including communication protocols, peripherals, and real-time control.',
    specs: [],
    tags: ['Embedded Systems', 'STEM Education'],
  },
];

async function main() {
  console.log('Seeding products…');
  for (const p of seed) {
    await db
      .insert(products)
      .values(p)
      .onConflictDoUpdate({ target: products.sku, set: p });
    console.log(`  ✓ ${p.sku}  ${p.title}`);
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
