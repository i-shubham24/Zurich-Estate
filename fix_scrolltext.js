const fs = require('fs');

let content = fs.readFileSync('src/components/ScrollTextHero.tsx', 'utf8');

// Replace useSpring import
content = content.replace('useSpring, useTransform', 'useTransform');

// Replace progress = useSpring... block with direct assignment
const springBlock =   // Spring-smoothed progress ??? glassy parallax instead of frame jitter
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.001,
  });;

content = content.replace(springBlock,   // Disable useSpring to prevent iOS rubber-band double-smoothing conflicts
  const progress = scrollYProgress;);

// Add hardware acceleration to background image div
content = content.replace('style={{ y: imageY }}', 'style={{ y: imageY, willChange: "transform", WebkitTransform: "translate3d(0,0,0)" }}');

// Add hardware acceleration to text div
content = content.replace('style={{ y: textY, opacity: textOpacity }}', 'style={{ y: textY, opacity: textOpacity, willChange: "transform, opacity", WebkitTransform: "translate3d(0,0,0)" }}');

fs.writeFileSync('src/components/ScrollTextHero.tsx', content);
