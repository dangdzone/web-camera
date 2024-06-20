import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiChevronUp } from "react-icons/fi";

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <HStack w='full' maxW='6xl' justifyContent='flex-end'>
            {
                isVisible && (
                    <Button borderRadius='10px' onClick={scrollToTop} zIndex='999' bottom={{ base: '100px', md: '30px' }} right='10px' position="fixed" p='1' colorScheme='red'>
                        <VStack spacing='0'>
                            <FiChevronUp />
                            <Text fontSize='10px'>Lên đầu</Text>
                        </VStack>
                    </Button>
                )
            }
        </HStack>
    );
};
