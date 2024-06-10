import { Order } from "@/type"
import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"

export type VietQRModal = {
    order: SmartQueryItem<Order>
    onClose: () => void
}

export const VietQRModal = ({ onClose, order }: VietQRModal) => {

    const BANK_ID = 'vietcombank'
    const ACCOUNT_NO = '9814201002'
    const ACCOUNT_NAME = 'NGUYEN%VAN%DANG'
    const DESCRIPTION = order?.id

    return (
        <Modal isOpen={true} onClose={onClose} size={'2xl'}>
            <ModalOverlay />
            <ModalContent mx='2' borderRadius='15px'>
                <ModalHeader>Thanh toán đơn hàng ({order?.code})</ModalHeader>
                <ModalCloseButton />
                <ModalBody px={{ base: '2', md: '4' }} py='6'>
                    <VStack w='full'>
                        <Image maxH='500px' src={`https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact2.jpg?amount=${order?.pay}&addInfo=${DESCRIPTION}&accountName=${ACCOUNT_NAME}`} />
                    </VStack>
                </ModalBody>
                <ModalFooter p={{ base: '2', md: '4' }}>
                    <VStack w='full'>
                        <Button variant='ghost' colorScheme='red'>Đóng</Button>
                    </VStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}