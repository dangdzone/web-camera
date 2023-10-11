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


export declare class Restaurant extends BaseEntity {
    name: string;
    address: string;
    phone: string;
    status: string;
}

export declare class RestaurantTable extends BaseEntity {
    name: string;
    order_ids: string[];
}

export declare class Category extends BaseEntity {
    restaurant_id: string;
    name: string;
}

export declare class Food extends BaseEntity {
    restaurant_id: string;
    name: string;
    category_id: string;
    images: string;
    price: number;
    description: string;
}

export declare class Order extends BaseEntity {
    customer_id: string ;
    restaurant_id: string;
    customer_name: string;
    table_id: string;
    status: string;
    total: number;
    food_amount: number
}

export declare class OrderItem extends BaseEntity {
    restaurant_id: string;
    name: string;
    price: number;
    table_id: string;
    creator_id: string;
    creator_name: string;
    food_id: string;
    amount: number;
    image: string;
    order_id: string;
    customer_id: string;
    status: string
}
