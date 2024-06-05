

import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { createContextFromHook } from "@livequery/react";
import { onAuthStateChanged, onIdTokenChanged, signOut, User } from 'firebase/auth'
import { useRouter } from "next/navigation";

export type FirebaseUser = User & {
    reloadUserInfo: {
        customAttributes: string
    }
}

export const [useFirebaseUserContext, FirebaseUserContextProvider] = createContextFromHook(() => {

    const [fuser, set_fuser] = useState<User & { $?: any } | null>() // fuser thông tin người dùng trên firebase
    const [loading, set_loading] = useState(true)
    const [claims, set_claims] = useState<any>({}) // claims quyền của người dùng
    const [login_modal_visible, set_login_modal_visible] = useState<boolean>(false) // Modal login
    useEffect(() => { fuser && set_login_modal_visible(false) }, [fuser])

    // Lắng nghe trạng thái đăng nhập hay chưa
    useEffect(() => {
        onAuthStateChanged(auth, u => {
            set_fuser(u as any as FirebaseUser)
            set_loading(false)
        }) 
    }, [])

    // Lắng nghe sự thay đổi quyền hạn của người dùng mỗi khi set lại quyền
    useEffect(() => {
        onIdTokenChanged(auth, idtoken => {
            idtoken?.getIdTokenResult().then(c => set_claims(c.claims.$ || {}))
        })
    }, [])

    // Check lại quyền
    const reload_permissions = () => auth.currentUser?.getIdToken(true)
    const router = useRouter()
    const logout = async () => {
        await signOut(auth)
        router.push(`/login`)
    }

    return {
        fuser, // Thông tin user trên firebase
        loading, // Chờ xử lý
        claims,
        logout, // Quyền
        reload_permissions, // Check lại quyền
        login_modal_visible,
        open_login_modal: () => set_login_modal_visible(true),
        close_login_modal: () => set_login_modal_visible(false)
    }
})