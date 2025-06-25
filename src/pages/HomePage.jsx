import Hero from '../components/layout/Hero'
import StackedProfileCards from '../components/profile/StackedProfileCards'
import ShinyText from '../components/ui/ShinyText'
import Dither from '../components/effects/Dither'
import { Link } from 'react-router-dom'

const HomePage = () => {

  return (
    <>
      {/* Dithered Background */}
      <div className="page-background">
        <Dither
          waveSpeed={0.03}
          waveFrequency={2.5}
          waveAmplitude={0.35}
          waveColor={[0.7, 0.8, 0.95]}
          colorNum={5}
          pixelSize={2}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.8}
        />
      </div>
      
      <Hero 
        title="Build AI Systems That Actually Work"
        subtitle="Join fellow builders around the campfire of knowledge"
      />
      
      <div className="container">
        <main className="main-content">
          <div className="content-section">
            <h1 className="main-title">
              Learn to Build with AI
              <br />
              That Don't Suck
            </h1>
            
            <p className="subtitle">
              A live, interactive program that'll show you how to design, build, and
              deploy production-ready systems from scratch — without the fluff.
            </p>

            <div className="program-description">
              <h2 className="section-title">
                This program is for builders looking to solve
                real-world problems using AI tools like Cursor, Claude Code, Factory.
              </h2>
              
              <p className="description-text">
                Most AI courses assume things and use Jargons for beginners.They
                never talk about how to ship actual products using AI tools.
              </p>
              
              <p className="description-text">
                <strong>This program is different.</strong> This is a practical, no-nonsense,
                hands-on program that will teach you the skills you need for
                building production systems in weeks, not months.
              </p>
              
              <p className="description-text">
                You'll walk away from this program having designed, built, and
                deployed an end-to-end App, plus a
                proven playbook for starting, planning, and delivering world-class
                work backed by 15 years of real-world experience.
              </p>
              
              <p className="testimonial">
                <strong>This is the class I wish I had taken when I started.</strong>
              </p>
            </div>
          </div>

          <div className="pricing-section">
            <div className="pricing-card">
              <h3 className="course-headline">
                <ShinyText text="AI Everything" disabled={false} speed={3} className="course-shiny" />
              </h3>
              <div className="price-header">
                <span className="original-price">₹8999</span>
                <span className="current-price">₹4999</span>
              </div>
              
              <div className="cohort-info">
                <p><strong>Next cohort:</strong> <span className="cohort-date">August 2 - 5, 2025</span></p>
              </div>
              
              <p className="enrollment-info">
                Enroll today and you'll get <strong>free, lifetime </strong>
                access to every future cohort. You'll never
                pay another cent, ever.
              </p>
              
              <Link to="/payment/zero-one" className="enroll-button">Enroll now</Link>
              
              <div className="sign-in-section">
                <span>Already a member?</span>
                <a href="#" className="sign-in-link">Sign in</a>
              </div>
            </div>
          </div>
        </main>
        
        <div className="about-me-section">
          <h2 className="about-title">Know About Me</h2>
          <div className="profile-container">
            <StackedProfileCards
              name="Chetan A. Singh"
              title="Software Engineer"
              handle="chetansingh"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/profile.png"
              showUserInfo={true}
              enableTilt={true}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage