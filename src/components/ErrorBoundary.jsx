import React from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('LIVORA UI caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans text-slate-800">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-lg space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            
            <div className="space-y-1.5">
              <h2 className="font-serif font-bold text-xl text-slate-900">Wallpaper Preview Note</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                We encountered an unexpected display glitch while rendering this wallpaper design.
              </p>
              {this.state.error && (
                <div className="mt-3 p-3 bg-rose-50 rounded-xl text-left border border-rose-200 overflow-auto max-h-36">
                  <p className="text-[11px] font-mono text-rose-800 font-bold break-all">
                    {String(this.state.error?.message || this.state.error)}
                  </p>
                  {this.state.error?.stack && (
                    <p className="text-[9px] font-mono text-rose-600 mt-1 whitespace-pre-wrap">
                      {String(this.state.error.stack).slice(0, 300)}...
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>

              <a
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-5 py-2.5 rounded-xl transition cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Wallpaper Catalog</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
