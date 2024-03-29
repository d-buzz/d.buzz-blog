import React from 'react'

const HeadingIcon = ({ height = 20, top = 0, style, className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} style={{ marginTop: top, ...style }} className={className} fill="currentColor" class="bi bi-fonts" viewBox="0 0 16 16">
      <path d="M12.258 3H3.747l-.082 2.46h.478c.26-1.544.76-1.783 2.694-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.43.013c1.935.062 2.434.301 2.694 1.846h.479L12.258 3z"/>
    </svg>
  )
}

export default HeadingIcon