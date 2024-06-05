
export type Province = {
    province_id: number;
    province_name: string;
    province_type: string;
}

export type District = {
    district_id: number;
    district_name: string;
}

export type Ward = {
    ward_id: number;
    ward_name: string;
}

export declare class BaseEntity {
    constructor();
    id: string;
    _id: string;
    created_at: number;
    updated_at: number;
    owner_id: string;
    permissions: {
        [permission: string]: string;
    };
}

export type WorkingTime = {
    start_hours: number;
    start_minutes: number;
    end_hours: number;
    end_minutes: number;
};

export declare class Category extends BaseEntity {
    name: string;
    image: string;
    href: string;
}

export declare class Resolution extends BaseEntity {
    name: string;
    size: string;
    note: string
}

export declare class Brand extends BaseEntity {
    name: string;
    image: string;
}

export declare class Product extends BaseEntity {
    name: string;
    status: string // Trạng thái
    image: string // Ảnh
    cost: number // Giá nhập 
    price: number // Giá bán
    advertising_price: number // Giá quảng cáo
    brand_id: string // Thương hiệu
    code: string // Mã sản phẩm
    description: string // Ghi chú
    resolution_id: string // độ phân giải 
    amount: number // số lượng
    specifications: Array<{
        name: string,
        technicals: Array<{ name: string, content: string }>
    }> // Thông số kĩ thuật
    infos: Array<{
        name: string,
        content: string
    }> // Thông tin sản phẩm 
    category_id: string // Danh mục sản phẩm
    outstandings: Array<{ name: string }> // Đặc điểm nổi bật
    option: Array<Object> // Tùy chọn thêm
}

export declare class Store extends BaseEntity {
    name: string
    address: string
    link_map: string
}

export declare class Order extends BaseEntity {
    code: string // Mã đơn hàng
    status: string // Trạng thái
    order_items: Array<{
        product_id: string
        amount: number
        select: boolean
    }>
    amount: number // Số lượng
    total: number // Tổng tiền
    discount: number // Giảm giá
    pay: number // Tiền thanh toán
    shipping_fee: number // Phí vận chuyển
    customer_id: string // ID khách hàng tạo
    customer_info: { // Thông tin khách hàng tạo
        name: string,
        email: string,
        img: string
    }
    receiver_info: {
        receiver_name: string // Tên người nhận
        receiver_phone: number // sdt người nhận
        province: number // Tỉnh
        district: number // huyện
        ward: number // Phường, xã
        street: number // Số nhà, tên đường
        note: string // ghi chú
    }
}

export declare class Cart extends BaseEntity {
    customer_id: string
    product_id: string
    amount: number
    select: boolean
}

export type Level3 = {
    level3_id: string;
    name: string;
    type: string;
}

export type Level2 = {
    level2_id: string;
    name: string;
    type: string;
    level3s: Level3[];
}

export type Level1 = {
    level1_id: string;
    name: string;
    type: string;
    level2s: Level2[];
}

export type DVHCData = {
    data: Level1[];
}

export type ReceiverInfo = {
    receiver_name: string;
    receiver_phone: number;
    province: number;
    district: number;
    ward: number;
    street: string;
    note: string;
}
