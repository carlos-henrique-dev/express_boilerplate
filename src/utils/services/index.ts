import { Request } from 'express';
import { DEFAULT_FILTER, DEFAULT_PAGINATION } from '../constants/database';
import { DefaultItemFilterQuery, DefaultPagination } from '../../interfaces/controller';

export const parsePagination = (query: Request['query']): DefaultPagination => {
  const { limit, offset } = query || DEFAULT_PAGINATION;

  return {
    limit: Number(limit),
    offset: Number(offset),
  };
};

export const parseFilter = (query: Request['query']): DefaultItemFilterQuery => {
  const { field, value } = query || DEFAULT_FILTER;

  const parseField = typeof field === 'string' ? field : 'id';
  const parseValue = typeof value === 'string' || typeof value === 'number' ? value : 0;

  return { field: parseField, value: parseValue };
};

export const parseId = (params: Request['params']) => {
  let id = 0;

  if (params && params.id) {
    id = Number(params.id);
  }

  return id;
};
