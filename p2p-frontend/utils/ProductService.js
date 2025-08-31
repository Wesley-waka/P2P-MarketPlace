// src/service/ProductService.js
export const ProductService = {
    getProductsMini() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        code: 1,
                        name: 'Laptop',
                        price: 1200,
                        inventoryStatus: 'INSTOCK',
                        quantity: 25
                    },
                    {
                        code: 2,
                        name: 'Smartphone',
                        price: 800,
                        inventoryStatus: 'LOWSTOCK',
                        quantity: 5
                    },
                    {
                        code: 3,
                        name: 'Headphones',
                        price: 150,
                        inventoryStatus: 'OUTOFSTOCK',
                        quantity: 0
                    },
                    {
                        code: 4,
                        name: 'Monitor',
                        price: 300,
                        inventoryStatus: 'INSTOCK',
                        quantity: 18
                    },
                    {
                        code: 5,
                        name: 'Keyboard',
                        price: 100,
                        inventoryStatus: 'INSTOCK',
                        quantity: 40
                    }
                ]);
            }, 1000); // Simulate API delay
        });
    }
};
