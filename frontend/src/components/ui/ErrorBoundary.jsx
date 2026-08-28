import { Component } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

// Catches unexpected render/lifecycle errors in its subtree and shows a
// recovery screen instead of a blank page. Error details are logged to the
// console for developers only — never rendered to the user.
export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('MagulaPlan render error:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 bg-ivory-radial">
          <div className="text-center max-w-md">
            <div className="mx-auto h-16 w-16 rounded-xl2 bg-red-50 flex items-center justify-center text-red-500 mb-6">
              <FaExclamationTriangle size={26} />
            </div>
            <h1 className="text-2xl font-display font-medium text-charcoal mb-3">Something went wrong</h1>
            <p className="text-charcoal/60 mb-8">
              An unexpected error occurred. Reload the page to continue — your data is safe.
            </p>
            <button onClick={this.handleReset} className="btn-primary">Reload page</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
