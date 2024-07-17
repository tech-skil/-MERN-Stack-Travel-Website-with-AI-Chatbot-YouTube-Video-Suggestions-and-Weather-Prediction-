import React, { useEffect, useRef } from 'react';

const ScrollAnimationComponent = ({ children }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          entry.target.classList.remove('animate');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="scroll-animation-wrapper">
      {React.Children.map(children, (child, index) => (
        <div key={index} className="scroll-animate">
          {child}
        </div>
      ))}
    </div>
  );
};

export default ScrollAnimationComponent;