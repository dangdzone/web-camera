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
    working_times: WorkingTime[];
    bank_name: string;
    bank_number: string;
    bank_account: string;
}