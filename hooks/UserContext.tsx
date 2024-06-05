// src/UserContext.tsx
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { IdTokenResult, User, getIdTokenResult } from 'firebase/auth';

interface UserContextProps {
    user: User | null;
    roles: string[];
}

interface UserProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [roles, setRoles] = useState<string[]>([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setUser(user);
            if (user) {
                const idTokenResult: IdTokenResult = await getIdTokenResult(user);
                const userRoles = idTokenResult.claims.roles;
                if (Array.isArray(userRoles)) {
                    setRoles(userRoles);
                } else {
                    setRoles([]);
                }
            } else {
                setRoles([]);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, roles }}>
            {children}
        </UserContext.Provider>
    );
};

export const useFirebaseUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useFirebaseUserContext must be used within a UserProvider');
    }
    return context;
};
