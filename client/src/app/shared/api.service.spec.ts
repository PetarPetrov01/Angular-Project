import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { APIProduct, PopulatedProduct } from '../types/Product';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: jasmine.SpyObj<HttpClient>;
  const mockProduct = {
    _id: '123',
    name: '',
    description: '',
    image: '',
    category: [''],
    style: '',
    dimensions: {
      height: 1,
      width: 1,
      depth: 1,
    },
    material: [''],
    color: '',
    price: 1,
    __v: '1',
    _ownerId: '123',
    createdAt: '123',
  };

  beforeEach(() => {
    httpMock = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: HttpClient, useValue: httpMock }],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProducts should return the products', (done) => {
    const mockProducts: APIProduct[] = [mockProduct];

    httpMock.get
      .withArgs('/api/products', { params: { search: '' } })
      .and.returnValue(of(mockProducts));

    service.getProducts({ search: '' }).subscribe((products) => {
      expect(products).toEqual(mockProducts);
      done();
    });
  });

  it('getProduct should return a product', (done) => {
    const populatedMockProduct: PopulatedProduct = {
      ...mockProduct,
      _ownerId: {
        _id: '123',
        email: 'test@mail.com',
        username: 'Test1',
        wishlist: [],
      },
    };
    httpMock.get
      .withArgs('/api/products/123')
      .and.returnValue(of(populatedMockProduct));

    service.getProduct('123').subscribe((prod) => {
      expect(prod).toEqual(populatedMockProduct);
      done()
    });
  });
});
