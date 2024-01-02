import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useColorMode, Text, HStack } from "@chakra-ui/react"
import Link from "next/link"

export type CreateOrderModal = {
    onClose: () => void
    restaurant_id: string
    table_id: string
}

export const CreateOrderModal = (props: CreateOrderModal) => {
    const { colorMode } = useColorMode()

    return (
        <Modal isOpen={true} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent bg={colorMode == "dark" ? "#242526" : "white"} mx='2'>
                <ModalCloseButton />
                <ModalBody pt='20' pb='10'>
                    <Text w='full' textAlign='center' fontSize='25px'>Bạn có muốn tạo đơn hàng mới tại bàn này không !</Text>
                </ModalBody>

                <ModalFooter>
                    <HStack w='full' justifyContent='center'>
                        <Button colorScheme='blue' variant='ghost' onClick={props.onClose}>
                            Không
                        </Button>
                        <Link href={`/restaurants/${props?.restaurant_id}/tables/${props.table_id}`}>
                            <Button colorScheme="blue">Tạo đơn mới</Button>
                        </Link>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}