import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CartService } from './cart.service'
import { Product } from '../product-list/interfaces';


describe('CartService', () => {

    let service: CartService;

    const mockProduct: Product = {
        id: 'p1',
        name: 'Laptop',
        category: {
            id: '1',
            name: 'Electorinics',
        },
        price: 1000,
        rating: 5,
        imageUrl: '',
    }


    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CartService);
    });


    it('should add a new product and update computed totals', () => {
        service.addToCart(mockProduct)
        expect(service.items().length).toBe(1)
        expect(service.items()[0].quantity).toBe(1)
        expect(service.totalPrice).toBe(1000)
        expect(service.totalItemsCount).toBe(1)
    })

    it('should increment quantity when adding an existing product', () => {
        service.addToCart(mockProduct);
        expect(service.items().length).toBe(1),
            expect(service.items()[0].quantity).toBe(2)
        expect(service.totalPrice).toBe(2000)
        expect(service.totalItemsCount).toBe(2)
    })

    it('should remove a product and recalculate totals', () => {
        service.addToCart(mockProduct);
        service.remoCartItem('p1');

        expect(service.items().length).toBe(0)
        expect(service.totalPrice()).toBe(0);

    })


    it('Should emit data stream over time', fakeAsync(() => {
        let emitedValue: any;

        const subscription = service.dataStream$.subscribe(val => {
            emitedValue = val;
        })

        expect(emitedValue).toBeUndefined();
        tick(50);
        expect(emitedValue).toBe(0);


        tick(50);
        expect(emitedValue).toBe(1)

        subscription.unsubscribe();
    }))

})