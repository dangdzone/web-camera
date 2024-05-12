import { Product } from "@/type";
import { HStack, Stack } from "@chakra-ui/layout"
import { Button, FormControl, FormLabel, IconButton, Input, Textarea } from "@chakra-ui/react"
import { UseFormRegister, useForm, useFormContext } from "react-hook-form"
import { MdClose } from "react-icons/md"

export type TechnicalsProps = {
    index: number;
    remove: () => void;
    technicals: any[];
    setTechnicals: (index: number, value: any[]) => void;
    register: UseFormRegister<Product>;
};

export const TechnicalProps = ({ index, remove, technicals, setTechnicals, register }: TechnicalsProps) => {

    const handleAddTechnical = () => {
        setTechnicals(index, [...technicals, { name: '', content: '' }]);
    };

    const handleRemoveTechnical = (techIndex: number) => {
        setTechnicals(index, technicals.filter((_, i) => i !== techIndex));
    };

    return (
        // <FormProvider {...form}>
        <Stack w='full'>
            {
                technicals.map((technical, techIndex) => (
                    <HStack w='full' key={`${index}-${techIndex}`}>
                        <FormControl>
                            <FormLabel>Technical Name</FormLabel>
                            <Input
                                {...register(
                                    `product_info.${index}.technicals.${techIndex}.name` as const
                                )}
                                placeholder='Nhập tên thông số...'
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Content</FormLabel>
                            <Textarea
                                {...register(
                                    `product_info.${index}.technicals.${techIndex}.content` as const
                                )}
                                placeholder='Nhập nội dung...'
                            />
                        </FormControl>
                        <IconButton aria-label="close" onClick={() => handleRemoveTechnical(techIndex)} icon={<MdClose />} />
                    </HStack>
                ))
            }
            {/* <Button leftIcon={<MdClose />} onClick={handleAddTechnical}>Thêm technical</Button> */}
        </Stack>
        // </FormProvider>
    )
}