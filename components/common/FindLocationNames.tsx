import dvhcvn from '../../dvhcvn.json';

// Lấy tên dịch vụ hành chính thông qua ID
export const FindLocationNames = (provinceId: string, districtId: string, wardId: string) => {
    const province = dvhcvn.data.find(p => p.level1_id === provinceId);
    const provinceName = province ? province.name : 'Province not found';

    const district = province?.level2s.find(d => d.level2_id === districtId);
    const districtName = district ? district.name : 'District not found';

    const ward = district?.level3s.find(w => w.level3_id === wardId);
    const wardName = ward ? ward.name : 'Ward not found';

    return {
        provinceName,
        districtName,
        wardName
    }
};