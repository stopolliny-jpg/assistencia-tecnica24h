export function PhoneExplodedView() {
  return (
    <div className="relative w-full max-w-[300px] md:max-w-[400px] aspect-[1/2] mx-auto">
      {/* 1. Base/Body */}
      <div id="phone-body" className="phone-layer absolute inset-0 z-10">
        <svg viewBox="0 0 400 800" className="w-full h-full drop-shadow-2xl">
          <rect x="10" y="10" width="380" height="780" rx="60" fill="#1d1d1f" stroke="#3a3a3c" strokeWidth="4" />
          <rect x="20" y="20" width="360" height="760" rx="50" fill="#111" />
          {/* Internal structure details */}
          <rect x="40" y="60" width="320" height="680" rx="20" fill="#1a1a1c" />
        </svg>
      </div>

      {/* 2. Logic Board */}
      <div id="phone-logic-board" className="phone-layer absolute inset-0 z-20">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          <path d="M220 80 H350 V400 H280 V180 H220 Z" fill="#2d2d2f" stroke="#444" strokeWidth="1" />
          <rect x="230" y="90" width="110" height="80" rx="4" fill="#3a3a3c" />
          <rect x="240" y="100" width="40" height="40" rx="2" fill="#0071e3" fillOpacity="0.3" />
          <circle cx="310" cy="130" r="15" fill="#444" />
        </svg>
      </div>

      {/* 3. Battery */}
      <div id="phone-battery" className="phone-layer absolute inset-0 z-30">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          <rect x="50" y="150" width="160" height="450" rx="10" fill="#111" stroke="#333" strokeWidth="2" />
          <rect x="60" y="160" width="140" height="430" rx="5" fill="#1a1a1c" />
          <text x="130" y="380" fontFamily="sans-serif" fontSize="12" fill="#444" textAnchor="middle" transform="rotate(-90, 130, 380)">LITHIUM ION BATTERY</text>
        </svg>
      </div>

      {/* 4. Camera Module */}
      <div id="phone-camera" className="phone-layer absolute inset-0 z-40">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          <rect x="230" y="50" width="120" height="120" rx="20" fill="#1d1d1f" stroke="#333" strokeWidth="1" />
          <circle cx="265" cy="85" r="25" fill="#000" stroke="#222" strokeWidth="2" />
          <circle cx="265" cy="85" r="8" fill="#111" />
          <circle cx="315" cy="135" r="20" fill="#000" stroke="#222" strokeWidth="2" />
          <circle cx="315" cy="135" r="6" fill="#111" />
        </svg>
      </div>

      {/* 5. Taptic/Connector */}
      <div id="phone-connector" className="phone-layer absolute inset-0 z-50">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          <rect x="50" y="650" width="300" height="100" rx="10" fill="#222" stroke="#333" strokeWidth="1" />
          <rect x="150" y="740" width="100" height="15" rx="4" fill="#333" />
          <rect x="80" y="670" width="80" height="50" rx="4" fill="#333" />
          <text x="120" y="700" fontFamily="sans-serif" fontSize="8" fill="#555" textAnchor="middle">TAPTIC ENGINE</text>
        </svg>
      </div>

      {/* 6. Screen */}
      <div id="phone-screen" className="phone-layer absolute inset-0 z-[60]">
        <svg viewBox="0 0 400 800" className="w-full h-full drop-shadow-2xl">
          <rect x="10" y="10" width="380" height="780" rx="60" fill="black" stroke="#222" strokeWidth="2" />
          <rect x="15" y="15" width="370" height="770" rx="55" fill="url(#screen-grad)" fillOpacity="0.1" />
          <defs>
            <linearGradient id="screen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Dynamic "Screen Content" placeholder */}
          <rect x="180" y="40" width="40" height="10" rx="5" fill="#111" />
        </svg>
      </div>
    </div>
  );
}
