import React, { ComponentType, ErrorInfo, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('页面加载错误:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A153A] via-[#3D2C5E] to-[#1A153A]">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-white mb-4">页面加载失败</h1>
            <p className="text-gray-400 mb-4">请刷新页面重试</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-pink-500 text-white rounded-full"
            >
              刷新页面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}