export interface CardProfessor {
  id: number;
  name: string;
}

export interface CardStudent {
  id: number;
  name: string;
}

export interface CardTxtPost {
  txt: undefined;
  id: number;
  author_name: string;
  author_id: number;
  title: string;
  body: string;
}

export interface CardPdfPost {
  pdf: undefined;
  id: number;
  author_name: string;
  author_id: number;
  file_name: string;
  title: string;
}

export interface CardPngPost {
  png: undefined;
  id: number;
  author_name: string;
  author_id: number;
  file_name: string;
  title: string;
}

export type Post = CardTxtPost | CardPdfPost | CardPngPost;

export interface UserProfileData {
  id: number;
  owner: boolean;
  name: string;
  bio: string;
  image: string;
  job: string;
  posts: Post[];
}
