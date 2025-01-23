export interface CustomField {
  _id: string;
  active: boolean;
  fieldName: string;
  dataType: string;
  value: string[];
  required: boolean;
  itemName: string[];
}
