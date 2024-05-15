import { IoMdPhonePortrait } from "react-icons/io";
import { LuBox } from "react-icons/lu";
import { BsShieldCheck } from "react-icons/bs";
import { RiBankCardLine } from "react-icons/ri";

export const ProductInfoList = {
    accessory: {
        name: 'Phụ kiện',
        icon: <IoMdPhonePortrait />
    },
    content : {
        name: 'Nội dung',
        icon: <LuBox />
    },
    guarantee: {
        name: 'Bảo hành',
        icon: <BsShieldCheck />
    },
    vat: {
        name: 'Thuế',
        icon: <RiBankCardLine />
    }
}