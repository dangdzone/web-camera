
import { FileUploader } from "@/components/common/FileUploader"
import { getRestaurantContext } from "@/hooks/useRestaurant"
import { FoodStatusMap } from "@/text"
import { Category, Food } from "@/types"
import { VStack, Text, HStack, Wrap } from "@chakra-ui/layout"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    ModalFooter,
    Button,
    useColorMode,
    FormControl,
    Select,
    Alert,
    AlertIcon
} from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useLiveQueryContext } from "@livequery/react"
import { Controller, useForm } from "react-hook-form"

export type FoodModal = {
    food?: SmartQueryItem<Food>
    onClose: () => void
    categories: Category[]
    alert_check: () => void
    alert_remove: () => void
}

export const FoodModal = ({ onClose, food, categories, alert_check, alert_remove }: FoodModal) => {

    const r = getRestaurantContext()
    const { colorMode } = useColorMode()

    const { register, handleSubmit, watch, control, formState: { errors, isSubmitting } } = useForm<Food>({
        defaultValues: {
            name: food?.name,
            images: food?.images,
            price: food?.price,
            description: food?.description,
            category_id: food?.category_id,
            status: food?.status || 'active'
        }
    })

    const { transporter } = useLiveQueryContext()

    async function onSubmit(data: Food) {
        if (food) {
            food.__update(data)
        } else {
            await transporter.add(`restaurants/${r.id}/foods`, data)
        }
        alert_check()
        onClose()
    }

    function remove() {
        food?.__remove()
        alert_remove()
        onClose()
    }

    return (
        <Modal
            isOpen={true}
            size={'3xl'}
            onClose={onClose}
            scrollBehavior={'inside'}
        >
            <ModalOverlay />
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <ModalContent bg={colorMode == "dark" ? "#242526" : "white"} mx='2'>
                    <ModalHeader p='3' borderBottom='1px solid' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}>
                        {food ? 'Cập nhật' : 'Tạo mới'}
                    </ModalHeader>
                    <ModalCloseButton borderRadius='full' mt='1' />
                    <ModalBody
                        px={{ base: '2', md: '4' }} py='6'
                        sx={{
                            "::-webkit-scrollbar": {
                                w: { base: 'none', md: '2' },
                            },
                            '&::-webkit-scrollbar-thumb': {
                                borderRadius: '10',
                                bg: '#c0c1c1',
                            },
                        }}
                    >
                        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
                        <VStack w='full' spacing='7'>
                            <VStack w='full' spacing='4' align='flex-start'>
                                <Text fontWeight='400'>Tên món</Text>
                                <Input
                                    placeholder='Nhập tên món...'
                                    size='md'
                                    {...register('name', {
                                        required: 'Tên món không được để trống',
                                        minLength: { value: 5, message: "Tên nhà hàng phải có ít nhất 5 kí tự" },
                                        maxLength: { value: 50, message: "Tên nhà hàng không được quá 50 kí tự" },
                                        pattern: {
                                            value: /^(?=.*[a-zA-Z])[a-zA-Z0-9\sÀ-ỹ!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/,
                                            message: "Tên món phải chứa cả chữ và không chứa kí tự đặc biệt"
                                        }
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
                            <VStack w='full' spacing='4' align='flex-start'>
                                <HStack w='full'>
                                    <Text>Trạng thái</Text>
                                </HStack>
                                <FormControl>
                                    <Controller
                                        name={'status'}
                                        control={control}
                                        render={({ field }) => (
                                            <Wrap spacing={4} w='full'>
                                                {
                                                    Object.entries(FoodStatusMap).map(([name_id, { name, color }]) => {
                                                        const selected = field.value == name_id
                                                        return (
                                                            <Button
                                                                key={name_id}
                                                                variant={selected ? 'solid' : 'outline'}
                                                                colorScheme={color}
                                                                size='sm'
                                                                px='5'
                                                                onClick={() => field.onChange(name_id)}
                                                            >
                                                                {name}
                                                            </Button>
                                                        )
                                                    }
                                                    )
                                                }
                                            </Wrap>
                                        )} />
                                </FormControl>
                            </VStack>

                            <VStack w='full' spacing='4' align='flex-start'>
                                <Text fontWeight='400'>Danh mục món</Text>
                                <FormControl isRequired>
                                    <Select
                                        color='gray.600'
                                        alignSelf='center'
                                        variant='outline'
                                        {...register("category_id")}
                                    >
                                        {
                                            categories.map(categories => (
                                                <option
                                                    value={categories.id}
                                                    key={categories.id}
                                                >
                                                    {categories.name}
                                                </option>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </VStack>
                            <VStack w='full' spacing='4' align='flex-start'>
                                <Text fontWeight='400'>Ảnh</Text>
                                <FormControl>
                                    <Controller
                                        name='images'
                                        control={control}
                                        render={FileUploader}
                                    />
                                </FormControl>
                            </VStack>

                            <VStack w='full' spacing='4' align='flex-start'>
                                <Text fontWeight='400'>Ghi chú món ăn</Text>
                                <Input
                                    placeholder='Nhập tên ghi chú...'
                                    size='md'
                                    {...register('description', { required: "Thêm ghi chú món ăn" })}
                                    onFocus={e => e.target.select()}
                                />
                                {
                                    errors.description && (
                                        <Alert status="error" p='2' borderRadius='10px'>
                                            <AlertIcon />
                                            {errors.description.message}
                                        </Alert>
                                    )
                                }
                            </VStack>
                            <VStack w='full' spacing='4' align='flex-start'>
                                <Text fontWeight='400'>Số tiền</Text>
                                <Input
                                    placeholder='Nhập số tiền...'
                                    size='md'
                                    type='number'
                                    {...register('price', {
                                        required: "Số tiền không được để trống",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Số tiền chỉ được nhập số"
                                        },
                                        minLength: { value: 4, message: "Số tiền phải có ít nhất 4 số" },
                                        maxLength: { value: 8, message: "Số tiền không được vượt quá 8 số" }
                                    })}
                                    onFocus={e => e.target.select()}
                                />
                                {
                                    errors.price && (
                                        <Alert status="error" p='2' borderRadius='10px'>
                                            <AlertIcon />
                                            {errors.price.message}
                                        </Alert>
                                    )
                                }
                            </VStack>
                        </VStack>
                    </ModalBody>
                    <ModalFooter p={{ base: '2', md: '4' }}>
                        <HStack w='full' justifyContent='space-between'>
                            <HStack>
                                {
                                    food && (
                                        <Button onClick={remove} variant='outline' colorScheme='red'>Xóa</Button>
                                    )
                                }
                            </HStack>
                            <HStack>
                                <Button onClick={onClose} variant='ghost' colorScheme='blue'>Hủy</Button>
                                <Button
                                    variant='solid'
                                    colorScheme='blue'
                                    type="submit"
                                    isLoading={isSubmitting}
                                >
                                    {food ? 'Cập nhật' : 'Tạo mới'}
                                </Button>
                            </HStack>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal >
    )
}