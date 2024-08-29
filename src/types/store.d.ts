export interface IStoreStates {
  user: IUser;
  isLogin?: boolean;
  users: IUserList[];
  like: boolean;
}

export interface IStoreActions {
  setUser: (user: IUser) => void;
  clearUser: () => void;
  getUsers: (userId:number) => void;
  setLikeFunc: (postId: number, userId: number) => void;
  setUnLikeFunc: (postId: number, userId: number) => void;
}

export interface IUser {
  profile_pic: string | undefined;
  profile?: IProfile;
  username: string;
  email: string;
  fullName: string;
  bio: string;
  id: number,
}

export interface IProfile {
  avatar: string;
  banner: string;
  bio: string;
}

export interface IUserList {
  isfollow: any;
  id: number;
  email: string;
  username: string;
  fullName: string;
  bio: string;
  profile_pic: null;
  createdAt: Date;
  updatedAt: Date;
  
}

export type TStore = IStoreStates & IStoreActions;
