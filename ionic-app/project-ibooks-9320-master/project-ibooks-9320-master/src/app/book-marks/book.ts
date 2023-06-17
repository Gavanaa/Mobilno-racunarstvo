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
  comments?: Comment;
  readLater: {
    [key: string]: {
      value: boolean;
    };
  };
}

export interface Comment {
  [key: string]: {
    user: string;
    comment: string;
  };
}
