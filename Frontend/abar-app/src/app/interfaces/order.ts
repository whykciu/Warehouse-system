import { OrderItem } from "./order-item";

export interface Order{
    pk: number;
    status: string
    orderItems: OrderItem[]
    clientEmail: string
    clientAddress: string
}