
import { BiFoodMenu } from "react-icons/bi"
import { AiOutlineShop } from "react-icons/ai"
import { BsShop } from "react-icons/bs"
import { FiPlusSquare, FiShoppingCart } from "react-icons/fi"
import { MdOutlineHistory, MdOutlineTableRestaurant } from "react-icons/md"

export const OrderStatusMap = [
    {
        name: 'Chờ xác nhận',
        color: 'gray'
    },
    {
        name: 'Chờ thanh toán',
        color: 'blue'
    }
]

export const TabListMap = [
    {
        name: 'Gọi món',
        icon: <FiPlusSquare />
    },
    {
        name: 'Menu',
        icon: <BiFoodMenu />
    },
    {
        name: 'Bàn ăn',
        icon: <MdOutlineTableRestaurant />
    },
    {
        name: 'Lịch sử đơn',
        icon: <MdOutlineHistory />
    },
    {
        name: 'Nhà hàng',
        icon: <AiOutlineShop />
    },
]

export const TableStatusMap = [
    {
        name: 'Đang hoạt động',
        color: 'blue'
    },
    {
        name: 'Ngưng hoạt động',
        color: 'red'
    }
]


export const RestauranManager = [
    {
        name: 'Quản lý nhà hàng',
        icon: <BsShop />
    },
    // {
    //     name: 'Quản lý menu',
    //     icon: <BiFoodMenu />
    // }
]


export const HistoryMap = [
    {
        name: 'Đã thanh toán',
        color: 'blue'
    },
    {
        name: 'Đã hủy',
        color: 'red'
    },
]

export const TableCustomerMap = [
    {
        name: 'Menu',
        icon: <BiFoodMenu />
    },
    {
        name: 'Giỏ hàng',
        icon: <FiShoppingCart />
    }
]