
import { VStack } from "@chakra-ui/layout";
import { ReactNode } from "react";
import { TopbarAdmin } from "./TopbarAdmin";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <VStack w='full' minH='100vh' spacing='0'>
            <TopbarAdmin />
            {children}
        </VStack>
    )
}