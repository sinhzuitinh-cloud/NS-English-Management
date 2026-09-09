export default function BrandLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dimensions = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }[size];

  const svgSize = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  }[size];

  return (
    <div
      className={`${dimensions} rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 p-0.5 shadow-lg shadow-amber-500/25 flex items-center justify-center shrink-0`}
    >
      <div className="w-full h-full bg-[#0d1b2a] rounded-[14px] flex items-center justify-center relative overflow-hidden p-1">
        <svg
          className={svgSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer gold accents */}
          <path
            d="M 14 38 A 12 12 0 0 0 14 62"
            stroke="#f59e0b"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M 86 38 A 12 12 0 0 1 86 62"
            stroke="#f59e0b"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Open Book */}
          <path
            d="M 24 28 C 38 28, 48 34, 50 36 C 52 34, 62 28, 76 28 C 79 28, 80 30, 80 33 L 80 72 C 80 74, 78 75, 76 75 C 62 75, 52 70, 50 68 C 48 70, 38 75, 24 75 C 22 75, 20 74, 20 72 L 20 33 C 20 30, 22 28, 24 28 Z"
            fill="#1b263b"
            stroke="#f59e0b"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path d="M 26 31 L 48 37 L 48 68 L 26 62 Z" fill="#ffffff" />
          <path d="M 74 31 L 52 37 L 52 68 L 74 62 Z" fill="#ffffff" />
          <text
            x="31"
            y="55"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="900"
            fontSize="22"
            fill="#1b263b"
          >
            N
          </text>
          <text
            x="58"
            y="55"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="900"
            fontSize="22"
            fill="#1b263b"
          >
            S
          </text>
        </svg>
      </div>
    </div>
  );
}
