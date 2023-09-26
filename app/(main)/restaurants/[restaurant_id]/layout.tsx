
import { RestaurantContextProvider } from "@/hooks/useRestaurant";
import { VStack } from "@chakra-ui/layout";
import { ReactNode } from "react";

export default async function RestaurantContextLayout({ children, params }: { children: ReactNode, params: any }) {

    // const url = `${process.env.NEXT_PUBLIC_API}/restaurants/${params.restaurant_id}`
    // const r = await fetch(url, { cache: 'no-store' }).then(r => r.json())
    // if (r.data?.item) {
    //     return (
    //         <RestaurantContextProvider value={r.data.item as any}>
    //             {children}
    //         </RestaurantContextProvider>
    //     )
    // }
    return (
        <VStack w='full'>
            {children}
        </VStack>
    )
}