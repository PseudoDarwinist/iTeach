import React from 'react'

const StarRow = ({ count = 5, size = 18 }) => {
  return (
    <div className="feedback-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, index) => (
        <span key={index} className="feedback-star" style={{ fontSize: size }}>
          ★
        </span>
      ))}
    </div>
  )
}

const Feedback = ({
  quote = "This is the best machine learning course I've done. Worth every cent.",
  author = 'Jose Reyes',
  role = 'AI/ML at Cevo Australia',
  compact = false
}) => {
  return (
    <figure className={`feedback ${compact ? 'feedback-compact' : ''}`}>
      <StarRow />
      <blockquote className="feedback-quote">“{quote}”</blockquote>
      <figcaption className="feedback-caption">
        — <span className="feedback-author">{author}</span>
        {role ? <span className="feedback-role">, {role}</span> : null}
      </figcaption>
    </figure>
  )
}

export default Feedback





