import { createContext, useState } from "react";
import { IUser, TStore } from "../types/store";
import { api } from "../libs/api";

interface StoreProps {
  children: React.ReactNode;
}

export const Store = createContext<TStore | null>(null);

// buat store provider untuk menyediakan data store di semua komponen
export const StoreProvider: React.FC<StoreProps> = ({ children }) => {
  //    // ini state
  //    const [count, setCount] = useState(0);

  //    // ini action
  //    const increment = () => setCount(count + 1);
  //    const decrement = () => setCount(count - 1);

  const [user, setUserState] = useState<IUser>({
    id: 0,
    email: "",
    fullName: "",
    username: "",
    bio: "",
    profile_pic: "",
  });
  // const [isLogin, setIsLogin] = useState(false);

  const setUser = (user: IUser) => {
    setUserState(user);
    // setIsLogin(true);
  };

  const clearUser = () => {
    setUserState({
      id: 0,
      email: "",
      fullName: "",
      username: "",
      bio :"",
      profile_pic: "",
    });

    // setIsLogin(false);
    localStorage.removeItem("token");
    localStorage.clear();
  };
const [users, setUsers] = useState([]);
  const getUsers = async (userId : number) => {
    try {
      const res = await api.get(`/users/userlogin/${userId}`);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(user, isLogin);

  const [like, setLike] = useState(false);

  const setLikeFunc = async (postId : number, userId : number) => {
    try {
      const res = await api.post(`/like/${postId}/${userId}`);
      if(res) {
        setLike(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const setUnLikeFunc = async (postId : number, userId : number) => {
    try {
      const res = await api.post("/like/unlike", {postId, userId});
      if(res) {
        setLike(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Store.Provider
      value={{
        user,
        getUsers,
        users,
        like,
        setLikeFunc,
        setUnLikeFunc,
        // isLogin,
        setUser,
        clearUser,
      }}>
      {children}
    </Store.Provider>
  );
};
