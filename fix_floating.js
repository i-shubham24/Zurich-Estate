const fs = require('fs');

let content = fs.readFileSync('src/components/FloatingGallery.tsx', 'utf8');

const xLine = '  const xTransform = useTransform(progress, [popStart, popFull, hideStart, hideFull], ["50%", img.left, img.left, img.left]);';
const yLine = '  const yTransform = useTransform(progress, [popStart, popFull, hideStart, hideFull], ["50%", img.top, img.top, "150%"]);';

content = content.replace(xLine, '');
content = content.replace(yLine, '');

// Now fix the motion.div style
content = content.replace(
\      style={{
        left: xTransform,
        top: yTransform,
        scale,
        opacity,
        width: img.width,
        height: img.height,
        x: "-50%",
        y: "-50%",
      }}\,
\      style={{
        left: img.left,
        top: img.top,
        scale,
        opacity,
        width: img.width,
        height: img.height,
        x: "-50%",
        y: "-50%",
        willChange: "transform, opacity",
        WebkitTransform: "translate3d(0,0,0)"
      }}\
);

// We need to also translate it down on exit if we want, but opacity fade out is fine.
// I will also add WebkitTransform and willChange.

fs.writeFileSync('src/components/FloatingGallery.tsx', content);
