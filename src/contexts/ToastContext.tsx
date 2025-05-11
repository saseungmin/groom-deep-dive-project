import { createContext, useContext, useMemo } from 'react';

import { toast } from 'sonner';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default';

export interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toast: {
    success: (options: string | ToastOptions) => void;
    error: (options: string | ToastOptions) => void;
    warning: (options: string | ToastOptions) => void;
    info: (options: string | ToastOptions) => void;
    default: (options: string | ToastOptions) => void;
    dismiss: (toastId?: string) => void;
    promise: typeof toast.promise;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

const createToastFunction = (type: ToastType) => {
  return (options: string | ToastOptions) => {
    if (typeof options === 'string') {
      if (type === 'default') {
        toast(options);
        return;
      }

      toast[type](options);
      return;
    }

    const { title, description, duration } = options;

    if (type === 'default') {
      toast(title || '', { description, duration });
      return;
    }

    toast[type](title || '', { description, duration });
    return;
  };
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const toastValue: ToastContextType = useMemo(() => {
    return {
      toast: {
        success: createToastFunction('success'),
        error: createToastFunction('error'),
        warning: createToastFunction('warning'),
        info: createToastFunction('info'),
        default: createToastFunction('default'),
        dismiss: toast.dismiss,
        promise: (promise, messages) => {
          return toast.promise(promise, messages);
        },
      },
    };
  }, []);

  return (
    <ToastContext.Provider value={toastValue}>{children}</ToastContext.Provider>
  );
};
