import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useState } from 'react'
import DitherLite from '../components/effects/DitherLite'

const PaymentPage = () => {
  const { courseId } = useParams()
  const [searchParams] = useSearchParams()
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  
  // Course data
  const courseData = {
    'prototyping-designing': {
      title: 'Prototyping & Designing with AI',
      price: '₹3,999',
      originalPrice: '₹6,999',
      description: 'Learn to design and prototype with AI tools'
    },
    'zero-one': {
      title: 'Zero → One',
      price: '₹4,999',
      originalPrice: '₹8,999',
      description: 'From Idea to App. Learn everything that\'s happening in AI-World'
    },
    'ai-coders': {
      title: 'First-Time AI-Coders',
      price: '₹3,999',
      originalPrice: '₹6,999',
      description: 'From beginner to AI-powered developer'
    },
    'claude-code': {
      title: 'Master Claude Code',
      price: '₹2,999',
      originalPrice: '₹5,999',
      description: '3x your productivity with Claude Code'
    },
    'ai-engineering-workflow': {
      title: 'AI-Powered Engineering Workflow',
      price: '₹5,999',
      originalPrice: '₹9,999',
      description: 'Master the complete AI-powered development workflow from requirements to production'
    },
    'master-mcp': {
      title: 'Master MCP (Model Context Protocol)',
      price: '₹4,999',
      originalPrice: '₹7,999',
      description: 'Build AI agents that communicate with external applications using Anthropic\'s MCP'
    },
    'ai-agents': {
      title: 'AI Agents',
      price: '₹4,999',
      originalPrice: '₹7,999',
      description: 'Build intelligent autonomous agents that can perform complex tasks'
    },
    'deep-learning': {
      title: 'Deep Learning',
      price: '₹4,999',
      originalPrice: '₹7,999',
      description: 'Master neural networks and AI fundamentals from scratch to advanced'
    }
  }

  const course = courseData[courseId] || {
    title: 'AI Course',
    price: '₹3,999',
    originalPrice: '₹6,999',
    description: 'Premium AI development course'
  }

  // UPI payment link generator
  const generateUPILink = () => {
    const upiId = import.meta.env.VITE_UPI_ID || '8130071804@sbi'
    const amount = course.price.replace('₹', '').replace(',', '')
    const note = `Payment for ${course.title} - AI.School`
    
    return `upi://pay?pa=${upiId}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`
  }

  const handlePaymentSubmit = () => {
    setIsProcessing(true)
    
    // Open UPI app
    window.location.href = generateUPILink()
    
    setTimeout(() => {
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="payment-page">
      {/* Real Dithered Shader Background */}
      <div className="payment-background">
        <DitherLite
          waveSpeed={0.02}
          waveFrequency={2}
          waveAmplitude={0.4}
          waveColor={[0.8, 0.85, 1.0]}
          colorNum={6}
          pixelSize={3}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.5}
        />
      </div>
      <div className="payment-container">
        {/* Header */}
        <div className="payment-header">
          <Link to="/courses" className="back-link">← Back to Courses</Link>
          <h1>Complete Your Purchase</h1>
          <p>You're almost there! Complete your payment to get instant access.</p>
        </div>

        <div className="payment-content">
          {/* Course Summary */}
          <div className="course-summary">
            <h2>Course Summary</h2>
            <div className="summary-card">
              <div className="course-info">
                <h3>{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-features">
                  <div className="feature">✓ Lifetime access</div>
                  <div className="feature">✓ Certificate of completion</div>
                  <div className="feature">✓ 1-on-1 support</div>
                  <div className="feature">✓ Project-based learning</div>
                </div>
              </div>
              <div className="pricing">
                <div className="original-price">{course.originalPrice}</div>
                <div className="current-price">{course.price}</div>
                <div className="savings">Save {parseInt(course.originalPrice.replace('₹', '').replace(',', '')) - parseInt(course.price.replace('₹', '').replace(',', ''))}!</div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="payment-methods">
            <h2>Choose Payment Method</h2>
            
            <div className="payment-options">
              <div className={`payment-option ${paymentMethod === 'upi' ? 'active' : ''}`}
                   onClick={() => setPaymentMethod('upi')}>
                <div className="option-header">
                  <div className="option-icon">📱</div>
                  <div className="option-info">
                    <h3>UPI Payment</h3>
                    <p>Pay with any UPI app (PhonePe, Google Pay, Paytm)</p>
                  </div>
                  <div className="option-badge">Recommended</div>
                </div>
                
                {paymentMethod === 'upi' && (
                  <div className="upi-details">
                    <div className="qr-section">
                      <h4>Scan QR Code to Pay</h4>
                      <div className="qr-placeholder">
                        <div className="qr-code">
                          <img 
                            src="/qr-code.png" 
                            alt="UPI QR Code for Payment" 
                            className="qr-image"
                            onError={(e) => {
                              // Fallback to pattern if image not found
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'block'
                            }}
                          />
                          <div className="qr-pattern" style={{display: 'none'}}>
                            <div className="qr-squares">
                              {Array.from({length: 100}).map((_, i) => (
                                <div key={i} className={`qr-square ${Math.random() > 0.5 ? 'filled' : ''}`}></div>
                              ))}
                            </div>
                            <div className="qr-logo">₹</div>
                          </div>
                        </div>
                        <p className="qr-amount">{course.price}</p>
                      </div>
                      <p className="qr-instructions">
                        Open any UPI app → Scan QR Code → Pay {course.price}
                      </p>
                    </div>
                    
                    <div className="manual-payment">
                      <h4>Or Pay Manually</h4>
                      <div className="upi-details-box">
                        <div className="upi-id">
                          <label>UPI ID:</label>
                          <span>{import.meta.env.VITE_UPI_ID || '8130071804@sbi'}</span>
                          <button 
                            className={`copy-btn ${isCopied ? 'copied' : ''}`}
                            onClick={() => {
                              const upiId = import.meta.env.VITE_UPI_ID || '8130071804@sbi';
                              navigator.clipboard.writeText(upiId);
                              setIsCopied(true);
                              setTimeout(() => setIsCopied(false), 2000);
                            }}
                          >
                            {isCopied ? '✓ Copied!' : 'Copy'}
                          </button>
                        </div>
                        <div className="payment-amount">
                          <label>Amount:</label>
                          <span>{course.price}</span>
                        </div>
                        <div className="payment-note">
                          <label>Note:</label>
                          <span>Payment for {course.title} - AI.School</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Payment Security */}
        <div className="payment-footer">
          <div className="security-badges">
            <div className="security-item">🔒 Secure Payment</div>
            <div className="security-item">✓ Instant Access</div>
            <div className="security-item">📞 24/7 Support</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage