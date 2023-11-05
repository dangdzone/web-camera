'use client'

import { VStack } from "@chakra-ui/layout";
import React, { PropsWithChildren } from "react";
import { TopbarTable } from "./TopbarTable";
import { useDocumentData } from "@livequery/react";
import { Restaurant, RestaurantTable } from "@/types";
import { Spinner } from "@chakra-ui/react";


export default function LayoutTable(props: {
    children: React.ReactNode,
    params: {
        restaurant_id: string,
        table_id: string,
        order_id: string
    }
}) {

    const $restaurant = useDocumentData<Restaurant>(`restaurants/${props.params.restaurant_id}`)
    const $tables = useDocumentData<RestaurantTable>(`restaurants/${props.params.restaurant_id}/tables/${props.params.table_id}`)

    const restaurant = $restaurant.item
    const table = $tables.item

    return (
        <VStack w='full' minH='100vh' spacing='0'>
            <TopbarTable
                restaurant={restaurant}
                table={table}
                order_id={props.params.order_id}
            />
            {props.children}
        </VStack>
    )
}