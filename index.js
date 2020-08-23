import Checkout from './shopping/Checkout';
import pricingRules from './shopping/PricingRules';


const p1 = new Checkout(pricingRules);
p1.scan('atv');
p1.scan('atv');
p1.scan('atv');
p1.scan('vga');
console.log(p1.total());


const p2 = new Checkout(pricingRules);
p2.scan('atv');
p2.scan('ipd');
p2.scan('ipd');
p2.scan('atv');
p2.scan('ipd');
p2.scan('ipd');
p2.scan('ipd');
console.log(p2.total());

const p3 = new Checkout(pricingRules);
p3.scan('mbp');
p3.scan('vga');
p3.scan('ipd');
console.log(p3.total());