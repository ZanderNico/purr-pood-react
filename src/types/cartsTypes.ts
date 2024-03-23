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

export interface CartItem {
    cart_id: number;
    food_id: number;
    food_name: string;
    food_description: string;
    category: string;
    quantity: number;
    price: string;
    stock_quantity: number;
    food_image: string;
}

export interface UserWithCart {
    user_id?: number;
    user_name?: string;
    email?: string;
    user_role?: string;
    carts?: CartItem[];
}