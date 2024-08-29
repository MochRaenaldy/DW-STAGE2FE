export interface Ipostform {
  content?: string;
  image?: string;
}

export interface IPostModel {
  author: IAuthor;
  id: number;
  content: string;
  createdAt: string;
  images: [
    {
      image: string;
    }
  ];
  comments: IComment[];
}

export interface IAuthor {
  id: number;
  fullname: string;
  username: string;
  profil_pic?: string;
  email : string;
}

export interface IComment {
  id: number;
  content: string;
  createdAt: Date;
  author: IAuthor;
}

