import { createReducer, on } from '@ngrx/store';
import * as actions from './cart.actions';
import { StateProduct } from '../../types/State';

const initial: StateProduct[] | [] = [
  {
    name: '',
    description: '',
    image: '',
    category: [''],
    style: '',
    dimensions: {
      height: 0,
      width: 0,
      depth: 0,
    },
    material: [''],
    color: '',
    price: 0,
    _id: '',
    _ownerId: '',
    __v: '',
    quantity: 0,
  },
];

export const cartReducer = createReducer(
  initial,
  on(actions.addItem, (state, { product, qty }) => {
    return state.some((prod) => prod._id == product._id)
      ? state.map((prod) => {
          return prod._id == product._id
            ? {
                ...prod,
                quantity: prod.quantity + qty,
              }
            : prod;
        })
      : [...state, { ...product, quantity: qty }];
  }),
  on(actions.decreaseQuantity, (state, { productId }) => {
    return state.map((prod) => {
      return prod._id == productId
        ? { ...prod, quantity: prod.quantity - 1 }
        : prod;
    });
  }),
  on(actions.removeItem, (state, { productId }) => {
    return state.filter((prod) => prod._id != productId);
  })
);
