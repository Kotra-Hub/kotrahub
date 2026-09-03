export interface Section {
  id?: number;
  code: string;
  name: string;
  description: string;
  // departmentId: number;
  dtCreated?: Date;
  dtUpdated?: Date;
  createdBy?: string;
}

export const newSection: Section = {
  code: '',
  name: '',
  description: '',
  // departmentId: 0
};