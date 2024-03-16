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
);
