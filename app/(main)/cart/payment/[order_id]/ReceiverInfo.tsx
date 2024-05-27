import { fetchDistricts, getProvinceNameById, getWardNameById } from "@/api"
import { HStack, Text, VStack } from "@chakra-ui/layout"
import { useEffect, useState } from "react"

export type ReceiverInfo = {
    receiver: {
        receiver_name: string // Tên người nhận
        receiver_phone: number // sdt người nhận
        province: number // Tỉnh
        district: number // huyện
        ward: number // Phường, xã
        street: number // Số nhà, tên đường
        note: string // ghi chú
    }
}

export const ReceiverInfo = ({ receiver }: ReceiverInfo) => {

    const [provinceName, setProvinceName] = useState<string | null>(null)
    const [districtName, setDistrictName] = useState<string | null>(null)
    const [wardName, setWardName] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        // Lấy Tỉnh
        const fetchData = async () => {
            const name = await getProvinceNameById(receiver?.province);
            if (name) {
                setProvinceName(name);
            } else {
                setError('Province not found');
            }
        };
        fetchData();
        // Lấy huyện
        const fetchDistrictName = async () => {
            // Kiểm tra xem province_id và district_id có giá trị không trước khi gọi API
            if (receiver?.province && receiver?.district) {
                try {
                    const districts = await fetchDistricts(receiver?.province);
                    const district = districts.find(district => district.district_id === receiver?.district);
                    if (district) {
                        setDistrictName(district.district_name);
                    } else {
                        setDistrictName(null);
                    }
                } catch (error) {
                    console.error("Error fetching districts:", error);
                    setDistrictName(null);
                }
            }
        };
        fetchDistrictName();
        // Lấy tên xã
        const fetchWardName = async () => {
            try {
                const name = await getWardNameById(receiver?.district, receiver?.ward);
                setWardName(name);
            } catch (error) {
                console.error("Error fetching ward name:", error);
            }
        };

        fetchWardName()
    }, [receiver?.province, receiver?.district, receiver?.ward]);

    const ReceiverList = [
        { name: 'Khách hàng', value: receiver?.receiver_name },
        { name: 'Số điện thoại', value: `0${receiver?.receiver_phone}` },
        { name: 'Nhận hàng tại', value: `${receiver?.street}, ${wardName}, ${districtName}, ${provinceName}` },
        { name: 'Ghi chú', value: receiver?.note },
    ]

    return (
        <VStack w='full' border='1px' spacing='4' borderColor='blackAlpha.200' borderRadius='10px' p='4'>
            {
                ReceiverList.map((item, i) => (
                    <HStack w='full' key={i} justifyContent='space-between'>
                        <Text opacity='0.8'>{item.name}</Text>
                        <Text fontSize='15px' fontWeight='600'>{item.value}</Text>
                    </HStack>
                ))
            }
        </VStack>
    )
}