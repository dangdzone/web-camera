
import { theme } from "@/theme"
import { Restaurant } from "@/types"
import { HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { Button, FormControl, Input, Radio, RadioGroup, useColorMode } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { Controller, useForm } from "react-hook-form"

export type RestaurantInfo = {
    restaurant?: SmartQueryItem<Restaurant>
}

export const RestaurantInfo = ({ restaurant }: RestaurantInfo) => {

    const { colorMode } = useColorMode()
    // const r = getRestaurantContext()
    const { register, handleSubmit, watch, control, formState, reset } = useForm<Restaurant>({
        defaultValues: {
            name: restaurant?.name,
            address: restaurant?.address,
            phone: restaurant?.phone,
            status: restaurant?.status
        }
    })

    async function onSubmit(data: Restaurant) {
        console.log({ data })
        restaurant?.__update(data)
        reset(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <VStack
                w='full'
                bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
                borderRadius='5px'
                border='1px'
                borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}
                spacing='5'
                pb='5'
            >
                <HStack w='full' p='4' justifyContent='space-between' borderBottom='1px' borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}>
                    <Text fontWeight='600'>Thông tin cửa hàng</Text>
                    <HStack>
                        {
                            formState.isDirty && <Button size='sm' colorScheme='red' onClick={() => reset()}>Hủy</Button>
                        }
                        {
                            formState.isDirty && <Button size='sm' colorScheme='blue' type="submit">Lưu</Button>
                        }
                    </HStack>
                </HStack>
                {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
                <VStack w='full' px='4' pb='5' spacing='7'>
                    <VStack w='full' align='flex-start'>
                        <Text>Tên chi nhánh</Text>
                        <Input {...register('name', { required: true })} onFocus={e => e.target.select()} />
                    </VStack>
                    <VStack w='full' align='flex-start'>
                        <Text>Địa chỉ</Text>
                        <Input {...register('address', { required: true })} onFocus={e => e.target.select()} />
                    </VStack>
                    <VStack w='full' align='flex-start'>
                        <Text>Số điện thoại</Text>
                        <Input {...register('phone', { required: true })} onFocus={e => e.target.select()} />
                    </VStack>
                    <VStack w='full' align='flex-start'>
                        <Text>Trạng thái hoạt động</Text>
                        <FormControl>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        ml='4'
                                        value={field.value}
                                        onChange={field.onChange}
                                    >
                                        <Stack spacing={5} direction='row'>
                                            <Radio colorScheme='blue' value='active'>
                                                Đang hoạt động
                                            </Radio>
                                            <Radio colorScheme='red' value='inactive'>
                                                Đang đóng cửa
                                            </Radio>
                                        </Stack>
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                    </VStack>
                </VStack>
            </VStack>
        </form>
    )
}