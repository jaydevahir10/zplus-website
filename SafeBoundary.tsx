import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  // Children is made optional to ensure compatibility with various React 18 component usage patterns
  children?: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
}

/**
 * Error boundary component to catch and handle rendering errors in its child components.
 */
export class SafeBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false 
    };
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log component errors to console for developer visibility
    console.warn("SafeBoundary caught a rendering error:", error, errorInfo);
  }

  render() {
    // Check if an error has occurred in the child component tree
    if (this.state.hasError) {
      return (
        <div className="p-8 m-4 bg-zinc-900 border-2 border-primary-600 rounded-xl text-white">
          <h2 className="text-xl font-bold mb-2">{this.props.fallbackTitle || "Component Failed to Load"}</h2>
          <p className="text-gray-400 text-sm">A localized error occurred. The rest of the app is still functional.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-primary-600 rounded text-xs font-bold"
          >
            Retry Component
          </button>
        </div>
      );
    }
    
    // Access props correctly from the base class to return children or null fallback
    return this.props.children || null;
  }
}