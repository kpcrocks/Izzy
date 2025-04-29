import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.product.deleteMany();

  // Create sample products
  const tshirt = await prisma.product.create({
    data: {
      name: 'Classic Cotton T-Shirt',
      description: 'Comfortable 100% cotton t-shirt perfect for everyday wear',
      price: 29.99,
      sku: 'TS-001',
      stock: 100,
      images: [
        'tshirt-front.jpg',
        'tshirt-back.jpg'
      ],
      variants: {
        create: [
          {
            size: 'S',
            color: 'Black',
            stock: 30,
            sku: 'TS-001-S-BLK'
          },
          {
            size: 'M',
            color: 'Black',
            stock: 40,
            sku: 'TS-001-M-BLK'
          },
          {
            size: 'L',
            color: 'Black',
            stock: 30,
            sku: 'TS-001-L-BLK'
          }
        ]
      }
    },
    include: {
      variants: true
    }
  });

  const hoodie = await prisma.product.create({
    data: {
      name: 'Premium Zip Hoodie',
      description: 'Warm and stylish hoodie with premium cotton blend',
      price: 59.99,
      sku: 'HD-001',
      stock: 75,
      images: [
        'hoodie-front.jpg',
        'hoodie-back.jpg'
      ],
      variants: {
        create: [
          {
            size: 'M',
            color: 'Navy',
            stock: 25,
            sku: 'HD-001-M-NVY'
          },
          {
            size: 'L',
            color: 'Navy',
            stock: 25,
            sku: 'HD-001-L-NVY'
          },
          {
            size: 'XL',
            color: 'Navy',
            stock: 25,
            sku: 'HD-001-XL-NVY'
          }
        ]
      }
    },
    include: {
      variants: true
    }
  });

  const jeans = await prisma.product.create({
    data: {
      name: 'Slim Fit Jeans',
      description: 'Classic slim fit jeans with stretch comfort',
      price: 79.99,
      sku: 'JN-001',
      stock: 50,
      images: [
        'jeans-front.jpg',
        'jeans-back.jpg'
      ],
      variants: {
        create: [
          {
            size: '30',
            color: 'Blue',
            stock: 15,
            sku: 'JN-001-30-BLU'
          },
          {
            size: '32',
            color: 'Blue',
            stock: 20,
            sku: 'JN-001-32-BLU'
          },
          {
            size: '34',
            color: 'Blue',
            stock: 15,
            sku: 'JN-001-34-BLU'
          }
        ]
      }
    },
    include: {
      variants: true
    }
  });

  console.log('Created sample products:', {
    tshirt: { id: tshirt.id, variants: tshirt.variants },
    hoodie: { id: hoodie.id, variants: hoodie.variants },
    jeans: { id: jeans.id, variants: jeans.variants }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 