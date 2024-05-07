import { Divider, HStack, Stack, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
export const Category = () => {

    const CategpryList = [
        { name: 'Camera trong nhà', img: 'https://bizweb.dktcdn.net/100/466/218/themes/902380/assets/menu_icon_1.png?1713168783723', category: 'camera-trong-nha' },
        { name: 'Camera ngoài trời', img: 'https://bizweb.dktcdn.net/100/466/218/themes/902380/assets/menu_icon_2.png?1713168783723', category: 'camera-ngoai-troi' },
        { name: 'Camera pin sạc', img: 'https://bizweb.dktcdn.net/100/466/218/themes/902380/assets/menu_icon_3.png?1713168783723', category: 'camera-sac-pin' },
        { name: 'Camera nhận diện', img: 'https://phuongviethcm.com/wp-content/uploads/2021/08/san-pham-iDS-2CD7126G0-IZS.png', category: 'camera-nhan-dien' },
        { name: 'Camera ban đêm', img: 'https://bizweb.dktcdn.net/thumb/grande/100/325/396/products/camera-wifi-mou-ipc-f42fp-4mp-1.jpg?v=1632458181543', category: 'camera-ban-dem' },
        { name: 'Camera hồng ngoại', img: 'https://content2.rozetka.com.ua/goods/images/big/290374534.png', category: 'camera-hong-ngoai' },
    ]

    const path = usePathname()

    return (
        <Stack w='full' maxW='300px' p='2' borderRight='1px' borderColor='blackAlpha.100'>
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
    )
}