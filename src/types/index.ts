export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
}

export interface DataPoint {
  date: string;
  value: number;
}

export interface StatCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface MenuItem {
  title: string;
  href: string;
  icon: string;
}

export interface TableData {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'inactive';
  date: string;
}