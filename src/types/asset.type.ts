export interface Asset {
  _id: number;
  category: string;
  brand: string;
  model: string;
  group: string;
  aliasName: string;
  name: string;
  assetImage: string;
  assetNumber: number;
  userFirstName: string;
  createdAt: Date;
  updatedAt: Date;
}
