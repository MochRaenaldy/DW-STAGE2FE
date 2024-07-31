import { PostModels } from "../models/PostModels";

const posts: PostModels[] = [
  {
      userId: 1,
      username: "Clorinder",
      email: "Clorinde@gmail.com",
      bio: "Genshin Impact Clorinde Build",
      title: "",
      body: ""
  },
  {
      userId: 2,
      username: "Ganyu",
      email: "ganyu@gmail.com",
      bio: "Genshin Impact Ganyu Build",
      title: "",
      body: ""
  },
  {
      userId: 3,
      username: "Hutao",
      email: "Hutao@gmail.com",
      bio: "Genshin Impact Hutao Build",
      title: "",
      body: ""
  },
];

export const findAll = () => {
  return posts;
};

export const findById = (id: number) => {
  return posts[id];
};

export const create = (post: PostModels) => {
  posts.push(post);

  return post;
};

export const update = (index: number, post: PostModels) => {
  posts[index] = post;

  return post;
};

export const remove = (index: number) => {
  posts.splice(index, 1);

  return "deleted";
};
