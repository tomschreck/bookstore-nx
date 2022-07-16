
export interface CreateBookDto
{
  id?: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  status: string;
  price: number;
  inventory: number;
  notes: string;
}
