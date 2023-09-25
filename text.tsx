import { FiHome, FiShoppingCart } from "react-icons/fi"
import { MdOutlineHistory, MdOutlineTableBar } from "react-icons/md"

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
        icon: <MdOutlineTableBar />
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