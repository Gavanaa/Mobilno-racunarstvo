export interface Book {
  id: string;
  userId: string;
  title: string;
  author: string;
  description: string;
  rate: {
    [key: string]: {
      value: number;
    };
  };
  averageRate: number;
}
