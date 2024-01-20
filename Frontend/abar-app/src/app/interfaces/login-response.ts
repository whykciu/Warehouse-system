import { Role } from "./role";

export interface LoginResponse {
    result: boolean;
    username: string;
    role: Role;
    id: number;
    pk: number;
}