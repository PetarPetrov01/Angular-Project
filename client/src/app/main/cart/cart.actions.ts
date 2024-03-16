import { createAction, props } from '@ngrx/store';
import {  PopulatedProduct } from '../../types/Product';

export const addItem = createAction('[Cart] add', props<{product: PopulatedProduct,qty: number}>());
export const decreaseQuantity = createAction('[Cart] decrease', props<{productId: string}>());
export const removeItem = createAction('[Cart] remove', props<{productId: string}>());
