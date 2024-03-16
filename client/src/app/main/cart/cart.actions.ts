import { createAction, props } from '@ngrx/store';
import { APIProduct } from '../../types/Product';

export const addItem = createAction('[Cart] add', props<{product: APIProduct,qty: number}>());
export const decreaseQuantity = createAction('[Cart] decrease', props<{productId: string}>());
export const removeItem = createAction('[Cart] remove', props<{productId: string}>());
