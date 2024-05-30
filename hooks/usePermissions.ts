"use client";

import { createContextFromHook } from "@livequery/react";
import { useFirebaseUserContext } from "./useFirebaseUser";

export const [
    usePermissionsContext,
    PermissionsContextProvider
] = createContextFromHook(() => {

    const { claims } = useFirebaseUserContext() // Lấy thông tin của user
    const is_owner = claims['']?.includes('owner')// Chủ cửa hàng
    
    return { is_owner }
})