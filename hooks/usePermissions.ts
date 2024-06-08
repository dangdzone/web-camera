"use client";

import { createContextFromHook } from "@livequery/react";
import { useFirebaseUserContext } from "./useFirebaseUser";

export const [
    usePermissionsContext,
    PermissionsContextProvider
] = createContextFromHook(() => {

    const { fuser } = useFirebaseUserContext() // Lấy thông tin của user
    const is_owner = ['nguyenvandang.co@gmail.com'].includes(`${fuser?.email}`)
    const is_editor = ['dangdz10x@gmail.com', 'zzznguyenmy@gmail.com', 'nguyentuananh241102@gmail.com', 'tngthanh62@gmail.com', 'nguyenvandang.co@gmail.com'].includes(`${fuser?.email}`)

    return { is_owner, is_editor }

})