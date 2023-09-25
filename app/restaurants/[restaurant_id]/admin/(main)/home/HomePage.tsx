
import { theme } from "@/theme";
import { Center, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/layout";
import { useColorMode } from "@chakra-ui/react";
import { FiShoppingBag } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RestaurantInfo } from "./RestaurantInfo";

export const HomePage = () => {

    const { colorMode } = useColorMode()
    const RepportListMap = {
        orders: {
            name: 'Đơn hàng',
            icon: <FiShoppingBag size='35px' />,
            value: 10000000,
            color: '#6ADA7D',
        },
        revenue: {
            name: 'Doanh thu',
            icon: <RiMoneyDollarCircleLine size='40px' />,
            value: 10000000,
            color: '#299CDB',
        }
    }

    return (
        <VStack w='full' spacing='5'>
            <VStack
                w='full'
                bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
                borderRadius='5px'
                border='1px'
                borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}
                spacing='5'
            >
                <HStack w='full' p='4' borderBottom='1px' borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}>
                    <Text fontWeight='600'>Báo cáo</Text>
                </HStack>
                <SimpleGrid w='full' columns={[1, 1, 2, 2]} spacing='4' px='4' pb='5'>
                    {
                        Object.entries(RepportListMap).map(([status, { color, icon, name, value }]) => (
                            <HStack
                                key={status}
                                w='full'
                                p='4'
                                bg={colorMode == 'dark' ? '#2F3031' : 'white'}
                                boxShadow='md'
                                borderRadius='5px'
                                _hover={{
                                    borderRadius: '5px',
                                    transform: 'translateY(-5px)',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <Center boxSize='60px' color={color}>
                                    {icon}
                                </Center>
                                <VStack w='full' align='flex-start'>
                                    <Text textTransform='uppercase' opacity='0.8'>{name}</Text>
                                    <Text fontWeight='600' fontSize='24px'>{value.toLocaleString()}</Text>
                                </VStack>
                            </HStack>
                        ))
                    }
                </SimpleGrid>
            </VStack>
            <RestaurantInfo />
        </VStack>
    )
}