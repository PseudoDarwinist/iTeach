import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/layout/Layout'
import './styles/App.css'

// Lazy load pages for better initial bundle size
const HomePage = lazy(() => import('./pages/HomePage'))
const CoursesPage = lazy(() => import('./pages/CoursesPage'))
const PaymentPage = lazy(() => import('./pages/PaymentPage'))

// Simple loading fallback
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    color: '#666'
  }}>
    Loading...
  </div>
)

function App() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/payment/:courseId" element={<PaymentPage />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
