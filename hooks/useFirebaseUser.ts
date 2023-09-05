

import { Observable } from "rxjs";
import { useEffect, useState } from "react";
import { FirebaseAuth } from "../config/firebase";
import { createContextFromHook } from "@livequery/react";
import { onAuthStateChanged, onIdTokenChanged, User } from 'firebase/auth'

export const [useFirebaseUserContext, FirebaseUserContextProvider] = createContextFromHook(() => {

    const [fuser, set_fuser] = useState<User & { $?: any } | null>() // fuser thông tin người dùng trên firebase
    const [loading, set_loading] = useState(true)
    const [claims, set_claims] = useState<any>({}) // claims quyền của người dùng

    // Lắng nghe trạng thái đăng nhập hay chưa
    useEffect(() => (
        new Observable<User | null>(o => onAuthStateChanged(FirebaseAuth, o))
            .subscribe(u => {
                set_fuser(u)
                set_loading(false)
            })
            .unsubscribe
    ), [])

    // Lắng nghe sự thay đổi quyền hạn của người dùng mỗi khi set lại quyền
    useEffect(() => (
        new Observable<User | null>(o => onIdTokenChanged(FirebaseAuth, o))
            .subscribe(idtoken => {
                idtoken?.getIdTokenResult().then(c => set_claims(c.claims.$ || {}))
            })
            .unsubscribe
    ), [])

    // Check lại quyền
    const reload_permissions = () => FirebaseAuth.currentUser?.getIdToken(true)


    return {
        fuser, // Thông tin user trên firebase
        loading, // Chờ xử lý
        claims, // Quyền
        reload_permissions // Check lại quyền
    }
})