"use client";

import { getRestaurantContext } from "./useRestaurant";
import { createContextFromHook } from "@livequery/react";
import { useFirebaseUserContext } from "./useFirebaseUser";

export const [
    usePermissionsContext,
    PermissionsContextProvider
] = createContextFromHook(() => {

    const { claims } = useFirebaseUserContext() // Lấy thông tin của user
    const r = getRestaurantContext()

    const is_owner = claims?.[r.id]?.includes('owner')// Chủ cửa hàng
    const is_manager = claims?.[r.id]?.includes('manager') // Quản lý
    const is_staff = claims?.[r.id]?.includes('staff') // Nhân viên
    const is_cashier = claims?.[r.id]?.includes('cashier') // Nhân viên thu ngân
    const is_owner_or_manager = claims?.[r.id]?.includes('owner') || claims?.[r.id]?.includes('manager') // Chủ và quản lý
    const is_owner_or_manager_or_staff = claims?.[r.id]?.includes('owner') || claims?.[r.id]?.includes('manager') || claims?.[r.id]?.includes('staff') // Chủ, quản lý, nhân viên
    const canViewtables = claims?.[r.id]?.includes('owner') || claims?.[r.id]?.includes('manager') || claims?.[r.id]?.includes('staff') || claims?.[r.id]?.includes('cashier') // Chủ, quản lý, nhân viên, thu ngân
    const is_owner_or_manager_or_cashier = claims?.[r.id]?.includes('owner') || claims?.[r.id]?.includes('manager') || claims?.[r.id]?.includes('cashier') // Chủ, quản lý, thu ngân

    return {
        is_owner,
        is_staff,
        is_manager,
        is_cashier,
        is_owner_or_manager,
        is_owner_or_manager_or_staff,
        is_owner_or_manager_or_cashier,
        canViewtables
    }
})