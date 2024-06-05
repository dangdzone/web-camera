import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Select, Input, Textarea } from '@chakra-ui/react';
import dvhcvn from '../../../../dvhcvn.json';

interface Level3 {
    level3_id: string;
    name: string;
    type: string;
}

interface Level2 {
    level2_id: string;
    name: string;
    type: string;
    level3s: Level3[];
}

interface Level1 {
    level1_id: string;
    name: string;
    type: string;
    level2s: Level2[];
}

interface DVHCData {
    data: Level1[];
}

interface ReceiverInfo {
    receiver_name: string;
    receiver_phone: number;
    province: number;
    district: number;
    ward: number;
    street: string;
    note: string;
}

interface AddressFormProps {
    onAddressChange: (receiverInfo: ReceiverInfo) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ onAddressChange }) => {
    const { control, watch } = useForm<ReceiverInfo>();
    
    const [data, setData] = useState<DVHCData | null>(null);
    const [districts, setDistricts] = useState<Level2[]>([]);
    const [wards, setWards] = useState<Level3[]>([]);

    const selectedProvince = watch('province');
    const selectedDistrict = watch('district');

    useEffect(() => {
        setData(dvhcvn);
    }, []);

    useEffect(() => {
        if (selectedProvince && data) {
            const selectedProvinceData = data.data.find(prov => prov.level1_id === selectedProvince.toString());
            setDistricts(selectedProvinceData ? selectedProvinceData.level2s : []);
            setWards([]);
            onAddressChange({
                ...watch(),
                province: Number(selectedProvince),
                district: 0,
                ward: 0,
            });
        }
    }, [selectedProvince, data]);

    useEffect(() => {
        if (selectedDistrict && districts.length > 0) {
            const selectedDistrictData = districts.find(dist => dist.level2_id === selectedDistrict.toString());
            setWards(selectedDistrictData ? selectedDistrictData.level3s : []);
            onAddressChange({
                ...watch(),
                district: Number(selectedDistrict),
                ward: 0,
            });
        }
    }, [selectedDistrict, districts]);

    useEffect(() => {
        onAddressChange(watch());
    }, [watch('ward')]);

    return (
        <div>
            <Controller
                name="province"
                control={control}
                render={({ field }) => (
                    <Select placeholder="Chọn Tỉnh/Thành" {...field}>
                        {data?.data.map(province => (
                            <option key={province.level1_id} value={province.level1_id}>
                                {province.name}
                            </option>
                        ))}
                    </Select>
                )}
            />

            <Controller
                name="district"
                control={control}
                render={({ field }) => (
                    <Select placeholder="Chọn Quận/Huyện" {...field} isDisabled={!selectedProvince}>
                        {districts.map(district => (
                            <option key={district.level2_id} value={district.level2_id}>
                                {district.name}
                            </option>
                        ))}
                    </Select>
                )}
            />

            <Controller
                name="ward"
                control={control}
                render={({ field }) => (
                    <Select placeholder="Chọn Phường/Xã" {...field} isDisabled={!selectedDistrict}>
                        {wards.map(ward => (
                            <option key={ward.level3_id} value={ward.level3_id}>
                                {ward.name}
                            </option>
                        ))}
                    </Select>
                )}
            />

            <Controller
                name="receiver_name"
                control={control}
                render={({ field }) => <Input placeholder="Tên người nhận" {...field} />}
            />

            <Controller
                name="receiver_phone"
                control={control}
                render={({ field }) => <Input placeholder="Số điện thoại người nhận" type="number" {...field} />}
            />

            <Controller
                name="street"
                control={control}
                render={({ field }) => <Input placeholder="Số nhà, tên đường" {...field} />}
            />

            <Controller
                name="note"
                control={control}
                render={({ field }) => <Textarea placeholder="Ghi chú" {...field} />}
            />
        </div>
    );
};

