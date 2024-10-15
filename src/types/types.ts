export interface MenuItem {
    key: string;
    icon: JSX.Element;
    label: string;
    badge?: number;
}
  
  // Data type for each row in the table
export interface DataType {
    key: React.Key;
    creator: string;
    role: string;
    avatar: string;
    subject: string;
    assigned: string;
    status: string;
    privacy: string;
    createdAt: string;
}
