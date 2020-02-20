import { Employee } from "./employee";

export class Event {
    uuid: string;
    description: string;
    created_at: Date;
    amount: number;
    currency: string;
    employee: Employee;
    status: string;
}