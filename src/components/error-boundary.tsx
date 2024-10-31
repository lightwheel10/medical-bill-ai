"use client";

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="p-6 max-w-sm mx-auto bg-red-900/20 rounded-lg border border-red-500/30">
            <h2 className="text-xl font-bold text-red-200 mb-2">Something went wrong</h2>
            <p className="text-red-300">{this.state.error?.message}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 