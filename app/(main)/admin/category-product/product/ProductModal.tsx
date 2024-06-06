import { FileUploader } from "@/components/common/FileUploader"
import { Brand, Category, Product, Resolution } from "@/type"
import { Button, FormControl, HStack, IconButton, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, SimpleGrid, Stack, Text, Textarea } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useCollectionData, useLiveQueryContext } from "@livequery/react"
import { Controller, useForm, useFieldArray, FormProvider } from "react-hook-form"
import { MdAdd, MdClose } from "react-icons/md"
import { TechnicalProps } from "./TechnicalsProps"
import { ProductInfoList } from "@/text"

export type ProductModal = {
    product?: SmartQueryItem<Product>
    onClose: () => void
}

export const ProductModal = ({ onClose, product }: ProductModal) => {

    const { transporter } = useLiveQueryContext()
    const $brands = useCollectionData<Brand>('brands')
    const $categories = useCollectionData<Category>('categories')
    const $resolutions = useCollectionData<Resolution>('resolutions')

    const form = useForm<Product>({
        defaultValues: {
            name: product?.name,
            status: product?.status ?? 'active',
            amount: product?.amount,
            cost: product?.cost,
            code: product?.code,
            price: product?.price,
            advertising_price: product?.advertising_price,
            brand_id: product?.brand_id,
            specifications: product?.specifications,
            infos: product?.infos,
            category_id: product?.category_id,
            image: product?.image,
            resolution_id: product?.resolution_id,
            description: product?.description,
            outstandings: product?.outstandings
        }
    })

    const { register, handleSubmit, watch, control, formState, setValue, resetField } = form

    // product_info
    const $specifications = useFieldArray({
        control,
        name: 'specifications',
    });

    const $infos = useFieldArray({
        control,
        name: 'infos',
    });

    const $outstandings = useFieldArray({
        control,
        name: 'outstandings',
    });

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
                        <ModalHeader p='3'>
                            {product ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm mới'}
                        </ModalHeader>
                        <ModalCloseButton borderRadius='full' mt='1' />
                        <ModalBody px={{ base: '2', md: '4' }} py='6'>
                            <Stack w='full' spacing='7'>
                                {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
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
                                    <Text>Trạng thái</Text>
                                    <FormControl>
                                        <Controller
                                            name="status"
                                            control={control}
                                            render={({ field }) => (
                                                <RadioGroup
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                >
                                                    <Stack spacing={5} direction='row'>
                                                        <Radio size='lg' colorScheme='blue' value='active'>
                                                            Hiển thị
                                                        </Radio>
                                                        <Radio size='lg' colorScheme='red' value='inactive'>
                                                            Đóng
                                                        </Radio>
                                                    </Stack>
                                                </RadioGroup>
                                            )}
                                        />
                                    </FormControl>
                                </Stack>
                                <Stack w='full' spacing='3'>
                                    <Text>Danh mục sản phẩm</Text>
                                    {
                                        !$categories.loading && (
                                            <FormControl isRequired>
                                                <Select
                                                    alignSelf='center'
                                                    variant='outline'
                                                    {...register("category_id")}
                                                >
                                                    {
                                                        $categories.items.map(brand => (
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
                                        )
                                    }
                                </Stack>
                                <Stack w='full' spacing='3'>
                                    <Text>Thương hiệu</Text>
                                    {
                                        !$brands.loading && (
                                            <FormControl isRequired>
                                                <Select
                                                    alignSelf='center'
                                                    variant='outline'
                                                    {...register("brand_id", { required: true })}
                                                >
                                                    {
                                                        $brands.items.map(brand => (
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
                                        )
                                    }
                                </Stack>
                                <Stack w='full' spacing='3'>
                                    <Text>Độ phân giải</Text>
                                    {
                                        !$resolutions.loading && (
                                            <FormControl isRequired>
                                                <Select
                                                    alignSelf='center'
                                                    variant='outline'
                                                    {...register("resolution_id")}
                                                >
                                                    {
                                                        $resolutions.items.map(brand => (
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
                                        )
                                    }
                                </Stack>
                                <SimpleGrid w='full' columns={[3]} spacing='3'>
                                    <Stack w='full' spacing='3'>
                                        <Text>Giá nhập</Text>
                                        <Input
                                            placeholder='Nhập giá nhập...'
                                            {...register('cost', { required: true, valueAsNumber: true })}
                                            onFocus={e => e.target.select()}
                                            type="number"
                                        />
                                    </Stack>
                                    <Stack w='full' spacing='3'>
                                        <Text>Giá bán</Text>
                                        <Input
                                            placeholder='Nhập giá bán...'
                                            {...register('price', { required: true, valueAsNumber: true })}
                                            onFocus={e => e.target.select()}
                                            type="number"
                                        />
                                    </Stack>
                                    <Stack w='full' spacing='3'>
                                        <Text>Giá quảng cáo</Text>
                                        <Input
                                            placeholder='Nhập quảng cáo...'
                                            {...register('advertising_price', { required: true, valueAsNumber: true })}
                                            onFocus={e => e.target.select()}
                                            type="number"
                                        />
                                    </Stack>
                                </SimpleGrid>
                                <Stack w='full' spacing='3'>
                                    <Text>Số lượng</Text>
                                    <Input
                                        placeholder='Nhập số lượng...'
                                        {...register('amount', { required: true, valueAsNumber: true })}
                                        onFocus={e => e.target.select()}
                                        type="number"
                                    />
                                </Stack>
                                <Stack w='full' spacing='3'>
                                    <Text>Ghi chú</Text>
                                    <Textarea
                                        placeholder='Nhập ghi chú...'
                                        {...register('description')}
                                        onFocus={e => e.target.select()}
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
                                    <Text>Đặc điểm nổi bật</Text>
                                    <Stack w='full'>
                                        {
                                            $outstandings.fields.map((outstanding, index) => (
                                                <InputGroup w='full' key={outstanding.id}>
                                                    <InputRightElement onClick={() => confirm('Bạn chắc chắn xóa không !') && $outstandings.remove(index)} cursor='pointer'>
                                                        <MdClose />
                                                    </InputRightElement>
                                                    <Input {...register(`outstandings.${index}.name`)} placeholder='Nhập đặc điểm nổi bật...' />
                                                </InputGroup>
                                            ))
                                        }
                                        <Button size='sm' leftIcon={<MdAdd />} onClick={() => $outstandings.append({ name: '' })}>Thêm đặc điểm nổi bật</Button>
                                    </Stack>
                                </Stack>
                                <Stack w='full' spacing='3'>
                                    <Text>Thống số kĩ thuật</Text>
                                    <Stack w='full'>
                                        {
                                            $specifications.fields.map((specification, index) => (
                                                <Stack w='full' key={specification.id} spacing='0' borderRadius='10px' border='1px' borderColor={'blackAlpha.200'}>
                                                    <InputGroup w='full' p='2' borderBottom='1px' borderColor='blackAlpha.50' borderTopRadius='10px' bg='blackAlpha.50'>
                                                        <InputRightElement onClick={() => confirm('Bạn chắc chắn xóa không !') && $specifications.remove(index)} cursor='pointer'>
                                                            <MdClose />
                                                        </InputRightElement>
                                                        <Input variant='unstyled' {...register(`specifications.${index}.name`)} placeholder='Nhập tên bảng...' />
                                                    </InputGroup>
                                                    <TechnicalProps name={`specifications.${index}`} />
                                                </Stack>
                                            ))
                                        }
                                        <Button size='sm' leftIcon={<MdAdd />} onClick={() => $specifications.append({ name: '', technicals: [{ name: '', content: '' }] })}>Thêm bảng mới</Button>
                                    </Stack>
                                </Stack>

                                <Stack w='full' spacing='3'>
                                    <Text>Thông tin sản phẩm</Text>
                                    <Stack w='full'>
                                        {
                                            $infos.fields.map((info, i) => (
                                                <Stack w='full' key={info.id} flexDirection='row'>
                                                    <FormControl w='40%'>
                                                        <Select
                                                            alignSelf='center'
                                                            {...register(`infos.${i}.name`)}
                                                            size='sm'
                                                        >
                                                            {
                                                                Object.entries(ProductInfoList).map(([name_id, { name, icon }]) => (
                                                                    <option
                                                                        value={name_id}
                                                                        key={name_id}
                                                                    >
                                                                        {name}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                    <Textarea size='sm' {...register(`infos.${i}.content`)} placeholder='Nhập nội dung...' />
                                                    <IconButton size='sm' aria-label="close" onClick={() => confirm('Bạn chắc chắn xóa không !') && $infos.remove(i)} icon={<MdClose />} />
                                                </Stack>
                                            ))
                                        }
                                        <Button size='sm' leftIcon={<MdAdd />} onClick={() => $infos.append({ name: '', content: '' })}>Thêm thông tin mới</Button>
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