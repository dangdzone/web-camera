'use client'
import { Tabs, TabList, Tab, TabPanels, TabPanel, TabIndicator, HStack, VStack } from "@chakra-ui/react";
import { StatisticalPage } from "./statistical/StatisticalPage";
import CategoryProductPage from "./category-product/CategoryProductPage";
import { ResolutionPage } from "./resolution/ResolutionPage";
import { BrandPage } from "./brand/BrandPage";
import { OrderPage } from "./orders/OrderPage";
import { useEffect, useState } from "react";
import { StorePage } from "./stores/StoreInfoPage";
import { usePermissionsContext } from "@/hooks/usePermissions";
import { DirectionalLink } from "@/components/common/DirectionalLink";
import { RiHome2Line } from "react-icons/ri";

export default function AdminPage() {

    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [loadedFromStorage, setLoadedFromStorage] = useState(false);
    const { is_editor } = usePermissionsContext()

    useEffect(() => {
        const tabFromStorage = localStorage.getItem('selectedTabIndex');
        if (tabFromStorage !== null) {
            setSelectedTabIndex(parseInt(tabFromStorage));
            setLoadedFromStorage(true);
        }
    }, []);

    useEffect(() => {
        if (loadedFromStorage) {
            localStorage.setItem('selectedTabIndex', selectedTabIndex.toString());
            window.history.replaceState(null, "", `?tab=${selectedTabIndex}`);
        }
    }, [selectedTabIndex, loadedFromStorage]);

    const handleTabChange = (index: number) => {
        setSelectedTabIndex(index);
    };

    return is_editor && (
        <VStack w='full' spacing='3' py='5'>
            <DirectionalLink directional={[
                { name: 'Trang chủ', href: '/', icon: <RiHome2Line /> },
                { name: 'Admin', href: '' },
            ]} />
            <Tabs w='full' variant='unstyled' position='relative' index={selectedTabIndex} onChange={handleTabChange}>
                <TabList  w='full' minW='10px' overflowX={{ base: 'scroll', md: 'auto' }}>
                    <Tab fontWeight='600' whiteSpace='nowrap'>Thống kê</Tab>
                    <Tab fontWeight='600' whiteSpace='nowrap'>Đơn hàng</Tab>
                    <Tab fontWeight='600' whiteSpace='nowrap'>Danh mục & sản phẩm</Tab>
                    <Tab fontWeight='600' whiteSpace='nowrap'>Độ phân giải</Tab>
                    <Tab fontWeight='600' whiteSpace='nowrap'>Thương hiệu</Tab>
                    <Tab fontWeight='600' whiteSpace='nowrap'>Hệ thống cửa hàng</Tab>
                </TabList>
                <TabIndicator mt='-1.5px' height='3px' bg='teal.500' borderRadius='full' />
                <TabPanels p='0'>
                    <TabPanel py='7' px='4'>
                        <StatisticalPage />
                    </TabPanel>
                    <TabPanel py='7' px='4'>
                        <OrderPage />
                    </TabPanel>
                    <TabPanel py='7' px='4'>
                        <CategoryProductPage />
                    </TabPanel>
                    <TabPanel py='7' px='4'>
                        <ResolutionPage />
                    </TabPanel>
                    <TabPanel py='7' px='4'>
                        <BrandPage />
                    </TabPanel>
                    <TabPanel py='7' px='4'>
                        <StorePage />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    )
}