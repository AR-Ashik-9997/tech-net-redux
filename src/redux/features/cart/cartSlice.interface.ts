import { IProduct } from '@/types/globalTypes';

export interface ICart {
  products: IProduct[];
  total:number;
}

