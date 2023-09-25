import { BiFoodMenu } from "react-icons/bi"
import { BsShop } from "react-icons/bs"
import { FiHome, FiShoppingCart } from "react-icons/fi"
import { MdOutlineHistory, MdOutlineTableBar, MdOutlineTableRestaurant } from "react-icons/md"

export const OrderStatusMap = [
    {
        name: 'Đã đặt đơn',
        color: 'gray'
    },
    {
        name: 'Chờ xác nhận',
        color: 'blue'
    },
    {
        name: 'Chờ lên bàn',
        color: 'teal'
    },
    {
        name: 'Đã lên bàn',
        color: 'orange'
    },
    {
        name: 'Đã thanh toán',
        color: 'pink'
    },
    {
        name: 'Đã hủy',
        color: 'red'
    },
]

export const TabListMap = [
    {
        name: 'Trang chủ',
        icon: <FiHome />
    },
    {
        name: 'Đơn hàng',
        icon: <FiShoppingCart />
    },
    {
        name: 'Bàn ăn',
        icon: <MdOutlineTableRestaurant />
    },
    {
        name: 'Lịch sử',
        icon: <MdOutlineHistory />
    }
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
    {
        name: 'Quản lý menu',
        icon: <BiFoodMenu />
    }
]