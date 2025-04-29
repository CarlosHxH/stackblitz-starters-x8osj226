
export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  lastLogin: string;
};

export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    lastLogin: "2024-04-23",
  },
  {
    id: "2",
    name: "João Silva",
    email: "joao@example.com",
    role: "customer",
    lastLogin: "2024-04-22",
  },
  {
    id: "3",
    name: "Maria Santos",
    email: "maria@example.com",
    role: "customer",
    lastLogin: "2024-04-21",
  },
];
