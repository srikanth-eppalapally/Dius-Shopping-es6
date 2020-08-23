import dealType from './Deals';

export default class Checkout {
    constructor(pricingRules) {
        this.pricingRules = pricingRules;
        this.shoppingBag = [];
    }


    scan(skuId) {
        const isSameProduct = this.shoppingBag.some(pro => pro.skuId === skuId);
        if (isSameProduct) {
            this.shoppingBag.forEach(pro => {
                if (pro.skuId === skuId) {
                    pro.quantity += 1;
                }
            })
        } else {
            this.addItemsToBag(skuId);
        }
    }

    addItemsToBag(skuId) {
        const product = this.pricingRules.find(pro => pro.skuId === skuId);
        if (product) {
            let item = {
                skuId: product.skuId,
                name: product.productName,
                quantity: 1,
                unitPrice: product.unitPrice,
                freeQunatity: 0
            };
            this.shoppingBag.push(item);
        } else {
            console.error('Item Not Found');
        }
    }


    total() {
        return this.shoppingBag.reduce((total, item) => {
            const product = this.pricingRules.find(prod => prod.skuId === item.skuId);
            if (product && product.deals) {
                switch (product.deals.dealType) {
                    case dealType.purchaseMore:
                        item = this.purchaseMore(item, product);
                        break;
                    case dealType.freeProduct:
                        item = this.freeProduct(item, product);
                        break;
                    case dealType.buySomegetSome:
                        item = this.buySomegetSome(item, product);
                        break;
                }
            }
            total += item.quantity * item.unitPrice;
            return total;
        }, 0);

    }

    purchaseMore(item, product) {
        const { dealQuantity, afterPrice } = product.deals;
        const { quantity } = item;
        if (quantity > dealQuantity) {
            item.unitPrice = afterPrice;
        }
        return item;
    }


    freeProduct(item, product) {
        const { freeProdSkuId } = product.deals;
        const { quantity } = item;
        if (!this.shoppingBag.some(pro => pro.skuId === freeProdSkuId)) {
            this.addItemsToBag(freeProdSkuId);
        }

        this.shoppingBag.forEach(pro => {
            if (pro.skuId === freeProdSkuId) {
                pro.freeQunatity += quantity;
                pro.quantity -= quantity;
                if (pro.quantity < 0) {
                    pro.quantity = 0;
                }
            }
        });
        return item;
    }


    buySomegetSome(item, product) {
        const { quantity } = item;
        const { dealPurchaseQty, dealDiscountQty } = product.deals;
        if (quantity >= dealPurchaseQty) {
            item.quantity -= dealDiscountQty;
            item.freeQunatity = dealDiscountQty;
        }
        return item;
    }

}