import { create } from "zustand";
import { persist } from "zustand/middleware";
import { decryptData, encryptData } from "../services/Crypto";


const useAuth = create(
    persist(
        (set)=>({
            user:null,
            isAuthenticated: false,

            login:(userData)=>
                set({
                    user: userData,
                    isAuthenticated: true
                }),
            logout:()=>
                set({ user: null , isAuthenticated: false })

        }),{
            name:'auth-storage',
            storage:{
                getItem: (name) =>{
                    const item = sessionStorage.getItem(name);
                    return item ? decryptData(item) : null;
                },
                setItem: (name, value) =>{
                    const encryptedValue = encryptData(value);
                    sessionStorage.setItem(name, encryptedValue);
                },
                removeItem: (name) => sessionStorage.removeItem(name),

            }
        }
    )
)


export default useAuth;
