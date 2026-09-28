/**
 * The control-joint grid.
 *
 * Real slabs are saw-cut on a grid so the concrete cracks where you decide,
 * not where it wants to. That grid is this site's layout system, and on the
 * hero it draws itself once on load — the site's single signature moment.
 *
 * Pure CSS on server-rendered markup: no JS, no hydration gate, nothing on the
 * LCP path. Reduced motion collapses it to a drawn grid instantly via the
 * global rule in globals.css.
 */
export function JointGrid({ className = '' }: { className?: string }) {
  // Uneven spacing on purpose — a real slab is jointed to its edges and
  // openings, not to a tidy fifth.
  const verticals = [18, 41, 67, 86]
  const horizontals = [27, 58, 79]

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="0.15" vectorEffect="non-scaling-stroke">
        {verticals.map((x, i) => (
          <line
            key={`v${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="100"
            className="joint-draw joint-draw-v"
            style={{ animationDelay: `${120 + i * 90}ms` }}
          />
        ))}
        {horizontals.map((y, i) => (
          <line
            key={`h${y}`}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            className="joint-draw joint-draw-h"
            style={{ animationDelay: `${260 + i * 90}ms` }}
          />
        ))}
      </g>
    </svg>
  )
}
