
import { getRestaurantContext } from "@/hooks/useRestaurant"
import { theme } from "@/theme"
import { Restaurant } from "@/types"
import { HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { Alert, AlertIcon, Button, FormControl, Input, Radio, RadioGroup, useColorMode } from "@chakra-ui/react"
import { useLiveQueryContext } from "@livequery/react"
import { Controller, useForm } from "react-hook-form"

export const RestaurantInfo = () => {

    const { colorMode } = useColorMode()
    const r = getRestaurantContext()
    const { transporter } = useLiveQueryContext()
    const { register, handleSubmit, watch, control, formState: { errors, isSubmitting, isDirty }, reset } = useForm<Restaurant>({
        defaultValues: {
            name: r?.name,
            address: r?.address,
            phone: r?.phone,
            status: r?.status
        }
    })

    async function onSubmit(data: Restaurant) {
        await transporter.update(`restaurants/${r.id}`, data)
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
                            isDirty && <Button size='sm' colorScheme='red' onClick={() => reset()}>Hủy</Button>
                        }
                        {
                            isDirty && <Button size='sm' colorScheme='blue' type="submit">Lưu</Button>
                        }
                    </HStack>
                </HStack>
                {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
                <VStack w='full' px='4' pb='5' spacing='7'>
                    <VStack w='full' align='flex-start'>
                        <Text>Tên chi nhánh</Text>
                        <Input
                            placeholder='Nhập tên nhà hàng...'
                            size='md'
                            {...register('name', {
                                required: "Tên nhà hàng không được để trống",
                                minLength: { value: 7, message: "Tên nhà hàng phải có ít nhất 7 kí tự" },
                                maxLength: { value: 50, message: "Tên nhà hàng không được quá 50 kí tự" },
                                pattern: {
                                    value: /^(?=.*[a-zA-Z])[a-zA-Z0-9\sÀ-ỹ!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/,
                                    message: "Tên nhà hàng phải chứa cả chữ và không chứa kí tự đặc biệt"
                                },
                            })}
                            onFocus={e => e.target.select()}
                        />
                        {
                            errors.name && (
                                <Alert status="error" p='2' borderRadius='10px'>
                                    <AlertIcon />
                                    {errors.name.message}
                                </Alert>
                            )
                        }
                    </VStack>
                    <VStack w='full' align='flex-start'>
                        <Text>Địa chỉ</Text>
                        <Input
                            placeholder='Nhập địa chỉ...'
                            size='md'
                            {...register('address', {
                                required: 'Địa chỉ nhà hàng không được bỏ trống',
                                minLength: { value: 15, message: "Tên nhà hàng phải có ít nhất 15 kí tự" },
                                pattern: {
                                    value: /^(?=.*[a-zA-Z])[a-zA-Z0-9\sÀ-ỹ!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/,
                                    message: "Địa chỉ nhà hàng chỉ được chứa chữ cái, số và khoảng trắng"
                                },
                            })}
                            onFocus={e => e.target.select()}
                        />
                        {
                            errors.address && (
                                <Alert status="error" p='2' borderRadius='10px'>
                                    <AlertIcon />
                                    {errors.address.message}
                                </Alert>
                            )
                        }
                    </VStack>
                    <VStack w='full' align='flex-start'>
                        <Text>Số điện thoại</Text>
                        <Input
                            placeholder='Nhập số điện thoại...'
                            size='md'
                            type="tel"
                            {...register('phone', {
                                required: "Số điện thoại không được để trống",
                                pattern: {
                                    value: /^0\d{9}$/,
                                    message: "Số điện thoại phải chứa số và bắt đầu bằng số 0"
                                },
                                minLength: { value: 10, message: "Số điện thoại phải có ít nhất 10 chữ số" },
                                maxLength: { value: 15, message: "Số điện thoại không được quá 15 chữ số" }
                            })}
                            onFocus={e => e.target.select()}
                        />
                        {
                            errors.phone && (
                                <Alert status="error" p='2' borderRadius='10px'>
                                    <AlertIcon />
                                    {errors.phone.message}
                                </Alert>
                            )
                        }
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