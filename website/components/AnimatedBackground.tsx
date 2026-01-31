export function AnimatedBackground() {
  return (
    <>
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 -z-10" />

      {/* Floating animated shapes */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-yellow-300/10 rounded-full blur-3xl animate-pulse -z-5" />
      <div className="fixed bottom-20 right-10 w-40 h-40 bg-purple-300/10 rounded-full blur-3xl animate-bounce -z-5" />
      <div
        className="fixed top-1/2 left-1/4 w-24 h-24 bg-pink-200/10 rounded-full blur-2xl animate-pulse -z-5"
        style={{ animationDelay: '1s' }}
      />

      {/* Animation keyframes */}
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes genieMagic {
          0% { opacity: 0; transform: translateY(20px) scale(0.8); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-50px) scale(0); }
        }
        .animate-sparkle {
          animation: sparkle 2s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .twinkle {
          animation: twinkle 1.5s infinite;
        }
        .animate-genie-magic {
          animation: genieMagic 2s ease-out infinite;
        }
      `}</style>
    </>
  );
}

export function Sparkles() {
  return (
    <>
      <div className="absolute top-1/4 left-1/4 text-yellow-400 animate-sparkle text-4xl pointer-events-none">✨</div>
      <div
        className="absolute top-1/3 right-1/3 text-pink-400 animate-sparkle text-3xl pointer-events-none"
        style={{ animationDelay: '0.5s' }}
      >
        ✨
      </div>
      <div
        className="absolute bottom-1/3 left-1/3 text-purple-400 animate-sparkle text-2xl pointer-events-none"
        style={{ animationDelay: '1s' }}
      >
        ✨
      </div>
      <div
        className="absolute top-2/3 right-1/4 text-blue-300 animate-sparkle text-3xl pointer-events-none"
        style={{ animationDelay: '0.3s' }}
      >
        ✨
      </div>
    </>
  );
}

export function FloatingElements() {
  return (
    <div className="flex justify-center gap-4 text-5xl opacity-60 animate-bounce">
      <span className="animate-float" style={{ animationDelay: '0s' }}>
        🧞
      </span>
      <span className="animate-float" style={{ animationDelay: '0.2s' }}>
        ✨
      </span>
      <span className="animate-float" style={{ animationDelay: '0.4s' }}>
        🌟
      </span>
    </div>
  );
}

export function GlowingOrb({
  size = 'md',
  color = 'purple',
  delay = '0s',
  position = 'top',
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'purple' | 'pink' | 'blue' | 'yellow';
  delay?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40',
  };

  const colorClasses = {
    purple: 'bg-purple-300/20',
    pink: 'bg-pink-300/20',
    blue: 'bg-blue-300/20',
    yellow: 'bg-yellow-300/20',
  };

  const positionClasses = {
    top: 'top-20',
    bottom: 'bottom-20',
    left: 'left-10',
    right: 'right-10',
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} rounded-full blur-3xl animate-pulse -z-5 ${sizeClasses[size]} ${colorClasses[color]}`}
      style={{ animationDelay: delay }}
    />
  );
}
