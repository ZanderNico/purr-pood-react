export interface GetCartsData {
    cart_id: number;
    customer_id:number;
    food_id: number;
    quantity: number;
    added_at: string;
}

export interface CreateCartsData {
    customer_id:number;
    food_id: number;
    quantity: number;
}