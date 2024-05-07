import { SearchBox } from "@/components/common/SearchBox";
import { HStack, VStack } from "@chakra-ui/layout";
import { ReactNode } from "react";


export default function CamaraTrongNha({ children }: { children: ReactNode }) {
    return (
        <VStack w='full'>
            <HStack w='full'>
                {/* <SearchBox placeholder="Tìm kiếm" /> */}
            </HStack>
            {children}
        </VStack>
    )
}