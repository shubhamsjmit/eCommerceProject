export interface Product {
  id: number,
  name: string,
  category: productCategory,
  description: string,
  quantity : number,
	cost: number;
	currency: string
  image: string
}

export enum productCategory {
  Electronics="Electronics",
  Television="Television",
  Grocery="Grocery",
  Fashion="Fashion",
  Appliances="Appliances",
  Travel="Travel",
  BeautyToysAndMore="Beauty, Toys & More"
}

export interface JSONFormat {
  nextId: number,
  products: Product[],
  type: string,
  base64Data: string
  fileName:string
}

export interface JSONModel {
  loading: boolean;
  loaded: boolean;
  errors: boolean;
  products: Product[];
}
