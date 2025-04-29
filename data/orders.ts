
export type Order = {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "delivered" | "cancelled";
};

export const orders: Order[] = [
  {
    id: "#1234",
    customerName: "João Silva",
    date: "2024-04-23",
    total: 149.99,
    status: "delivered",
  },
  {
    id: "#1235",
    customerName: "Maria Santos",
    date: "2024-04-23",
    total: 89.90,
    status: "processing",
  },
  {
    id: "#1236",
    customerName: "Pedro Oliveira",
    date: "2024-04-22",
    total: 299.99,
    status: "pending",
  },
  {
    id: "#1237",
    customerName: "Ana Costa",
    date: "2024-04-21",
    total: 59.90,
    status: "cancelled",
  },
];
