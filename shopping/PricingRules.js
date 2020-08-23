const pricingRules = [
    {
        skuId: 'ipd',
        productName: 'Super iPad',
        unitPrice: 549.99,
        deals: {
            dealName: 'Purchase More for discount',
            dealType: 1,
            afterPrice: 499.99,
            dealQuantity: 4,
        },

    },
    {
        skuId: 'mbp',
        productName: 'MacBook Pro',
        unitPrice: 1399.99,
        deals:
        {
            dealName: 'Free Product',
            dealType: 2,
            freeProdSkuId: 'vga',
        },
    },
    {
        skuId: 'atv',
        productName: 'Apple TV',
        unitPrice: 109.50,
        deals:
        {
            dealName: '3 for 2 Special',
            dealType: 3,
            dealPurchaseQty: 3,
            dealDiscountQty: 1,
        },
    },
    {
        skuId: 'vga',
        productName: 'VGA adapter',
        unitPrice: 30.00,
    },
];

export default pricingRules;