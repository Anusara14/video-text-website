import React, { useState, useEffect, useRef } from 'react';

// --- Custom Hooks ---

/**
 * useIntersectionObserver - Detects when an element enters the viewport
 * @param {Object} options - Intersection Observer options
 * @returns {Array} [ref, isIntersecting] - Ref to attach and intersection state
 */
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(element); // Unobserve once visible
      }
    }, { threshold: 0.1, ...options });

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options]);

  return [ref, isIntersecting];
};

// --- Animated Section Wrapper ---

/**
 * AnimatedSection - Wraps content with fade-in and slide-up animation
 * @param {React.ReactNode} children - Content to animate
 */
const AnimatedSection = ({ children, className = '' }) => {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isIntersecting
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-5'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Icon Components (inlined for single-file compatibility) ---

const Zap = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ClipboardCopy = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);

const ShieldCheck = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const MousePointerClick = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 9 5 12 1.8-5.2L21 14Z" />
    <path d="M5 2c.5.5.5 1.5 0 2s-1.5.5-2 0S2.5 2.5 3 2s1.5-.5 2 0Z" />
    <path d="m6.5 7.5.8 1 1 .8" />
    <path d="m11 11 1 1" />
  </svg>
);

const Download = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const Camera = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const Info = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const Play = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

// --- Reusable UI Components (styled with Tailwind) ---

/**
 * A reusable Button component
 * @param {object} props
 * @param {'primary' | 'secondary' | 'ghost'} props.variant - The button style variant
 * @param {'default' | 'sm' | 'lg'} props.size - The button size
 * @param {string} props.className - Additional classes
 * @param {React.ReactNode} props.children - Button content
 */
const Button = ({
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-neutral-900';

  const variants = {
    primary:
      'bg-red-600 text-white hover:bg-red-700/90 focus-visible:ring-red-500',
    secondary:
      'bg-neutral-800 text-neutral-100 hover:bg-neutral-700 focus-visible:ring-neutral-400',
    ghost: 'hover:bg-neutral-800 hover:text-neutral-100',
  };

  const sizes = {
    default: 'h-11 px-6 py-2 text-base',
    sm: 'h-9 rounded-md px-3 text-sm',
    lg: 'h-12 rounded-lg px-8 text-lg',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * A reusable Card component
 * @param {object} props
 * @param {string} props.className - Additional classes
 * @param {React.ReactNode} props.children - Card content
 */
const Card = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.03] hover:bg-neutral-900/80 hover:border-neutral-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// --- Page Sections ---

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">Video Text OCR</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            How It Works
          </a>
        </nav>
        <Button size="sm" className="hidden md:inline-flex">
          <Download className="mr-2 h-4 w-4" />
          <a href="https://github.com/Anusara14/video-text-extention" target="_blank" rel="noopener noreferrer">
            Download for Chrome
          </a>
        </Button>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-36">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-7xl">
              Stop Pausing.
              <br />
              <span className="text-red-500">Start Copying.</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-300 md:text-xl">
              Extract text from any video frame with a single click. Grab notes
              from lectures, code from tutorials, and numbers from reports
              instantly.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button size="lg" className="w-full sm:w-auto">
                <Download className="mr-2 h-5 w-5" />
                <a href="https://github.com/Anusara14/video-text-extention" target="_blank" rel="noopener noreferrer">
                  Add to Chrome - It's Free
                </a>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {/* Mockup of the extension UI */}
            <div className="w-full max-w-sm scale-110">
              <Card className="border-neutral-700 bg-neutral-900/80 shadow-2xl shadow-red-900/20">
                <div className="space-y-4 p-2">
                  <div className="text-center">
                    <h2 className="text-lg font-semibold text-white">
                      Video Text OCR
                    </h2>
                    <p className="text-sm text-neutral-400">
                      Extract text from any video frame
                    </p>
                  </div>
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 px-4 text-white transition-colors hover:bg-red-700">
                    <Camera className="h-5 w-5" />
                    <a href="https://github.com/Anusara14/video-text-extention" target="_blank" rel="noopener noreferrer" className="font-medium">
                      Capture Frame
                    </a>
                  </button>
                  <div className="flex items-center gap-3 rounded-lg border border-neutral-700 bg-neutral-800/50 py-3 px-4">
                    <Info className="h-5 w-5 flex-shrink-0 text-neutral-400" />
                    <span className="text-sm text-neutral-300">
                      Ready to capture
                    </span>
                  </div>
                  <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-neutral-700 bg-neutral-800/30">
                    <div className="text-center text-neutral-500">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-700/50">
                        <Play className="h-6 w-6 text-neutral-400" />
                      </div>
                      <p className="mt-3 font-medium">No text captured yet</p>
                      <p className="mt-1 text-xs">
                        Click "Capture Frame" to extract text
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-red-500" />,
      title: 'Instant Capture',
      description:
        'One-click capture to grab text from lectures, presentations, or tutorials in real-time.',
    },
    {
      icon: <ClipboardCopy className="h-8 w-8 text-red-500" />,
      title: 'Accurate OCR',
      description:
        'Powered by the latest OCR technology to ensure high accuracy, even on blurry video.',
    },
    {
      icon: <MousePointerClick className="h-8 w-8 text-red-500" />,
      title: 'Simple Interface',
      description:
        'A clean, intuitive interface that matches your browser and stays out of your way.',
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-red-500" />,
      title: 'Privacy First',
      description:
        'All text recognition happens locally in your browser. Your data is never uploaded or stored.',
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl whitespace-nowrap">
            Everything you need. Nothing you don't.
          </h2>
          <p className="mt-4 text-lg text-neutral-300">
            Video Text OCR is built to be powerful, yet simple. Here's what
            makes it great.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-neutral-400">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      name: 'Step 1',
      title: 'Install from Chrome Store',
      description:
        'Visit the Chrome Web Store, click "Add to Chrome", and pin the extension to your toolbar for easy access.',
    },
    {
      name: 'Step 2',
      title: 'Play a Video',
      description:
        'Go to any website with a video (YouTube, Vimeo, Twitter, etc.). When you see text you want, click the extension icon.',
    },
    {
      name: 'Step 3',
      title: 'Capture & Copy',
      description:
        'Click the "Capture Frame" button. Your text will instantly appear, ready to be copied to your clipboard.',
    },
  ];

  return (
    <section id="how-it-works" className="overflow-hidden py-20 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Get Started in Seconds
          </h2>
          <p className="mt-4 text-lg text-neutral-300">
            It's as easy as 1, 2, 3.
          </p>
        </div>
        <div className="relative mt-16">
          {/* Dotted line connector for desktop */}
          <div
            aria-hidden="true"
            className="absolute top-10 left-1/2 hidden w-2/3 -translate-x-1/2 lg:block"
          >
            <svg
              className="w-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 994 22"
            >
              <path
                stroke="url(#a)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M2 19.5C28.812 9.13 145.418-20.088 284.5 20c139.082 39.588 238.418 2.39 373-18.5s205.812-32.088 334.5-1.5"
              />
              <defs>
                <linearGradient
                  id="a"
                  x1="992"
                  x2="2"
                  y1="2"
                  y2="2"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9CA3AF" stopOpacity="0" />
                  <stop offset=".4" stopColor="#E53935" />
                  <stop offset=".6" stopColor="#E53935" />
                  <stop offset="1" stopColor="#9CA3AF" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative z-10 flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:scale-105"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-600 bg-neutral-900 shadow-lg shadow-red-500/20">
                  <span className="text-xl font-bold text-red-500">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-base text-neutral-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900 py-16 px-6 text-center shadow-xl shadow-neutral-950/50 md:py-24 md:px-12">
          {/* Glow */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-0 h-1/2 bg-gradient-to-b from-red-600/30 opacity-50"
          />
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Supercharge Your Workflow?
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              Stop re-typing and start capturing. Get Video Text OCR for free
              today.
            </p>
            <div className="mt-10">
              <Button size="lg" className="w-full sm:w-auto">
                <Download className="mr-2 h-5 w-5" />
                <a href="https://github.com/Anusara14/video-text-extention" target="_blank" rel="noopener noreferrer">
                  Download for Chrome
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 py-8 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="text-sm text-neutral-400">
            &copy; {new Date().getFullYear()} Video Text OCR. All rights reserved.
          </p>
          <p className="text-xs text-neutral-500 mt-1">
            Built by <a href="https://github.com/Anusara14" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">Anusara14</a>
          </p>
        </div>
        <div className="flex gap-6">
          <a
            href="https://github.com/Anusara14/video-text-extention"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

/**
 * Main Application Component
 * This is the entry point for the website.
 */
export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const rafRef = useRef(null);

  const handleMouseMove = (e) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      // Get mouse position as percentage of viewport with reduced sensitivity
      const x = 50 + ((e.clientX / window.innerWidth) - 0.5) * 20;
      const y = 50 + ((e.clientY / window.innerHeight) - 0.5) * 20;
      setMousePosition({ x, y });
    });
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="min-h-screen w-full font-sans text-white antialiased relative"
      onMouseMove={handleMouseMove}
      style={{
        background: '#0a0a0a',
      }}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }} />
      </div>

      {/* Atmospheric spotlight effect - soft ambient light following mouse */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(220, 38, 38, 0.1), transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">
        <Header />
        <main className="w-full">
          <Hero />
          
          <AnimatedSection>
            <Features />
          </AnimatedSection>
          
          <AnimatedSection>
            <HowItWorks />
          </AnimatedSection>
          
          <AnimatedSection>
            <CTA />
          </AnimatedSection>
        </main>
        <Footer />
      </div>
    </div>
  );
}
