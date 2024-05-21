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
    outstandings: Array<{ name: string}> // Đặc điểm nổi bật
    option: Array<Object> // Tùy chọn thêm
}

export declare class Store extends BaseEntity {
    name: string
    address: string
    link_map: string
}

export declare class Orders extends BaseEntity {
    customer_id: string
    customer_name: string
    status: string
    total: number
    product_amount: number
}

export declare class Carts extends BaseEntity {
    product_list: Array<CartItem>
}

export declare class CartItem extends BaseEntity {
    product_id: string
    amount: number
    price: number
    select: boolean
}