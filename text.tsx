import { IoMdPhonePortrait } from "react-icons/io";
import { LuBox, LuUser2 } from "react-icons/lu";
import { BsShieldCheck } from "react-icons/bs";
import { RiBankCardLine, RiHome5Line } from "react-icons/ri";
import { BiCartAdd, BiShoppingBag } from "react-icons/bi";
import { FiGrid } from "react-icons/fi";

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

export const NavLinkList = {
    home: {
        name: 'Trang chủ',
        icon: <RiHome5Line />,
        href: ''
    },
    products: {
        name: 'Sản phẩm',
        icon: <FiGrid />,
        href: 'products'
    },
    orders: {
        name: 'Đơn hàng',
        icon: <BiShoppingBag />,
        href: 'orders'
    },
    carts: {
        name: 'Giỏ hàng',
        icon: <BiCartAdd />,
        href: 'carts'
    },
    user: {
        name: 'Tài khoản',
        icon: <LuUser2 />,
        href: 'user'
    }
}


export const OrderStatusMap = {
    created: {
        name: 'Đã tạo',
        color: 'green',
    },
    pay: {
        name: 'Đã thanh toán',
        color: 'blue',
    },
    cancel: {
        name: 'Đã hủy',
        color: 'red',
    },
}