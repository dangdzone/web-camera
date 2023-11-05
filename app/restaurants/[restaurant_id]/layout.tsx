
import { ReactNode } from 'react';
import { RestaurantContextProvider } from '../../../hooks/useRestaurant';
import { PermissionsContextProvider } from '../../../hooks/usePermissions';
import { Center, Text, VStack } from '@chakra-ui/layout';

export default async function RestaurantContextLayout({ children, params }: { children: ReactNode, params: any }) {

    const url = `${process.env.NEXT_PUBLIC_API}/restaurants/${params.restaurant_id}`

    // fetch Lấy dữ liệu từ trên BE về server component(FE) convert thành JSON
    const r = await fetch(url, { cache: 'no-store' }).then(r => r.json()) 
    if (r.data?.item) {
        return (
            <RestaurantContextProvider value={r.data.item as any}>
                <PermissionsContextProvider>
                    {children}
                </PermissionsContextProvider>
            </RestaurantContextProvider>
        );
    }

    return (
        <Center w='full' h='100vh'>
            <VStack>
                <Text>Không tìm thấy nhà hàng có id là</Text>
                <Text>{`${params.restaurant_id}`}</Text>
            </VStack>
        </Center>
    )
}