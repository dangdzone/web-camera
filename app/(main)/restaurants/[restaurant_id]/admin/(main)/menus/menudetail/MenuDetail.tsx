
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerCloseButton,
    useColorMode,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from "@chakra-ui/react"
import { FoodList } from "./FoodList"
import { CategoryList } from "./CategoryList"

export type MenuDerail = {
    onClose: () => void
}

export const MenuDerail = ({ onClose }: MenuDerail) => {

    const { colorMode } = useColorMode()

    return (
        <Drawer onClose={onClose} isOpen={true} placement='left' size='lg'>
            <DrawerOverlay />
            <DrawerContent bg={colorMode == "dark" ? "#242526" : "white"} maxW='4xl'>
                <DrawerHeader borderBottomWidth='1px'>VIP2</DrawerHeader>
                <DrawerCloseButton mt='1.5' />
                <DrawerBody py='4' px={{ base: '2', md: '4' }}>
                    <Tabs w='full' position="relative">
                        <TabList>
                            <Tab p='4' fontWeight='600'>Món ăn</Tab>
                            <Tab p='4' fontWeight='600'>Danh mục món</Tab>
                        </TabList>
                        <TabIndicator
                            mt="-1.5px"
                            height="2px"
                            bg="blue.500"
                        />
                        <TabPanels>
                            <TabPanel px='0' py='7'>
                                <FoodList />
                            </TabPanel>
                            <TabPanel px='0' py='7'>
                                <CategoryList />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}