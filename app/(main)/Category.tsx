import { Divider, HStack, Stack, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiAlignJustify, FiGrid } from "react-icons/fi"
export const Category = () => {

    const CategpryList = [
        { name: 'An ninh', img: 'https://bizweb.dktcdn.net/100/466/218/themes/902380/assets/menu_icon_1.png?1713168783723', category: 'camera-trong-nha' },
        { name: 'Hành trình', img: 'https://bizweb.dktcdn.net/100/466/218/themes/902380/assets/menu_icon_2.png?1713168783723', category: 'camera-ngoai-troi' },
        { name: 'Máy ảnh', img: 'https://bizweb.dktcdn.net/100/466/218/themes/902380/assets/menu_icon_3.png?1713168783723', category: 'camera-sac-pin' },
        { name: 'Flycam', img: 'https://phuongviethcm.com/wp-content/uploads/2021/08/san-pham-iDS-2CD7126G0-IZS.png', category: 'camera-nhan-dien' },
        { name: 'Gimbal', img: 'https://bizweb.dktcdn.net/thumb/grande/100/325/396/products/camera-wifi-mou-ipc-f42fp-4mp-1.jpg?v=1632458181543', category: 'camera-ban-dem' },
        { name: 'Lắp đặt', img: 'https://content2.rozetka.com.ua/goods/images/big/290374534.png', category: 'camera-hong-ngoai' },
    ]

    const path = usePathname()

    return (
        <Stack w='full' spacing='0' maxW='250px'>
            <HStack p='5' bg='cyan.600' color='white'>
                <FiAlignJustify size='25px' />
                <Text fontWeight='700'>Danh mục sản phẩm</Text>
            </HStack>
            <Stack w='full' h='100%' px='2' py='5' borderX='1px' borderColor='blackAlpha.200'>
                {
                    CategpryList.map((item, i) => {
                        const active = path.startsWith(`/${item.category}`)
                        return (
                            <Link key={item.category} href={`/${item.category}`}>
                                <HStack px='2' py='3' _hover={{ bg: 'blackAlpha.100' }} borderRadius='5px' bg={active ? 'blackAlpha.100' : 'white'}>
                                    <Image maxW='30px' borderRadius='5px' src={item.img} />
                                    <Text fontWeight='500'>{item.name}</Text>
                                </HStack>
                            </Link>
                        )
                    }
                    )
                }
            </Stack>
        </Stack>
    )
}