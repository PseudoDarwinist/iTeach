import { useState } from 'react'
import { Link } from 'react-router-dom'
import DitherLite from '../components/effects/DitherLite'

const CoursesPage = () => {
  const [isExploded, setIsExploded] = useState(false)

  const handleStackClick = () => {
    if (!isExploded) {
      setIsExploded(true)
    }
  }

  return (
    <div className="widget-container">
      {/* Dithered Background */}
      <div className="page-background">
        <DitherLite
          waveSpeed={0.025}
          waveFrequency={3}
          waveAmplitude={0.4}
          waveColor={[0.6, 0.75, 0.9]}
          colorNum={4}
          pixelSize={3}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.6}
        />
      </div>
      
      <div 
        className={`widget-grid ${isExploded ? 'exploded' : 'stacked'}`} 
        id="courseGrid"
        onClick={handleStackClick}
      >
        {/* ROW 1: BIG + SMALL */}
        {/* 1. Prototyping Course Widget - LARGE */}
        <div className="widget-card large image-background design-bg">
          <div className="widget-overlay"></div>
          <div className="widget-content-overlay">
            <p className="widget-category">Course</p>
            <h3 className="widget-title-overlay">Prototyping & Designing</h3>
            <p className="widget-subtitle-overlay">with AI</p>
          </div>
          <div className="widget-footer-overlay">
            <div className="widget-price">₹3,999</div>
            <Link to="/payment/prototyping-designing" className="mic-glow-button">
              <span className="liquid-glass-text">Enroll</span>
            </Link>
          </div>
        </div>

        {/* 2. Deep Learning Course Widget - MEDIUM */}
        <div className="widget-card medium image-background deep-learning-bg">
          <div className="widget-overlay"></div>
          <div className="widget-content-overlay">
            <p className="widget-category">Course</p>
            <h3 className="widget-title-overlay">Deep Learning</h3>
            <p className="widget-subtitle-overlay">Master neural networks and AI fundamentals</p>
          </div>
          <div className="widget-footer-overlay">
            <div className="widget-price">₹5,999</div>
            <Link to="/payment/deep-learning" className="mic-glow-button">
              <span className="liquid-glass-text">Enroll</span>
            </Link>
          </div>
        </div>

        {/* ROW 2: SMALL + BIG */}
        {/* 3. AI Coders Course Widget - MEDIUM */}
        <div className="widget-card medium image-background ai-bg">
          <div className="widget-overlay"></div>
          <div className="widget-tag-overlay">NEW</div>
          <div className="widget-content-overlay">
            <p className="widget-category">Course</p>
            <h3 className="widget-title-overlay">First-Time AI-Coders</h3>
            <p className="widget-subtitle-overlay">From beginner to AI-powered developer</p>
          </div>
          <div className="widget-footer-overlay">
            <div className="widget-price">₹3,999</div>
            <Link to="/payment/ai-coders" className="mic-glow-button">
              <span className="liquid-glass-text">Enroll</span>
            </Link>
          </div>
        </div>

        {/* 4. Zero to One Course Widget - LARGE */}
        <div className="widget-card large image-background zero-bg">
          <div className="widget-overlay"></div>
          <div className="widget-content-overlay">
            <p className="widget-category">Course</p>
            <h3 className="widget-title-overlay">Zero → One</h3>
            <p className="widget-subtitle-overlay">From Idea to App. Learn everything that's happening in AI-World</p>
          </div>
          <div className="widget-footer-overlay">
            <div className="widget-price">₹4,999</div>
            <Link to="/payment/zero-one" className="mic-glow-button">
              <span className="liquid-glass-text">Enroll</span>
            </Link>
          </div>
        </div>

        {/* ROW 3: BIG + SMALL */}
        {/* 5. Master Claude Code Course Widget - LARGE */}
        <div className="widget-card large image-background claude-bg">
          <div className="widget-overlay"></div>
          <div className="widget-content-overlay">
            <p className="widget-category">Course</p>
            <h3 className="widget-title-overlay">Master Claude Code</h3>
            <p className="widget-subtitle-overlay">3x your productivity</p>
          </div>
          <div className="widget-footer-overlay">
            <div className="widget-price">₹2,999</div>
            <Link to="/payment/claude-code" className="mic-glow-button">
              <span className="liquid-glass-text">Enroll</span>
            </Link>
          </div>
        </div>

        {/* 6. AI Engineering Workflow Course Widget - MEDIUM */}
        <div className="widget-card medium image-background workflow-bg">
          <div className="widget-overlay"></div>
          <div className="widget-tag-overlay">NEW</div>
          <div className="widget-content-overlay">
            <p className="widget-category">Course</p>
            <h3 className="widget-title-overlay">AI-Powered Engineering</h3>
            <p className="widget-subtitle-overlay">RFP → Requirements → Design → User Stories → JIRA → PRs → CI/CD</p>
          </div>
          <div className="widget-footer-overlay">
            <div className="widget-price">₹5,999</div>
            <Link to="/payment/ai-engineering-workflow" className="mic-glow-button">
              <span className="liquid-glass-text">Enroll</span>
            </Link>
          </div>
        </div>

        {/* ROW 4: SMALL + BIG */}
        {/* 7. MCP Course Widget - MEDIUM */}
        <div className="widget-card medium image-background mcp-bg">
          <div className="widget-overlay"></div>
          <div className="widget-tag-overlay">NEW</div>
          <div className="widget-content-overlay">
            <p className="widget-category">Course</p>
            <h3 className="widget-title-overlay">Master MCP</h3>
            <p className="widget-subtitle-overlay">Model Context Protocol by Anthropic</p>
          </div>
          <div className="widget-footer-overlay">
            <div className="widget-price">₹4,999</div>
            <Link to="/payment/master-mcp" className="mic-glow-button">
              <span className="liquid-glass-text">Enroll</span>
            </Link>
          </div>
        </div>

        {/* 8. AI Agents Course Widget - LARGE */}
        <div className="widget-card large image-background ai-agents-bg">
          <div className="widget-overlay"></div>
          <div className="widget-content-overlay">
            <p className="widget-category">Course</p>
            <h3 className="widget-title-overlay">AI Agents</h3>
            <p className="widget-subtitle-overlay">Build intelligent autonomous agents</p>
          </div>
          <div className="widget-footer-overlay">
            <div className="widget-price">₹4,999</div>
            <Link to="/payment/ai-agents" className="mic-glow-button">
              <span className="liquid-glass-text">Enroll</span>
            </Link>
          </div>
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