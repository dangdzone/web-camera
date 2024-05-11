import { useRef, useState } from 'react';
import { Box, HStack, IconButton, Image, Input, Skeleton, Text } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export type FileUploaderList = {
    value?: string[],
    onChange?: (links: string[]) => void
}

export const FileUploaderList = (props: { field: FileUploaderList }) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [imageLinks, setImageLinks] = useState<string[]>(props.field.value || [])

    const handleButtonClick = () => {
        // Trigger click event of hidden input
        fileInputRef.current?.click();
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setLoading(true);

        const uploadPromises: Promise<string>[] = [];

        Array.from(files).forEach(file => {
            const mountainsRef = ref(storage, `/files/${file.name}`);
            const uploadPromise = uploadBytes(mountainsRef, file)
                .then(() => getDownloadURL(mountainsRef))
                .catch(error => {
                    console.error('Error uploading image:', error);
                    return ''; // Return empty string if there's an error
                });
            uploadPromises.push(uploadPromise);
        });

        try {
            const urls = await Promise.all(uploadPromises);
            const filteredUrls = urls.filter(url => url !== ''); // Filter out empty strings
            setImageLinks(prevLinks => [...prevLinks, ...filteredUrls]);
            props.field.onChange?.([...imageLinks, ...filteredUrls]);
        } catch (error) {
            console.error('Error uploading images:', error);
        }

        setLoading(false);
    }

    return (
        <HStack w='full'>
            <Box onClick={handleButtonClick} cursor='pointer'>
                {
                    loading ? (
                        <Skeleton boxSize="100px" />
                    ) : (
                        <>
                            <IconButton
                                colorScheme='teal'
                                borderRadius='full'
                                size='lg'
                                aria-label='upload'
                                icon={<FiPlus />}
                            />
                            <Text>Add Image</Text>
                        </>
                    )
                }
            </Box>
            <Input
                type="file"
                accept="image/*"
                multiple // Allow multiple file selection
                display='none'
                ref={fileInputRef}
                onChange={handleFileUpload}
            />
        </HStack>
    );
};

export default FileUploaderList;
