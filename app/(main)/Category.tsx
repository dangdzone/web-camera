import { Menu, MenuButton, Button, MenuList, MenuItem, Stack, Divider } from "@chakra-ui/react"
import { MdMenu } from "react-icons/md"

export const Categogy = () => {

    const CategoryCameraList = [
        { name: 'An ninh', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-camera-an-ninh_1.png' },
        { name: 'Action camera', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-action-cam_1.png' },
        { name: 'Hành trình', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-action-cam_1.png' },
        { name: 'Máy ảnh', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-may-anh.png' },
        { name: 'Flycam', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-flycam_1.png' },
        { name: 'Gimbal', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-gimbal_1.png' },
        { name: 'Tripod', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-tripods_1.png' },
        { name: 'Lắp đặt', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-camera-an-ninh-lap-dat_1.png' },
    ]

    return (
        <Menu>
            <MenuButton as={Button} size='sm' leftIcon={<MdMenu />}>
                Danh mục
            </MenuButton>
            <MenuList border='none' boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px' borderRadius='10px' py='0'>
                <Stack divider={<Divider />} spacing='0'>
                    {
                        CategoryCameraList.map((item, i, arr) => (
                            <MenuItem
                                py='3'
                                color='black'
                                key={i}
                                _hover={{
                                    bg: 'blackAlpha.100'
                                }}
                                borderTopRadius={i == 0 ? '10px' : '0px'}
                                borderBottomRadius={arr.length - 1 == i ? '10px' : '0px'}
                            >
                                {item.name}
                            </MenuItem>
                        ))
                    }
                </Stack>
            </MenuList>
        </Menu>
    )
}