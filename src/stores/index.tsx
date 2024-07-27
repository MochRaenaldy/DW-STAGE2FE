import { createContext, useState } from "react";
import { IUser, TStore } from "../types/store";

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
      email: "",
      fullName: "",
      username: "",
   });
   const [isLogin, setIsLogin] = useState(false);

   const setUser = (user: IUser) => {
      setUserState(user);
      setIsLogin(true);
   };

   const clearUser = () => {
      setUserState({
         email: "",
         fullName: "",
         username: "",
      });

      setIsLogin(false);
   };

   console.log(user, isLogin);

   return (
      <Store.Provider
         value={{
            user,
            isLogin,
            setUser,
            clearUser,
         }}
      >
         {children}
      </Store.Provider>
   );
};