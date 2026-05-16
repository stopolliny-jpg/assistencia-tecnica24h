import { forwardRef } from 'react';

export interface PhoneRefs {
  phoneBody: React.RefObject<SVGGElement | null>;
  screen: React.RefObject<SVGGElement | null>;
  battery: React.RefObject<SVGGElement | null>;
  logicBoard: React.RefObject<SVGGElement | null>;
  camera: React.RefObject<SVGGElement | null>;
  connector: React.RefObject<SVGGElement | null>;
  screws: React.RefObject<SVGGElement | null>;
}

interface PhoneExplodedViewProps {
  refs: PhoneRefs;
}

export const PhoneExplodedView = forwardRef<SVGSVGElement, PhoneExplodedViewProps>(
  ({ refs }, svgRef) => {
    return (
      <svg
        ref={svgRef}
        viewBox="0 0 320 640"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[280px] mx-auto drop-shadow-2xl"
        aria-label="iPhone desmontado mostrando componentes internos"
      >
        <defs>
          {/* Body gradient */}
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a2a2e" />
            <stop offset="40%" stopColor="#1c1c1e" />
            <stop offset="100%" stopColor="#0a0a0c" />
          </linearGradient>
          {/* Body side reflection */}
          <linearGradient id="sideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3a3a3c" />
            <stop offset="30%" stopColor="#636366" />
            <stop offset="60%" stopColor="#3a3a3c" />
            <stop offset="100%" stopColor="#1c1c1e" />
          </linearGradient>
          {/* Screen gradient */}
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="50%" stopColor="#0d0d1a" />
            <stop offset="100%" stopColor="#050508" />
          </linearGradient>
          {/* Screen reflection */}
          <linearGradient id="screenReflect" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          {/* Battery gradient */}
          <linearGradient id="batteryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e4a6e" />
            <stop offset="100%" stopColor="#0d2137" />
          </linearGradient>
          {/* PCB gradient */}
          <linearGradient id="pcbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a2e1a" />
            <stop offset="100%" stopColor="#0d1f0d" />
          </linearGradient>
          {/* Neon glow filter */}
          <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glowSoft" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Camera lens */}
          <radialGradient id="lensGrad" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#3a8fd4" />
            <stop offset="40%" stopColor="#1a4a7a" />
            <stop offset="100%" stopColor="#050d14" />
          </radialGradient>
          <radialGradient id="lensReflect" cx="30%" cy="25%" r="40%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* ─── LAYER 1: LOGIC BOARD ─── */}
        <g ref={refs.logicBoard as React.RefObject<SVGGElement>}>
          <rect x="60" y="200" width="200" height="160" rx="8" fill="url(#pcbGrad)" opacity="0.9" />
          {/* Chips */}
          <rect x="80" y="215" width="50" height="35" rx="3" fill="#0f2a0f" stroke="#1a4a1a" strokeWidth="0.5" />
          <rect x="87" y="220" width="36" height="25" rx="2" fill="#1a3a1a" />
          <text x="105" y="236" fill="#00cc44" fontSize="6" fontFamily="monospace" textAnchor="middle">A17</text>
          <text x="105" y="242" fill="#00aa33" fontSize="4.5" fontFamily="monospace" textAnchor="middle">BIONIC</text>

          <rect x="145" y="215" width="40" height="28" rx="3" fill="#0f2a0f" stroke="#1a4a1a" strokeWidth="0.5" />
          <rect x="150" y="219" width="30" height="20" rx="2" fill="#1a3a1a" />
          <text x="165" y="232" fill="#00cc44" fontSize="5" fontFamily="monospace" textAnchor="middle">RAM</text>

          <rect x="200" y="215" width="45" height="28" rx="3" fill="#0f2a0f" stroke="#1a4a1a" strokeWidth="0.5" />
          <rect x="205" y="219" width="35" height="20" rx="2" fill="#1a3a1a" />
          <text x="222" y="232" fill="#00cc44" fontSize="5" fontFamily="monospace" textAnchor="middle">NFC</text>

          {/* Circuit traces */}
          {[0,1,2,3,4].map((i) => (
            <line key={i} x1="80" y1={260 + i * 16} x2="240" y2={260 + i * 16} stroke="#1a4a1a" strokeWidth="0.8" opacity="0.6" />
          ))}
          {[0,1,2,3,4,5].map((i) => (
            <line key={i} x1={95 + i * 28} y1="260" x2={95 + i * 28} y2="350" stroke="#1a4a1a" strokeWidth="0.8" opacity="0.6" />
          ))}
          {/* Dots */}
          {[0,1,2].map((row) =>
            [0,1,2,3,4].map((col) => (
              <circle key={`${row}-${col}`} cx={85 + col * 38} cy={270 + row * 28} r="2" fill="#003311" stroke="#00cc44" strokeWidth="0.5" />
            ))
          )}
          {/* Small components */}
          {[0,1,2,3].map((i) => (
            <rect key={i} x={70 + i * 45} y="310" width="28" height="14" rx="2" fill="#0f2a0f" stroke="#1a4a1a" strokeWidth="0.5" />
          ))}
        </g>

        {/* ─── LAYER 2: BATTERY ─── */}
        <g ref={refs.battery as React.RefObject<SVGGElement>}>
          <rect x="72" y="370" width="176" height="120" rx="14" fill="url(#batteryGrad)" stroke="#1e5a8a" strokeWidth="1" />
          {/* Battery cells */}
          <rect x="82" y="380" width="156" height="100" rx="10" fill="#0d1e30" />
          {/* Level indicator */}
          <rect x="90" y="388" width="130" height="16" rx="4" fill="#0a1520" />
          <rect x="92" y="390" width="100" height="12" rx="3" fill="#1e6aaa" />
          <rect x="92" y="390" width="100" height="6" rx="3" fill="#2a8ad4" opacity="0.4" />
          {/* Cells dividers */}
          <line x1="82" y1="414" x2="238" y2="414" stroke="#1e3a5a" strokeWidth="0.5" />
          <line x1="82" y1="434" x2="238" y2="434" stroke="#1e3a5a" strokeWidth="0.5" />
          <line x1="82" y1="454" x2="238" y2="454" stroke="#1e3a5a" strokeWidth="0.5" />
          {/* Label */}
          <text x="160" y="440" fill="#2a8ad4" fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.8">Li-Ion 3227 mAh</text>
          <text x="160" y="452" fill="#1e5a8a" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.7">3.83V · 12.36Wh</text>
          {/* Battery terminal */}
          <rect x="148" y="372" width="24" height="6" rx="2" fill="#1e5a8a" />
        </g>

        {/* ─── LAYER 3: CONNECTOR ─── */}
        <g ref={refs.connector as React.RefObject<SVGGElement>}>
          {/* Lightning connector */}
          <rect x="126" y="596" width="68" height="20" rx="5" fill="#2a2a2e" stroke="#3a3a3c" strokeWidth="0.8" />
          <rect x="134" y="599" width="52" height="14" rx="3" fill="#1a1a1e" />
          {/* Pins */}
          {[0,1,2,3,4,5,6,7].map((i) => (
            <rect key={i} x={137 + i * 6} y="602" width="3" height="8" rx="1" fill="#3a3a3c" />
          ))}
          {/* Speaker grille */}
          {[0,1,2,3,4].map((i) => (
            <circle key={`l-${i}`} cx={88 + i * 8} cy="607" r="2.5" fill="none" stroke="#2a2a2c" strokeWidth="1" />
          ))}
          {[0,1,2,3,4].map((i) => (
            <circle key={`r-${i}`} cx={208 + i * 8} cy="607" r="2.5" fill="none" stroke="#2a2a2c" strokeWidth="1" />
          ))}
        </g>

        {/* ─── LAYER 4: SCREWS & DETAILS ─── */}
        <g ref={refs.screws as React.RefObject<SVGGElement>}>
          {/* Screws at corners */}
          {[
            [92, 598], [228, 598],
            [92, 45], [228, 45],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="5" fill="#2a2a2e" stroke="#3a3a3c" strokeWidth="0.5" />
              <line x1={cx - 3} y1={cy} x2={cx + 3} y2={cy} stroke="#3a3a3c" strokeWidth="0.8" />
              <line x1={cx} y1={cy - 3} x2={cx} y2={cy + 3} stroke="#3a3a3c" strokeWidth="0.8" />
            </g>
          ))}
          {/* Side buttons */}
          <rect x="318" y="160" width="4" height="50" rx="2" fill="#3a3a3c" />
          <rect x="318" y="230" width="4" height="30" rx="2" fill="#3a3a3c" />
          <rect x="-2" y="150" width="4" height="36" rx="2" fill="#3a3a3c" />
          <rect x="-2" y="198" width="4" height="36" rx="2" fill="#3a3a3c" />
          <rect x="-2" y="246" width="4" height="36" rx="2" fill="#3a3a3c" />
          {/* Internal flex cables */}
          <path d="M 160 200 Q 160 180 140 170 Q 120 160 120 140" fill="none" stroke="#1a3a1a" strokeWidth="1.5" opacity="0.4" />
          <path d="M 160 370 Q 160 380 170 385 Q 180 390 180 400" fill="none" stroke="#1a2a3a" strokeWidth="1.5" opacity="0.4" />
        </g>

        {/* ─── LAYER 5: CAMERA MODULE ─── */}
        <g ref={refs.camera as React.RefObject<SVGGElement>}>
          {/* Camera island */}
          <rect x="58" y="42" width="88" height="88" rx="20" fill="#1c1c1e" stroke="#2a2a2c" strokeWidth="1" />
          <rect x="64" y="48" width="76" height="76" rx="16" fill="#141416" />
          {/* Main lens */}
          <circle cx="102" cy="86" r="26" fill="#0a0a0c" />
          <circle cx="102" cy="86" r="22" fill="url(#lensGrad)" />
          <circle cx="102" cy="86" r="17" fill="#050810" />
          <circle cx="102" cy="86" r="13" fill="url(#lensGrad)" opacity="0.8" />
          <circle cx="102" cy="86" r="8" fill="#030508" />
          <circle cx="96" cy="80" r="4" fill="url(#lensReflect)" opacity="0.6" />
          {/* Secondary lens */}
          <circle cx="132" cy="68" r="14" fill="#0a0a0c" />
          <circle cx="132" cy="68" r="11" fill="url(#lensGrad)" opacity="0.9" />
          <circle cx="132" cy="68" r="7" fill="#030508" />
          <circle cx="128" cy="64" r="3" fill="url(#lensReflect)" opacity="0.5" />
          {/* Flash */}
          <circle cx="130" cy="96" r="7" fill="#1a1a1c" />
          <circle cx="130" cy="96" r="5" fill="#2a2414" />
          <circle cx="130" cy="96" r="3" fill="#3a3020" />
          {/* LiDAR */}
          <circle cx="72" cy="96" r="6" fill="#1a1a1c" />
          <circle cx="72" cy="96" r="4" fill="#0d0d0f" />
          <circle cx="72" cy="96" r="2" fill="#1a0a0a" />
        </g>

        {/* ─── LAYER 6: PHONE BODY ─── */}
        <g ref={refs.phoneBody as React.RefObject<SVGGElement>}>
          {/* Main body */}
          <rect x="20" y="20" width="280" height="600" rx="44" fill="url(#bodyGrad)" />
          {/* Side border gradient for metallic feel */}
          <rect x="20" y="20" width="280" height="600" rx="44" fill="none" stroke="url(#sideGrad)" strokeWidth="2.5" />
          {/* Inner shadow to make it look deep */}
          <rect x="24" y="24" width="272" height="592" rx="40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          {/* Dynamic island */}
          <rect x="118" y="36" width="84" height="28" rx="14" fill="#050505" />
          <circle cx="176" cy="50" r="8" fill="#080808" />
          {/* Front camera in island */}
          <circle cx="176" cy="50" r="5" fill="#0a0a0c" />
          <circle cx="176" cy="50" r="3" fill="#050810" opacity="0.8" />
        </g>

        {/* ─── LAYER 7: SCREEN ─── */}
        <g ref={refs.screen as React.RefObject<SVGGElement>}>
          <rect x="24" y="24" width="272" height="592" rx="40" fill="url(#screenGrad)" />
          {/* Screen content - subtle UI */}
          <rect x="34" y="34" width="252" height="572" rx="36" fill="url(#screenGrad)" />
          {/* Diagonal reflection */}
          <path
            d="M 50 34 L 200 34 L 50 180 Z"
            fill="url(#screenReflect)"
            opacity="0.4"
          />
          {/* Status bar */}
          <text x="48" y="76" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="system-ui" fontWeight="600">9:41</text>
          {/* Battery & signal icons */}
          <rect x="240" y="67" width="22" height="12" rx="3" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <rect x="241" y="68" width="16" height="10" rx="2" fill="rgba(255,255,255,0.4)" />
          <rect x="263" y="70" width="2" height="6" rx="1" fill="rgba(255,255,255,0.4)" />
          {/* App icons grid - subtle */}
          {[0,1,2,3].map((col) =>
            [0,1,2,3].map((row) => (
              <rect
                key={`${col}-${row}`}
                x={52 + col * 58}
                y={110 + row * 70}
                width="40"
                height="40"
                rx="10"
                fill="rgba(255,255,255,0.04)"
              />
            ))
          )}
          {/* Home indicator */}
          <rect x="130" y="590" width="60" height="4" rx="2" fill="rgba(255,255,255,0.25)" />
          {/* Dynamic island hole */}
          <rect x="118" y="36" width="84" height="28" rx="14" fill="#000000" />
        </g>
      </svg>
    );
  }
);

PhoneExplodedView.displayName = 'PhoneExplodedView';
