'use client'
import { Tabs, TabList, Tab, TabPanels, TabPanel, TabIndicator } from "@chakra-ui/react";
import { StatisticalPage } from "./statistical/StatisticalPage";
import CategoryProductPage from "./category-product/CategoryProductPage";
import { ResolutionPage } from "./resolution/ResolutionPage";
import { BrandPage } from "./brand/BrandPage";

export default function AdminPage() {
    return (
        <Tabs w='full' variant='unstyled' position='relative'>
            <TabList pt='5'>
                <Tab fontWeight='600'>Thống kê</Tab>
                <Tab fontWeight='600'>Danh mục & sản phẩm</Tab>
                <Tab fontWeight='600'>Độ phân giải</Tab>
                <Tab fontWeight='600'>Thương hiệu</Tab>
                <Tab fontWeight='600'>Thông tin cửa hàng</Tab>
            </TabList>
            <TabIndicator mt='-1.5px' height='3px' bg='teal.500' borderRadius='full' />
            <TabPanels p='0'>
                <TabPanel py='7' px='4'>
                    <StatisticalPage />
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
            </TabPanels>
        </Tabs>
    )
}