
import { theme } from "@/theme"
import { Button, HStack, SimpleGrid, Text, VStack, useColorMode } from "@chakra-ui/react"
import QRCode from "react-qr-code"

export const TableQr = () => {

    const { colorMode } = useColorMode()

    return (
        <VStack
            w='full'
            bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
            borderRadius='5px'
            border='1px'
            borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}
            spacing='5'
            pb='5'
        >
            <HStack
                w='full'
                p='4'
                borderBottom='1px'
                borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
                justifyContent='space-between'
            >
                <Text fontWeight='600'>Danh sách qr</Text>
                <Button size='sm' onClick={() => window.print()}>Xuất mã Qr</Button>
            </HStack>
            <SimpleGrid columns={[2, 3, 4, 6]} spacing='4' p='4' w='full'>
                <VStack
                    p='2'
                    border='1px solid'
                    borderColor={colorMode == 'dark' ? 'gray.600' : 'gray.200'}
                    w='full'
                    // key={table.id}
                    justifyContent='center'
                    borderRadius='5px'
                >
                    <QRCode
                        // bgColor='gray'
                        fgColor='teal'
                        // key={table.id}
                        size={80}
                        level='L'
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        // value={`https://qr-pos.vercel.app/restaurants/${r.id}/tables/${table.id}`}
                        value={``}
                        viewBox={`0 0 256 256`}
                    />
                    <HStack justifyContent='center' w='full'>
                        {/* <Text fontWeight='500'>{table.name} - {table.area?.name}</Text> */}
                        <Text fontWeight='600' color='teal.500'>Bàn A</Text>
                    </HStack>
                </VStack>
            </SimpleGrid>
        </VStack>

    )
}