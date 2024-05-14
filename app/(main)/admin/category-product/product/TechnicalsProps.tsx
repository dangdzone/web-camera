import { Stack } from "@chakra-ui/layout"
import { Button, IconButton, Input, Textarea } from "@chakra-ui/react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { MdAdd, MdClose } from "react-icons/md"

export type TechnicalsProps = {
    name: `specifications.${number}`
};

export const TechnicalProps = ({ name }: TechnicalsProps) => {

    const { control, register } = useFormContext()
    const { fields, remove, append } = useFieldArray({
        control,
        name: `${name}.technicals`,
    });

    return (
        <Stack w='full' p='3' spacing='3'>
            {
                fields.map((technical, techIndex) => (
                    <Stack w='full' key={technical.id} flexDirection='row'>
                        <Input
                            {...register(
                                `${name}.technicals.${techIndex}.name`
                            )}
                            placeholder='Nhập tên thông số...'
                        />
                        <Textarea
                            {...register(
                                `${name}.technicals.${techIndex}.content`
                            )}
                            placeholder='Nhập nội dung...'
                        />
                        <IconButton size='sm' aria-label="close" onClick={() => confirm('Bạn chắc chắn xóa không !') && remove(techIndex)} icon={<MdClose />} />
                    </Stack>
                ))
            }
            <Button leftIcon={<MdAdd />} onClick={() => append({ name: '', content: '' })}>Add technicals</Button>
        </Stack>
    )
}