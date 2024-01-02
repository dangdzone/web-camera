
import { BiFoodMenu, BiSolidCartAlt } from "react-icons/bi"
import { AiOutlineShop } from "react-icons/ai"
import { BsShop } from "react-icons/bs"
import { FiPlusSquare, FiShoppingCart } from "react-icons/fi"
import { MdCancel, MdOutlineHistory, MdOutlineTableRestaurant } from "react-icons/md"
import { FaCheckCircle } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri"

export const OrderItemStatusMap = {
    cancel: {
        name: 'Hủy',
        color: 'red'
    },
    requested: {
        name: 'Đợi lên bàn',
        color: 'green'
    },
    confirm: {
        name: 'Đã lên bàn',
        color: 'blue'
    },
}

export const OrderStatusMapCheck = {
    requested: {
        name: 'Đã yêu cầu',
        color: 'green'
    },
    cancel: {
        name: 'Hủy',
        color: 'red'
    },
}

export const OrderStatusMap = {
    requested: {
        name: 'Đã yêu cầu',
        color: 'green',
        icon: <BiSolidCartAlt />
    },
    unpaid: {
        name: 'Chờ thanh toán',
        color: 'orange',
        icon: <RiMoneyDollarCircleLine />
    },
    pay: {
        name: 'Đã thanh toán',
        color: 'blue',
        icon: <FaCheckCircle />
    },
    cancel: {
        name: 'Hủy',
        color: 'red',
        icon: <MdCancel />
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
    // {
    //     name: 'Thông báo',
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
