
import { BiFoodMenu } from "react-icons/bi"
import { AiOutlineShop } from "react-icons/ai"
import { BsShop } from "react-icons/bs"
import { FiPlusSquare, FiShoppingCart } from "react-icons/fi"
import { MdOutlineHistory, MdOutlineTableRestaurant } from "react-icons/md"

export const OrderItemStatusMap = {
    requested: {
        name: 'Chưa lên bàn',
        color: 'red'
    },
    confirm: {
        name: 'Đã lên bàn',
        color: 'blue'
    }
}

export const OrderStatusMap = {
    requested: {
        name: 'Đã yêu cầu',
        color: 'green'
    },
    unpaid: {
        name: 'Chờ thanh toán',
        color: 'orange'
    },
    pay: {
        name: 'Đã thanh toán',
        color: 'blue'
    },
    cancel: {
        name: 'Hủy',
        color: 'red'
    },
}

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
        name: 'Hệ thống nhà hàng',
        icon: <BsShop />
    },
    {
        name: 'Thông báo',
        icon: <BiFoodMenu />
    }
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


export const FoodStatusMap = {
    active: {
        name: 'Hiện',
        color: 'blue'
    },
    inactive: {
        name: 'Ẩn',
        color: 'red'
    }
}
