export interface Uom {
  id?: number;
  code: string;
  name: string;
}

export const newUom: Uom = {
  name: '',
  code: '',
};