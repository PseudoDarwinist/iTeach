import { useState } from 'react'

const CoursesPage = () => {
  const [isExploded, setIsExploded] = useState(false)

  const handleStackClick = () => {
    if (!isExploded) {
      setIsExploded(true)
    }
  }

  return (
    <div className="widget-container">
      <div 
        className={`widget-grid ${isExploded ? 'exploded' : 'stacked'}`} 
        id="courseGrid"
        onClick={handleStackClick}
      >
        {/* Prototyping Course Widget */}
        <div className="widget-card large image-background design-bg">
          <div className="widget-overlay"></div>
          <div className="widget-content-overlay">
            <p className="widget-category">Course</p>
            <h3 className="widget-title-overlay">Prototyping & Designing</h3>
            <p className="widget-subtitle-overlay">with AI</p>
          </div>
        </div>

        {/* Zero to One Course Widget */}
        <div className="widget-card medium blue-widget">
          <div className="widget-content-blue">
            <div className="widget-icon-medium">🚀</div>
            <h3 className="widget-title-blue">Zero → One</h3>
            <p className="widget-subtitle-blue">From Idea to App</p>
            <p className="widget-description">Build your first AI-powered application from scratch</p>
          </div>
          <button className="widget-button">Get Started</button>
        </div>

        {/* First-Time AI Coders Widget */}
        <div className="widget-card medium orange-widget">
          <div className="widget-content-orange">
            <div className="widget-icon-medium">👨‍💻</div>
            <h3 className="widget-title-orange">First-Time AI-Coders</h3>
            <p className="widget-subtitle-orange">Beginner Friendly</p>
            <p className="widget-description">Perfect starting point for coding newcomers</p>
          </div>
          <button className="widget-action-button">Start Coding</button>
        </div>

        {/* Advanced ML Widget */}
        <div className="widget-card small green-widget">
          <div className="widget-content-green">
            <div className="widget-icon-small">🤖</div>
            <h3 className="widget-title-small">Advanced ML</h3>
            <p className="widget-subtitle-green">Expert Level</p>
          </div>
        </div>

        {/* Data Science Widget */}
        <div className="widget-card small purple-widget">
          <div className="widget-content-purple">
            <div className="widget-icon-small">📊</div>
            <h3 className="widget-title-small">Data Science</h3>
            <p className="widget-subtitle-purple">Analytics & Insights</p>
          </div>
        </div>

        {/* Deep Learning Widget */}
        <div className="widget-card small dark-widget">
          <div className="widget-content-dark">
            <div className="widget-icon-large">🧠</div>
            <h3 className="widget-big-title-small">Deep Learning</h3>
            <p className="widget-subtitle-white">Understand the Basics</p>
            <p className="widget-description">Foundation concepts of neural networks and deep learning</p>
          </div>
          <button className="widget-action-button">Start Learning</button>
        </div>
      </div>
      
      {/* Doodle Annotation for Stacked Cards */}
      {!isExploded && (
        <div className="stack-annotation" id="stackAnnotation">
          <div className="doodle-arrow">
            <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:"#ff6b6b", stopOpacity:1}} />
                  <stop offset="50%" style={{stopColor:"#ffa726", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#ff6b6b", stopOpacity:1}} />
                </linearGradient>
              </defs>
              <path d="M180 50 Q 140 30, 100 40 Q 60 50, 25 45 L 35 35 M 25 45 L 35 55" 
                    stroke="url(#arrowGradient)" 
                    strokeWidth="6" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    opacity="0.9"/>
            </svg>
          </div>
          <div className="doodle-text">
            Click here to view courses! 📚
          </div>
        </div>
      )}
    </div>
  )
}

export default CoursesPage