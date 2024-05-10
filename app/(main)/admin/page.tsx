'use client'
import { Tabs, TabList, Tab, TabPanels, TabPanel, TabIndicator, VStack } from "@chakra-ui/react";
import { StatisticalPage } from "./statistical/StatisticalPage";
import CategoryProductPage from "./category-product/CategoryProductPage";

export default function AdminPage() {
    return (
        <Tabs w='full' variant='unstyled' position='relative'>
            <TabList pt='5'>
                <Tab fontWeight='600'>Thống kê</Tab>
                <Tab fontWeight='600'>Danh mục & sản phẩm</Tab>
                <Tab fontWeight='600'>Độ phân giải</Tab>
                <Tab fontWeight='600'>Hãng</Tab>
                <Tab fontWeight='600'>Thông tin cửa hàng</Tab>
            </TabList>
            <TabIndicator mt='-1.5px' height='2px' bg='cyan.500' borderRadius='1px' />
            <TabPanels p='0'>
                <TabPanel p='0'>
                    <StatisticalPage />
                </TabPanel>
                <TabPanel p='0'>
                    <CategoryProductPage />
                </TabPanel>
                <TabPanel p='0'>
                    <p>three!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}