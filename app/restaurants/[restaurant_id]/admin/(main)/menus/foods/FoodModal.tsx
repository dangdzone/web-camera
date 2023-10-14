
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
    Select
} from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useLiveQueryContext } from "@livequery/react"
import { Controller, useForm } from "react-hook-form"

export type FoodModal = {
    food?: SmartQueryItem<Food>
    onClose: () => void
    categories: Category[]
}

export const FoodModal = ({ onClose, food, categories }: FoodModal) => {

    const r = getRestaurantContext()
    const { colorMode } = useColorMode()

    const { register, handleSubmit, watch, control, formState } = useForm<Food>({
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
        onClose()
    }

    function remove() {
        food?.__remove()
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
            <ModalContent bg={colorMode == "dark" ? "#242526" : "white"} mx='2'>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
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
                                    {...register('name', { required: true })}
                                    onFocus={e => e.target.select()}
                                />
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
                                    {...register('description', { required: true })}
                                    onFocus={e => e.target.select()}
                                />
                            </VStack>
                            <VStack w='full' spacing='4' align='flex-start'>
                                <Text fontWeight='400'>Số tiền</Text>
                                <Input
                                    placeholder='Nhập số tiền...'
                                    size='md'
                                    type='number'
                                    {...register('price', { required: true, valueAsNumber: true })}
                                    onFocus={e => e.target.select()}
                                />
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
                                    isLoading={formState.isSubmitting}
                                >
                                    {food ? 'Cập nhật' : 'Tạo mới'}
                                </Button>
                            </HStack>
                        </HStack>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal >
    )
}