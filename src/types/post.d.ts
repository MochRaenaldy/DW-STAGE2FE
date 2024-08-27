export interface Ipostform {
  content?: string;
  image?: string;
}

export interface IPostModel {
 author : IAuthor;
 id: number
 content :string;
 createdAt: Date;
 image? : string;
}

export interface IAuthor {
  id: number;
  fullname: string;
  username: string;
  profil_pic?: string;
}
