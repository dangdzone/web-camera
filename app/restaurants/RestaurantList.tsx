
import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/layout"
import { RestarantItem } from "./RestaurantItem"
import { useState } from "react"
import { Button, Spinner, useColorMode } from "@chakra-ui/react"
import { FiPlus } from "react-icons/fi"
import { theme } from "@/theme"
import { useCollectionData } from "@livequery/react"
import { Restaurant } from "@/types"
import { RestaurantModal } from "./RestaurantModal"
import { usePermissionsContext } from "@/hooks/usePermissions"
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { AlertModal } from "@/components/common/AlertModal"


export const Restaurantlist = () => {

    const { colorMode } = useColorMode()
    const [active_restaurant, set_active_restaurant] = useState<boolean>(false)
    const { fuser } = useFirebaseUserContext()
    const $restaurants = useCollectionData<Restaurant>(`owners/${fuser?.uid}/restaurants`)
    const [alert_restaurant, set_alert_restaurant] = useState<Boolean>(false)
    const p = usePermissionsContext()

    return (
        <VStack
            w='full'
            bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
            borderRadius='5px'
            border='1px'
            borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}
            spacing='5'
            pb='5'
        >
            <HStack
                w='full'
                p='4'
                borderBottom='1px'
                borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
                justifyContent='space-between'
            >
                <Text fontWeight='600'>Danh sách nhà hàng</Text>
                <Button size='sm' leftIcon={<FiPlus />} onClick={() => set_active_restaurant(true)}>Tạo chi nhánh</Button>
            </HStack>
            {
                active_restaurant != false && (
                    <RestaurantModal
                        onClose={() => set_active_restaurant(false)}
                        alert_check={() => set_alert_restaurant(true)}
                    />
                )
            }
            {alert_restaurant && <AlertModal onClose={() => set_alert_restaurant(false)} title={'Tạo nhà hàng thành công !'} />}
            <SimpleGrid w='full' columns={[1, 1, 2, 2]} spacing='4' px={{ base: '2', md: '4' }}>
                {
                    $restaurants.items.map(restaurant => (
                        <RestarantItem key={restaurant.id} restaurant={restaurant} />
                    ))
                }
            </SimpleGrid>
            {
                $restaurants.loading && <Spinner color="teal.500" size='lg' />
            }
            {
                $restaurants.empty && <Text fontSize='18px' color="teal.500">Chưa có nhà hàng nào...</Text>
            }
        </VStack>
    )
}