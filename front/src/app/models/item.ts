export interface Item {
  id?: number;
  owner?: number;
  owner_username?: string;
  title:string;
  description: string;
  category: string;
  status: string;
  location: string;
  date: string;
  image?: string;
  is_active?: boolean;
  created_at?: string;
}
