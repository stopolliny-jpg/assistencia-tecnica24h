// Unused import removed

export function PhoneExplodedView() {
  return (
    <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] aspect-[1/2] mx-auto perspective-1000">
      
      {/* GLOW EFFECT IN BACKGROUND */}
      <div className="absolute inset-0 bg-apple-blue/10 rounded-[55px] blur-[60px] opacity-40 mix-blend-screen pointer-events-none layer-bg-glow" />

      {/* CONNECTING PATHS / DOTTED WIRES (FADE IN ON EXPLODED VIEW) */}
      <svg viewBox="0 0 400 800" className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-0 layer-connecting-lines transition-opacity duration-700">
        {/* Screen Connectors */}
        <line x1="200" y1="200" x2="200" y2="400" stroke="#00d4ff" strokeWidth="2" strokeDasharray="6 4" strokeOpacity="0.4" />
        {/* Battery Socket Wire */}
        <path d="M125 390 H 220" stroke="#0071e3" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.5" />
        {/* Camera Connector Wire */}
        <path d="M280 110 H 240" stroke="#00d4ff" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.5" />
        {/* Connector/Flex bottom Wire */}
        <path d="M200 680 V 550" stroke="#0071e3" strokeWidth="2" strokeDasharray="5 3" strokeOpacity="0.4" />
      </svg>

      {/* LAYER 1: BASE / BACK TITANIUM BODY (CHASSIS) */}
      <div className="absolute inset-0 z-10 layer-body transform transition-all duration-300 phone-frame-container">
        <svg viewBox="0 0 400 800" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
          {/* External titanium frame with premium edge highlight */}
          <rect x="15" y="15" width="370" height="770" rx="55" fill="#09090b" stroke="url(#titanium-grad)" strokeWidth="4" />
          {/* Inner chassis texture/heat shield */}
          <rect x="25" y="25" width="350" height="750" rx="45" fill="#121215" stroke="#1d1d22" strokeWidth="2" />
          
          {/* Heat dissipation copper graphite pad */}
          <rect x="70" y="220" width="260" height="360" rx="20" fill="url(#chassis-graphite-grad)" stroke="#222" strokeWidth="1" />
          <rect x="90" y="250" width="220" height="300" rx="10" fill="#09090b" stroke="#111" strokeWidth="1" />
          
          {/* Wireless charging coil pattern */}
          <circle cx="200" cy="400" r="100" fill="none" stroke="#2c2c35" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.3" />
          <circle cx="200" cy="400" r="85" fill="none" stroke="#2c2c35" strokeWidth="1.5" strokeDasharray="8 6" strokeOpacity="0.25" />
          <circle cx="200" cy="400" r="70" fill="none" stroke="#2c2c35" strokeWidth="1.5" strokeOpacity="0.2" />

          {/* Gradients */}
          <defs>
            <linearGradient id="titanium-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#434348" />
              <stop offset="50%" stopColor="#8e9eab" />
              <stop offset="100%" stopColor="#243b55" />
            </linearGradient>
            <linearGradient id="chassis-graphite-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#18181b" />
              <stop offset="50%" stopColor="#2c2c35" />
              <stop offset="100%" stopColor="#18181b" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* LAYER 2: LOGIC BOARD (MOTHERBOARD) */}
      <div className="absolute inset-0 z-20 layer-logic-board transform transition-all duration-300 phone-frame-container">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          {/* Motherboard Layout (L-Shape on the right side) */}
          <path 
            d="M 230 70 
               H 345 
               V 580 
               H 275 
               V 220 
               H 230 
               Z" 
            fill="#111215" 
            stroke="#00d4ff" 
            strokeWidth="1.5" 
            strokeOpacity="0.4"
            className="drop-shadow-[0_10px_15px_rgba(0,212,255,0.15)]"
          />
          
          {/* Micro-soldered traces / Circuits */}
          <path d="M 285 240 V 550" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 315 100 V 500" stroke="#334155" strokeWidth="1" strokeDasharray="5 5" />
          <path d="M 245 100 H 330" stroke="#475569" strokeWidth="0.8" />
          <path d="M 290 320 H 335" stroke="#0071e3" strokeWidth="1" strokeOpacity="0.5" />
          <path d="M 255 180 H 315" stroke="#334155" strokeWidth="1" />

          {/* Golden Test Points */}
          <circle cx="250" cy="90" r="2.5" fill="#f59e0b" />
          <circle cx="260" cy="95" r="2.5" fill="#f59e0b" />
          <circle cx="245" cy="115" r="2.5" fill="#f59e0b" />
          <circle cx="330" cy="250" r="3" fill="#f59e0b" />
          <circle cx="310" cy="480" r="2.5" fill="#f59e0b" />
          <circle cx="295" cy="540" r="3.5" fill="#f59e0b" />

          {/* Processor Core Chip (A17 Pro CPU) */}
          <rect x="245" y="110" width="85" height="85" rx="8" fill="url(#chip-grad)" stroke="#444" strokeWidth="1.5" />
          <rect x="252" y="117" width="71" height="71" rx="4" fill="none" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.5" />
          
          {/* Chip Label */}
          <text x="287.5" y="152" fontFamily="system-ui, -apple-system, sans-serif" fontSize="11" fontWeight="bold" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">A17 PRO</text>
          <text x="287.5" y="165" fontFamily="system-ui, -apple-system, sans-serif" fontSize="7" fontWeight="bold" fill="#00d4ff" textAnchor="middle" fillOpacity="0.8" letterSpacing="0.2">3nm CHIP</text>

          {/* NAND Flash Storage Chip */}
          <rect x="280" y="340" width="55" height="70" rx="4" fill="#1f2937" stroke="#374151" strokeWidth="1" />
          <text x="307.5" y="380" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#9ca3af" textAnchor="middle">NAND</text>
          
          {/* Power Management IC */}
          <rect x="280" y="440" width="45" height="45" rx="3" fill="#111827" stroke="#374151" strokeWidth="1" />
          <circle cx="302.5" cy="462.5" r="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="0.8" />

          {/* Gradients */}
          <defs>
            <linearGradient id="chip-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#27272a" />
              <stop offset="50%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* LAYER 3: BATTERY */}
      <div className="absolute inset-0 z-30 layer-battery transform transition-all duration-300 phone-frame-container">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          {/* High-tech battery block */}
          <rect 
            x="45" 
            y="150" 
            width="175" 
            height="480" 
            rx="16" 
            fill="#09090b" 
            stroke="#27272a" 
            strokeWidth="3.5" 
            className="drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          />
          {/* Battery cell inner label area */}
          <rect x="52" y="157" width="161" height="466" rx="10" fill="#131316" />

          {/* High-tech tech specifications */}
          <text x="132" y="220" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="bold" fill="#ffffff" textAnchor="middle" letterSpacing="1">LITHIUM-ION CELL</text>
          <text x="132" y="240" fontFamily="sans-serif" fontSize="10" fill="#3b82f6" fontWeight="semibold" textAnchor="middle">APN: 616-00827 | 3.82V</text>
          
          {/* Battery Health bar indicator */}
          <rect x="75" y="280" width="115" height="6" rx="3" fill="#222" />
          <rect x="75" y="280" width="115" height="6" rx="3" fill="url(#battery-health-grad)" />

          {/* Technical warnings text simulated by lines */}
          <line x1="75" y1="320" x2="190" y2="320" stroke="#444" strokeWidth="1" />
          <line x1="75" y1="335" x2="170" y2="335" stroke="#444" strokeWidth="1" />
          <line x1="75" y1="350" x2="185" y2="350" stroke="#444" strokeWidth="1" />
          <line x1="75" y1="365" x2="140" y2="365" stroke="#444" strokeWidth="1" />

          {/* High-capacity Warning Label Icons */}
          <circle cx="90" cy="420" r="14" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1" />
          <text x="90" y="424" fontFamily="system-ui" fontSize="12" fill="#3b82f6" fontWeight="bold" textAnchor="middle">i</text>
          
          <rect x="115" y="408" width="75" height="24" rx="4" fill="#222" />
          <text x="152.5" y="423" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#888" textAnchor="middle">4422 mAh</text>

          {/* Warning Icon (Exclamation) */}
          <polygon points="132.5,465 142.5,482 122.5,482" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" />
          <circle cx="132.5" cy="477" r="1" fill="#ef4444" />
          <line x1="132.5" y1="470" x2="132.5" y2="475" stroke="#ef4444" strokeWidth="1.5" />
          <text x="132.5" y="505" fontFamily="sans-serif" fontSize="8" fill="#ef4444" fontWeight="bold" textAnchor="middle">WARNING: DO NOT CRUSH</text>

          {/* Copper connector ribbon */}
          <path d="M 200 370 Q 230 370 230 390" fill="none" stroke="#b45309" strokeWidth="5" strokeLinecap="round" />
          <rect x="222" y="385" width="16" height="12" rx="2" fill="#f59e0b" stroke="#9a3412" strokeWidth="1" />

          <defs>
            <linearGradient id="battery-health-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0071e3" />
              <stop offset="100%" stopColor="#00d4ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* LAYER 4: CHARGING PORT & TAPTIC ENGINE (CONNECTOR ASSEMBLY) */}
      <div className="absolute inset-0 z-40 layer-connector transform transition-all duration-300 phone-frame-container">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          {/* Main charging flex cable layout */}
          <path d="M 120 730 H 280 V 750 H 120 Z" fill="#1e293b" />
          
          {/* Taptic Engine Unit (Left) */}
          <rect 
            x="48" 
            y="645" 
            width="125" 
            height="75" 
            rx="12" 
            fill="#121316" 
            stroke="#3f3f46" 
            strokeWidth="2" 
            className="drop-shadow-lg"
          />
          <rect x="54" y="651" width="113" height="63" rx="8" fill="url(#taptic-grad)" />
          {/* Inner details of Taptic */}
          <rect x="75" y="665" width="70" height="35" rx="4" fill="#000" stroke="#333" strokeWidth="1" />
          <text x="110" y="682" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="black" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">TAPTIC ENGINE</text>
          <text x="110" y="692" fontFamily="sans-serif" fontSize="6" fontWeight="bold" fill="#00d4ff" textAnchor="middle">HAPTIC DRIVE</text>
          {/* Vibration waves */}
          <path d="M 62 675 Q 67 682 62 690" stroke="#00d4ff" strokeWidth="1" fill="none" strokeOpacity="0.5" />
          <path d="M 158 675 Q 153 682 158 690" stroke="#00d4ff" strokeWidth="1" fill="none" strokeOpacity="0.5" />

          {/* USB-C/Lightning charging port chamber */}
          <rect x="165" y="730" width="70" height="32" rx="6" fill="#18181b" stroke="#52525b" strokeWidth="2" />
          {/* Metallic pins inside port */}
          <rect x="175" y="742" width="50" height="8" rx="2" fill="#d97706" />
          <line x1="180" y1="746" x2="220" y2="746" stroke="#222" strokeWidth="1.5" strokeDasharray="3 2" />
          
          {/* Bottom Loudspeaker assembly (Right) */}
          <rect 
            x="227" 
            y="645" 
            width="125" 
            height="75" 
            rx="12" 
            fill="#121316" 
            stroke="#3f3f46" 
            strokeWidth="2" 
            className="drop-shadow-lg"
          />
          <rect x="233" y="651" width="113" height="63" rx="8" fill="#18181b" />
          {/* Acoustic Chamber speaker mesh pattern */}
          <circle cx="288" cy="682" r="22" fill="#0c0c0e" stroke="#222" strokeWidth="1" />
          <circle cx="288" cy="682" r="16" fill="none" stroke="#222" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="288" cy="682" r="10" fill="none" stroke="#333" strokeWidth="2" strokeDasharray="4 2" />

          <defs>
            <linearGradient id="taptic-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="50%" stopColor="#111827" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* LAYER 5: CAMERA MODULE */}
      <div className="absolute inset-0 z-50 layer-camera transform transition-all duration-300 phone-frame-container">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          {/* Camera bracket */}
          <rect 
            x="220" 
            y="42" 
            width="135" 
            height="135" 
            rx="25" 
            fill="#121214" 
            stroke="#2d2d30" 
            strokeWidth="2"
            className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
          />
          <rect x="226" y="48" width="123" height="123" rx="19" fill="#18181b" />

          {/* Lens 1: Main 48MP Camera (Top Left) */}
          <circle cx="265" cy="84" r="28" fill="url(#camera-lens-case-grad)" stroke="#3f3f46" strokeWidth="1.5" />
          <circle cx="265" cy="84" r="20" fill="#000" />
          {/* Sapphire glass reflection */}
          <circle cx="265" cy="84" r="14" fill="url(#lens-glass-grad)" />
          <circle cx="262" cy="80" r="4" fill="#fff" fillOpacity="0.4" />
          <circle cx="265" cy="84" r="7" fill="#020617" />
          <circle cx="265" cy="84" r="2" fill="#00d4ff" />

          {/* Lens 2: Ultra Wide 12MP Camera (Bottom Left) */}
          <circle cx="265" cy="138" r="24" fill="url(#camera-lens-case-grad)" stroke="#3f3f46" strokeWidth="1.5" />
          <circle cx="265" cy="138" r="16" fill="#000" />
          <circle cx="265" cy="138" r="10" fill="url(#lens-glass-grad)" />
          <circle cx="263" cy="135" r="3" fill="#fff" fillOpacity="0.4" />
          <circle cx="265" cy="138" r="5" fill="#020617" />

          {/* Lens 3: Telephoto 12MP Camera (Right Center) */}
          <circle cx="316" cy="111" r="26" fill="url(#camera-lens-case-grad)" stroke="#3f3f46" strokeWidth="1.5" />
          <circle cx="316" cy="111" r="18" fill="#000" />
          <circle cx="316" cy="111" r="12" fill="url(#lens-glass-grad)" />
          <circle cx="314" cy="108" r="3.5" fill="#fff" fillOpacity="0.4" />
          <circle cx="316" cy="111" r="6" fill="#020617" />
          
          {/* LiDAR Sensor (Bottom Right) */}
          <circle cx="316" cy="150" r="10" fill="#27272a" stroke="#3f3f46" strokeWidth="1" />
          <circle cx="316" cy="150" r="7" fill="#09090b" />
          <circle cx="316" cy="150" r="3" fill="#ef4444" fillOpacity="0.4" />

          {/* True Tone Flash (Top Right) */}
          <circle cx="316" cy="72" r="12" fill="url(#flash-grad)" stroke="#3f3f46" strokeWidth="1" />
          <circle cx="316" cy="72" r="6" fill="#ffedd5" />
          <circle cx="316" cy="72" r="3" fill="#f59e0b" />

          <defs>
            <linearGradient id="camera-lens-case-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2d2d30" />
              <stop offset="100%" stopColor="#0c0c0e" />
            </linearGradient>
            <linearGradient id="lens-glass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="30%" stopColor="#311042" />
              <stop offset="70%" stopColor="#0c2340" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <radialGradient id="flash-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#1c1917" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* LAYER 6: SCREWS & PROTECTION SHIELDS */}
      <div className="absolute inset-0 z-55 layer-screws transform transition-all duration-300 phone-frame-container pointer-events-none">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          {/* Metal shield plate for logic board connectors */}
          <path d="M 235 220 H 270 V 380 H 235 Z" fill="#3f3f46" fillOpacity="0.85" stroke="#71717a" strokeWidth="0.8" className="drop-shadow-md" />
          <circle cx="242" cy="228" r="2.5" fill="url(#screw-thread)" stroke="#111" strokeWidth="0.5" />
          <circle cx="262" cy="372" r="2.5" fill="url(#screw-thread)" stroke="#111" strokeWidth="0.5" />
          <text x="252.5" y="300" fontFamily="sans-serif" fontSize="5" fontWeight="bold" fill="#888" textAnchor="middle" transform="rotate(-90 252.5 300)">SHIELD A</text>

          {/* Metal shield for display connector */}
          <rect x="235" y="440" width="35" height="80" rx="3" fill="#3f3f46" fillOpacity="0.85" stroke="#71717a" strokeWidth="0.8" />
          <circle cx="252" cy="510" r="2.5" fill="url(#screw-thread)" stroke="#111" strokeWidth="0.5" />

          {/* Multiple tiny screws scattered around to float */}
          <circle cx="28" cy="35" r="4.5" fill="url(#screw-thread)" stroke="#111" strokeWidth="0.5" className="floating-screw-1" />
          <circle cx="372" cy="35" r="4.5" fill="url(#screw-thread)" stroke="#111" strokeWidth="0.5" className="floating-screw-2" />
          <circle cx="28" cy="765" r="4.5" fill="url(#screw-thread)" stroke="#111" strokeWidth="0.5" className="floating-screw-3" />
          <circle cx="372" cy="765" r="4.5" fill="url(#screw-thread)" stroke="#111" strokeWidth="0.5" className="floating-screw-4" />
          <circle cx="218" cy="168" r="4" fill="url(#screw-thread)" stroke="#111" strokeWidth="0.5" className="floating-screw-5" />
          <circle cx="188" cy="638" r="4" fill="url(#screw-thread)" stroke="#111" strokeWidth="0.5" className="floating-screw-6" />

          <defs>
            <radialGradient id="screw-thread" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a1a1aa" />
              <stop offset="40%" stopColor="#52525b" />
              <stop offset="60%" stopColor="#27272a" />
              <stop offset="90%" stopColor="#71717a" />
              <stop offset="100%" stopColor="#09090b" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* LAYER 7: DISPLAY PANEL (SCREEN) */}
      <div className="absolute inset-0 z-60 layer-screen transform transition-all duration-300 phone-frame-container">
        <svg viewBox="0 0 400 800" className="w-full h-full drop-shadow-[0_30px_60px_rgba(0,113,227,0.3)]">
          {/* Glass display panel backing */}
          <rect x="15" y="15" width="370" height="770" rx="55" fill="black" stroke="#222" strokeWidth="1" />
          
          {/* Glowing active screen bezel and OLED premium wallpaper */}
          <rect x="20" y="20" width="360" height="760" rx="50" fill="url(#screen-wallpaper-grad)" />
          
          {/* Glass reflections overlay */}
          <path d="M 20 20 L 380 400 L 380 20 Z" fill="url(#screen-glass-glare-1)" />
          <path d="M 20 500 L 380 780 L 20 780 Z" fill="url(#screen-glass-glare-2)" />

          {/* Screen boundary border line for deep OLED feel */}
          <rect x="20" y="20" width="360" height="760" rx="50" fill="none" stroke="#0071e3" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Dynamic Island pill shape */}
          <rect x="145" y="42" width="110" height="26" rx="13" fill="#000" />
          {/* Camera Lens in Dynamic Island */}
          <circle cx="225" cy="55" r="5.5" fill="#111" />
          <circle cx="225" cy="55" r="2.5" fill="#002d62" />
          
          {/* iOS Interface Simulation (Clean & Minimalist Apple Style) */}
          {/* Time & Date */}
          <text x="75" y="125" fontFamily="system-ui, -apple-system, sans-serif" fontSize="42" fontWeight="200" fill="#ffffff" textAnchor="middle">09:41</text>
          <text x="75" y="150" fontFamily="system-ui, -apple-system, sans-serif" fontSize="11" fontWeight="bold" fill="#ffffff" fillOpacity="0.8" textAnchor="middle">Sábado, 16 de Maio</text>

          {/* Glowing Home Indicator at the bottom */}
          <rect x="135" y="765" width="130" height="5" rx="2.5" fill="#ffffff" fillOpacity="0.9" />

          {/* Network and battery status bar */}
          {/* Battery icon */}
          <rect x="330" y="50" width="22" height="11" rx="3" fill="none" stroke="#ffffff" strokeWidth="1" />
          <rect x="332" y="52" width="14" height="7" rx="1.5" fill="#00ff66" />
          <rect x="353" y="53" width="1.5" height="5" rx="0.5" fill="#ffffff" />
          {/* Wifi icon */}
          <path d="M 310 58 A 4 4 0 0 1 318 58" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
          <path d="M 307 55 A 8 8 0 0 1 321 55" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
          {/* Signal bars */}
          <rect x="290" y="57" width="2.5" height="4" rx="0.5" fill="#ffffff" />
          <rect x="294" y="55" width="2.5" height="6" rx="0.5" fill="#ffffff" />
          <rect x="298" y="52" width="2.5" height="9" rx="0.5" fill="#ffffff" />
          <rect x="302" y="49" width="2.5" height="12" rx="0.5" fill="#ffffff" />

          {/* Tech Spec Callout overlays on the screen (faintly visible) */}
          <rect x="45" y="320" width="310" height="280" rx="24" fill="#000000" fillOpacity="0.4" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" backdrop-filter="blur(20px)" />
          {/* Brand/Status in the card */}
          <text x="200" y="370" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="bold" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">Assistência Apple 24h</text>
          <text x="200" y="392" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10" fontWeight="bold" fill="#00d4ff" textAnchor="middle" letterSpacing="2" fillOpacity="0.9">STATUS: DIAGNÓSTICO OK</text>
          
          {/* Circular progress diagnostic graphic */}
          <circle cx="200" cy="475" r="45" fill="none" stroke="#222" strokeWidth="6" />
          <circle cx="200" cy="475" r="45" fill="none" stroke="url(#screen-diagnose-glow)" strokeWidth="6" strokeDasharray="282" strokeDashoffset="56" strokeLinecap="round" />
          <text x="200" y="481" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="black" fill="#ffffff" textAnchor="middle">90%</text>

          <text x="200" y="555" fontFamily="system-ui, -apple-system, sans-serif" fontSize="9" fontWeight="semibold" fill="#ffffff" fillOpacity="0.6" textAnchor="middle">GARANTIA E SEGURANÇA Apple</text>

          <defs>
            <linearGradient id="screen-wallpaper-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0c1020" />
              <stop offset="35%" stopColor="#070709" />
              <stop offset="70%" stopColor="#1e1136" />
              <stop offset="100%" stopColor="#0f1f3a" />
            </linearGradient>
            <linearGradient id="screen-glass-glare-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="screen-glass-glare-2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="screen-diagnose-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0071e3" />
              <stop offset="100%" stopColor="#00d4ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

    </div>
  );
}
