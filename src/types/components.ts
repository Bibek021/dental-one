// Component prop types and UI-related types

import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

// Base component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Button component types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

// Input component types
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: ButtonSize;
  fullWidth?: boolean;
}

// Checkbox component types
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string | ReactNode;
  error?: string;
  indeterminate?: boolean;
}

// Select/Dropdown component types
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  className?: string;
}

// Modal component types
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
}

// Card component types
export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

// Badge component types
export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends BaseComponentProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

// Loading component types
export interface LoadingSpinnerProps extends BaseComponentProps {
  size?: ButtonSize;
  color?: string;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  children?: NavItem[];
  badge?: string | number;
  isActive?: boolean;
  onClick?: () => void;
}

export interface NavbarProps extends BaseComponentProps {
  items: NavItem[];
  logo?: ReactNode;
  actions?: ReactNode;
}

export interface SidebarProps extends BaseComponentProps {
  items: NavItem[];
  isCollapsed?: boolean;
  onToggle?: () => void;
  header?: ReactNode;
  footer?: ReactNode;
}

// Form types
export interface FormFieldProps extends BaseComponentProps {
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
}

// Table types
export interface TableColumn<T = any> {
  id: string;
  header: string;
  accessor: keyof T | ((row: T) => any);
  cell?: (value: any, row: T) => ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface TableProps<T = any> extends BaseComponentProps {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
}

// Pagination types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

// Scroll trigger types
export interface UseScrollTriggerOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export interface ScrollTriggerProps extends BaseComponentProps {
  onEnter?: () => void;
  onExit?: () => void;
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

// Layout types
export interface LayoutProps extends BaseComponentProps {
  sidebar?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

// Toast/Notification types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}