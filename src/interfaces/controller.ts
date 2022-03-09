export interface DefaultPagination {
  offset: number;
  limit: number;
}

export type DefaultItemFilterQuery = {
  field: string;
  value: number | string;
};

export type DefaultFindItemQuery = {
  value: number;
};
