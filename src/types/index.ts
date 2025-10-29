// User Types
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// Comment Types
export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

// Filter State Types
export interface FilterState {
  searchTerm: string;
  sortColumn: 'postId' | 'name' | 'email' | null;
  sortOrder: 'asc' | 'desc' | null;
  currentPage: number;
  pageSize: number;
}

// Sort Direction Type
export type SortDirection = 'asc' | 'desc' | null;

