import { FileUploader } from "@/components/common/FileUploader"
import { Brand, Category, Product, Resolution } from "@/type"
import { Button, FormControl, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Stack, Text, Textarea } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useCollectionData, useLiveQueryContext } from "@livequery/react"
import { Controller, useForm, useFieldArray, FormProvider } from "react-hook-form"
import { MdAdd, MdClose } from "react-icons/md"
import { TechnicalProps } from "./TechnicalsProps"

export type ProductModal = {
    product?: SmartQueryItem<Product>
    onClose: () => void
}

export const ProductModal = ({ onClose, product }: ProductModal) => {

    const { transporter } = useLiveQueryContext()
    const { items: brands } = useCollectionData<Brand>('brands')
    const { items: categories } = useCollectionData<Category>('categories')
    const { items: resolutions } = useCollectionData<Resolution>('resolutions')

    const form = useForm<Product>({
        defaultValues: {
            name: product?.name,
        }
    })
    const { register, handleSubmit, watch, control, formState, setValue, resetField } = form

    // product_info
    const { fields: specifications, append, remove } = useFieldArray({
        control,
        name: 'specifications',
    });

    const appendTechnical = (index: number) => {
        const updatedProductInfo = [...specifications];
        updatedProductInfo[index].technicals.push({ name: '', content: '' });
        setValue('product_info', updatedProductInfo);
    };

    // submit
    async function onSubmit(data: Product) {
        if (product) {
            product.__update(data)
        } else {
            await transporter.add(`products`, data)
        }
        onClose()
    }

    function onRemove() {
        product?.__remove()
        onClose()
    }

    return (
        <Modal
            isOpen={true}
            size={'3xl'}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent mx='2'>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <FormProvider {...form}>
                        <ModalHeader p='3' borderBottom='1px solid' borderColor={'gray.200'}>
                            {product ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm mới'}
                        </ModalHeader>
                        <ModalCloseButton borderRadius='full' mt='1' />
                        <ModalBody px={{ base: '2', md: '4' }} py='6'>
                            <Stack w='full' spacing='7'>
                                <pre>{JSON.stringify(watch(), null, 2)}</pre>
                                <Stack w='full' spacing='3'>
                                    <Text>Tên sản phẩm</Text>
                                    <Input
                                        placeholder='Nhập tên sản phẩm...'
                                        {...register('name', { required: true })}
                                        onFocus={e => e.target.select()}
                                    />
                                </Stack>
                                <Stack w='full' spacing='3'>
                                    <Text>Mã sản phẩm</Text>
                                    <Input
                                        placeholder='Nhập mã sản phẩm...'
                                        {...register('code', { required: true })}
                                        onFocus={e => e.target.select()}
                                    />
                                </Stack>

                                <Stack w='full' spacing='3'>
                                    <Text>Danh mục sản phẩm</Text>
                                    <FormControl isRequired>
                                        <Select
                                            alignSelf='center'
                                            variant='outline'
                                            {...register("category_id")}
                                        >
                                            {
                                                categories.map(brand => (
                                                    <option
                                                        value={brand.id}
                                                        key={brand.id}
                                                    >
                                                        {brand.name}
                                                    </option>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <Stack w='full' spacing='3'>
                                    <Text>Thương hiệu</Text>
                                    <FormControl isRequired>
                                        <Select
                                            alignSelf='center'
                                            variant='outline'
                                            {...register("brand_id")}
                                        >
                                            {
                                                brands.map(brand => (
                                                    <option
                                                        value={brand.id}
                                                        key={brand.id}
                                                    >
                                                        {brand.name}
                                                    </option>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <Stack w='full' spacing='3'>
                                    <Text>Độ phân giải</Text>
                                    <FormControl isRequired>
                                        <Select
                                            alignSelf='center'
                                            variant='outline'
                                            {...register("resolution_id")}
                                        >
                                            {
                                                resolutions.map(brand => (
                                                    <option
                                                        value={brand.id}
                                                        key={brand.id}
                                                    >
                                                        {brand.name}
                                                    </option>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <SimpleGrid w='full' columns={[3]} spacing='3'>
                                    <Stack w='full' spacing='3'>
                                        <Text>Giá nhập</Text>
                                        <Input
                                            placeholder='Nhập giá nhập...'
                                            {...register('cost', { required: true })}
                                            onFocus={e => e.target.select()}
                                            type="number"
                                        />
                                    </Stack>
                                    <Stack w='full' spacing='3'>
                                        <Text>Giá bán</Text>
                                        <Input
                                            placeholder='Nhập giá bán...'
                                            {...register('price', { required: true })}
                                            onFocus={e => e.target.select()}
                                            type="number"
                                        />
                                    </Stack>
                                    <Stack w='full' spacing='3'>
                                        <Text>Giá quảng cáo</Text>
                                        <Input
                                            placeholder='Nhập quảng cáo...'
                                            {...register('advertising_price', { required: true })}
                                            onFocus={e => e.target.select()}
                                            type="number"
                                        />
                                    </Stack>
                                </SimpleGrid>
                                <Stack w='full' spacing='3'>
                                    <Text>Số lượng</Text>
                                    <Input
                                        placeholder='Nhập số lượng...'
                                        {...register('amount', { required: true })}
                                        onFocus={e => e.target.select()}
                                        type="number"
                                    />
                                </Stack>
                                <Stack w='full' spacing='3'>
                                    <Text fontWeight='400'>Ảnh</Text>
                                    <FormControl>
                                        <Controller
                                            name='image'
                                            control={control}
                                            render={FileUploader}
                                        />
                                    </FormControl>
                                </Stack>

                                <Stack w='full' spacing='3'>
                                    <Text>Thống số kĩ thuật</Text>
                                    <Stack w='full'>
                                        {
                                            specifications.map((specification, index) => (
                                                <HStack w='full' key={specification.id}>
                                                    <Stack w='full' spacing='0' borderRadius='10px' border='1px' borderColor={'blackAlpha.200'}>
                                                        <HStack p='3' borderBottom='1px' borderColor='blackAlpha.50' borderTopRadius='10px' bg='blackAlpha.50' justifyContent='space-between'>
                                                            <Input {...register(`specifications.${index}.name` as const)} variant='unstyled' placeholder='Nhập tên bảng...' />
                                                            <IconButton size='sm' aria-label="close" onClick={() => confirm('Bạn chắc chắn xóa không !') && remove(index)} icon={<MdClose />} />
                                                        </HStack>
                                                        <TechnicalProps name={`specifications.${index}`} />
                                                    </Stack>
                                                </HStack>
                                            ))
                                        }
                                        <Button leftIcon={<MdAdd />} onClick={() => append({ name: '', technicals: [{ name: '', content: '' }] })}>Add Product Info</Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </ModalBody>
                        <ModalFooter p={{ base: '2', md: '4' }}>
                            <HStack w='full' justifyContent='space-between'>
                                <HStack>
                                    {
                                        product && (
                                            <Button onClick={onRemove} variant='ghost' colorScheme='red'>Xóa</Button>
                                        )
                                    }
                                </HStack>
                                <HStack>
                                    <Button onClick={onClose} variant='ghost' colorScheme='teal'>Hủy</Button>
                                    <Button
                                        variant='solid'
                                        colorScheme='teal'
                                        type="submit"
                                        isLoading={formState.isSubmitting}
                                    >
                                        {product ? 'Cập nhật' : 'Tạo mới'}
                                    </Button>
                                </HStack>
                            </HStack>
                        </ModalFooter>
                    </FormProvider>
                </form>
            </ModalContent>
        </Modal>
    )
}