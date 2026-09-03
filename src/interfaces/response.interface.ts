export interface ResponseDTO {
  code: number;
  message: string;
  result?: any;
  pagination?: Pagination
}

export interface Pagination {
  page: number,
  pagePrevious: number,
  pageNext: number,
  pageSize: number,
  totalItems: number,
  totalPages: number,
}

export const newPagination: Pagination = {
  page: 1,
  pageNext: 2,
  pagePrevious: 1,
  pageSize: 50,
  totalItems: 0,
  totalPages: 1
}

export const pageSizeOptions = [
  {value: 25, title: '25'},
  {value: 50, title: '50'},
  {value: 100, title: '100'},
  {value: -1, title: '$vuetify.dataFooter.itemsPerPageAll'}
]