
import { getRestaurantContext } from "@/hooks/useRestaurant"
import { RestaurantTable } from "@/types"
import { HStack, Text, VStack, useColorMode } from "@chakra-ui/react"
import QRCode from "react-qr-code"

export type TableQr = {
    table: RestaurantTable
}

export const TableQr = ({ table }: TableQr) => {

    const r = getRestaurantContext()
    const { colorMode } = useColorMode()

    return (
        <VStack
            p='2'
            border='1px solid'
            borderColor={colorMode == 'dark' ? 'gray.600' : 'gray.200'}
            w='full'
            justifyContent='center'
            borderRadius='5px'
        >
            <QRCode
                fgColor='teal'
                size={80}
                level='L'
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={`https://menu-v1.vercel.app/restaurants/${r.id}/tables/${table.id}`}
                viewBox={`0 0 256 256`}
            />
            <HStack justifyContent='center' w='full'>
                <Text fontWeight='600' color='teal.500'>{table.name}</Text>
            </HStack>
        </VStack>

    )
}