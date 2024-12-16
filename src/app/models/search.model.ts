export interface SearchFilters {
  plate?: string;
  make?: string;
  model?: string;
  owner?: string;
}

export interface SearchResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}