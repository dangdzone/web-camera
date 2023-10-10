
import { useRef, useState } from 'react';
import { Box, HStack, IconButton, Image, Input, Skeleton } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { Controller, useFormContext } from 'react-hook-form';
import { storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export type FileUploader = {
    value?: string,
    onChange?: (link: string) => void
}

export const FileUploader = (props: { field: FileUploader }) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [image_link, set_image_link] = useState(props.field.value)

    const handleButtonClick = () => {
        // Kích hoạt sự kiện click của input ẩn
        fileInputRef.current?.click();
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return

        setLoading(true)

        const mountainsRef = ref(storage, `/files/${file.name}`)
        try {
            await uploadBytes(mountainsRef, file); // upload ảnh lên firebase
            const url = await getDownloadURL(mountainsRef);
            set_image_link(url)
            props.field.onChange?.(url)

            // console.log(`Link ảnh đây: ${url}`);
        } catch (error) {
            console.error(error);
        }
        setLoading(false)
    }

    
    return (
        <HStack w='full'>
            <Box onClick={handleButtonClick} cursor='pointer'>
                {
                    loading ? <Skeleton boxSize="100px" /> : (
                        image_link && (typeof image_link == 'string') ? (
                            <Image
                                src={image_link}
                                alt="Uploaded Image"
                                boxSize={'170px'}
                                objectFit="cover"
                                borderRadius='10px'
                                _hover={{ border: '1px solid gray' }}
                            />
                        ) : (
                            <IconButton
                                colorScheme='teal'
                                borderRadius='full'
                                size='lg'
                                aria-label='upload'
                                icon={<FiPlus />}
                            />
                        )
                    )
                }
            </Box>
            <Input
                type="file"
                accept="image/*"
                display='none'
                ref={fileInputRef}
                onChange={handleFileUpload}
            />
        </HStack>
    );
};

