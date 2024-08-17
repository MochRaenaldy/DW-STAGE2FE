export interface IStoreStates {
  user: IUser;
  isLogin?: boolean;
}

export interface IStoreActions {
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

export interface IUser {
  profile?: IProfile;
  username: string;
  email: string;
  fullName: string;
  bio: string;
}

export interface IProfile {
  avatar: string;
  banner: string;
  bio: string;
}

export interface IUserList {
  id: number;
  email: string;
  username: string;
  fullName: string;
  password: string;
  bio: string;
  profile_pic: null;
  createdAt: Date;
  updatedAt: Date;
  isfollow: null;
  
}

export type TStore = IStoreStates & IStoreActions;
