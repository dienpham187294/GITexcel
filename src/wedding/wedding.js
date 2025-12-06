import { useState, useEffect, useRef } from "react";

export default function WeddingPages() {
  const [scrollY, setScrollY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [daysUntil, setDaysUntil] = useState(0);
  const observerRef = useRef(null);

  useEffect(() => {
    // Scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for fade-in animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-in-up");
    elements.forEach((el) => observerRef.current.observe(el));

    // Countdown timer
    const weddingDate = new Date("2025-12-28T11:00:00");
    const updateCountdown = () => {
      const now = new Date();
      const difference = weddingDate - now;
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      setDaysUntil(days);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 60 * 60);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearInterval(interval);
    };
  }, []);

  const toggleVideo = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Great+Vibes&family=Cinzel:wght@400;600;900&display=swap');

        :root {
          --color-white: #ffffff;
          --color-cream: #fff8f3;
          --color-light-pink: #ffe4ec;
          --color-pink: #ff6b9d;
          --color-rose: #ff8fab;
          --color-red: #ff385c;
          --color-coral: #ff6b7a;
          --color-gold: #ffd700;
          --color-warm-gold: #ffb347;
          --color-text-dark: #2d3436;
          --color-text-gray: #636e72;
          --color-text-light: #95a5a6;
          --color-border: #fce4ec;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Cormorant Garamond', serif;
          background-color: var(--color-cream);
          color: var(--color-text-dark);
          overflow-x: hidden;
          line-height: 1.8;
        }

        .wedding-container {
          position: relative;
          width: 100%;
          min-height: 100vh;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          height: 100vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(135deg, #fff8f3 0%, #ffe4ec 50%, #ffd4e5 100%);
        }

        .hero-bg-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.08;
          background-image: 
            repeating-linear-gradient(45deg, transparent, transparent 35px, var(--color-pink) 35px, var(--color-pink) 36px),
            repeating-linear-gradient(-45deg, transparent, transparent 35px, var(--color-coral) 35px, var(--color-coral) 36px);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 1.5rem;
          max-width: 100%;
        }

        .hero-ornament {
          width: 60px;
          height: 60px;
          margin: 0 auto 1.5rem;
          opacity: 0;
          animation: fadeIn 1.5s ease-in 0.5s forwards, float 3s ease-in-out infinite;
        }

        @media (min-width: 768px) {
          .hero-ornament {
            width: 80px;
            height: 80px;
            margin-bottom: 2rem;
          }
        }

        .hero-ornament svg {
          width: 100%;
          height: 100%;
        }

        .save-the-date {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.9rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--color-warm-gold);
          margin-bottom: 0.8rem;
          opacity: 0;
          animation: fadeInUp 1s ease-out 0.8s forwards;
          font-weight: 400;
        }

        @media (min-width: 768px) {
          .save-the-date {
            font-size: 1.1rem;
            letter-spacing: 4px;
            margin-bottom: 1rem;
          }
        }

        .hero-title {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(2.5rem, 12vw, 6rem);
          color: var(--color-red);
          margin-bottom: 1rem;
          opacity: 0;
          animation: fadeInUp 1s ease-out 1s forwards;
          text-shadow: 0 2px 20px rgba(255, 56, 92, 0.2);
          line-height: 1.2;
        }

        .hero-ampersand {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.5rem, 6vw, 3.5rem);
          color: var(--color-text-dark);
          margin: 0 0.5rem;
          display: inline-block;
          opacity: 0;
          animation: fadeIn 1s ease-out 1.2s forwards, heartbeat 2s ease-in-out 2s infinite;
        }

        @media (min-width: 768px) {
          .hero-ampersand {
            margin: 0 1rem;
          }
        }

        .hero-subtitle {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1rem, 3vw, 1.5rem);
          color: var(--color-text-gray);
          margin-top: 1.5rem;
          letter-spacing: 2px;
          opacity: 0;
          animation: fadeInUp 1s ease-out 1.4s forwards;
          font-style: italic;
        }

        @media (min-width: 768px) {
          .hero-subtitle {
            margin-top: 2rem;
          }
        }

        .hero-date {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.1rem, 4vw, 2rem);
          color: var(--color-pink);
          margin-top: 2rem;
          font-weight: 600;
          opacity: 0;
          animation: fadeInUp 1s ease-out 1.6s forwards;
          letter-spacing: 1px;
        }

        @media (min-width: 768px) {
          .hero-date {
            margin-top: 3rem;
          }
        }

        .scroll-indicator {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          animation: fadeIn 1s ease-out 2s forwards, bounce 2s ease-in-out infinite;
          cursor: pointer;
        }

        .scroll-indicator i {
          font-size: 2rem;
          color: var(--color-pink);
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          25%, 75% {
            transform: scale(1.05);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }

        /* Fade in on scroll */
        .fade-in-up {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Section Styles */
        .wedding-section {
          padding: 4rem 0;
          position: relative;
        }

        @media (min-width: 768px) {
          .wedding-section {
            padding: 6rem 0;
          }
        }

        @media (min-width: 1024px) {
          .wedding-section {
            padding: 8rem 0;
          }
        }

        .section-divider {
          text-align: center;
          margin: 3rem 0;
        }

        @media (min-width: 768px) {
          .section-divider {
            margin: 4rem 0;
          }
        }

        .divider-ornament {
          display: inline-block;
          width: 60px;
          height: 2px;
          background: linear-gradient(to right, transparent, var(--color-pink), var(--color-coral), var(--color-pink), transparent);
          position: relative;
        }

        .divider-ornament::before,
        .divider-ornament::after {
          content: '❖';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-warm-gold);
          font-size: 0.8rem;
        }

        .divider-ornament::before {
          left: -30px;
        }

        .divider-ornament::after {
          right: -30px;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 6vw, 4rem);
          text-align: center;
          margin-bottom: 2rem;
          color: var(--color-red);
          font-weight: 700;
        }

        @media (min-width: 768px) {
          .section-title {
            margin-bottom: 3rem;
          }
        }

        .section-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.1rem, 3vw, 1.8rem);
          text-align: center;
          color: var(--color-text-gray);
          margin-bottom: 3rem;
          font-style: italic;
        }

        @media (min-width: 768px) {
          .section-subtitle {
            margin-bottom: 4rem;
          }
        }

        /* Story Section */
        .story-section {
          background: linear-gradient(to bottom, var(--color-white), var(--color-light-pink), var(--color-white));
        }

        .story-card {
          background: var(--color-white);
          border: 2px solid var(--color-border);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 15px rgba(255, 107, 157, 0.1);
          transition: all 0.4s ease;
        }

        @media (min-width: 768px) {
          .story-card {
            padding: 3rem;
            margin-bottom: 2rem;
          }
        }

        .story-card:hover {
          background: var(--color-light-pink);
          border-color: var(--color-pink);
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(255, 107, 157, 0.2);
        }

        .story-icon {
          font-size: 2.5rem;
          color: var(--color-pink);
          margin-bottom: 1.2rem;
        }

        @media (min-width: 768px) {
          .story-icon {
            font-size: 3rem;
            margin-bottom: 1.5rem;
          }
        }

        .story-title {
          font-family: 'Cinzel', serif;
          font-size: 1.5rem;
          color: var(--color-text-dark);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        @media (min-width: 768px) {
          .story-title {
            font-size: 1.8rem;
          }
        }

        .story-text {
          font-size: 1rem;
          color: var(--color-text-gray);
          line-height: 1.8;
        }

        @media (min-width: 768px) {
          .story-text {
            font-size: 1.1rem;
          }
        }

        /* Details Section */
        .details-section {
          background: var(--color-cream);
        }

        .details-card {
          background: var(--color-white);
          border: 2px solid var(--color-border);
          border-radius: 15px;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: all 0.4s ease;
          height: 100%;
          box-shadow: 0 4px 15px rgba(255, 107, 157, 0.1);
        }

        @media (min-width: 768px) {
          .details-card {
            padding: 3rem 2rem;
          }
        }

        .details-card:hover {
          border-color: var(--color-pink);
          transform: scale(1.05);
          box-shadow: 0 15px 35px rgba(255, 107, 157, 0.25);
          background: var(--color-light-pink);
        }

        .details-icon {
          font-size: 2.5rem;
          margin-bottom: 1.2rem;
          background: linear-gradient(135deg, var(--color-pink), var(--color-red));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (min-width: 768px) {
          .details-icon {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
          }
        }

        .details-label {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--color-warm-gold);
          margin-bottom: 0.8rem;
          font-weight: 600;
        }

        @media (min-width: 768px) {
          .details-label {
            font-size: 0.9rem;
            margin-bottom: 1rem;
          }
        }

        .details-value {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          color: var(--color-text-dark);
          line-height: 1.6;
          font-weight: 400;
        }

        @media (min-width: 768px) {
          .details-value {
            font-size: 1.3rem;
          }
        }

        .details-value.large {
          font-size: 1.6rem;
          color: var(--color-red);
          font-weight: 700;
        }

        @media (min-width: 768px) {
          .details-value.large {
            font-size: 2rem;
          }
        }

        /* Venue Section */
        .venue-section {
          background: linear-gradient(to bottom, var(--color-cream), var(--color-white));
        }

        .venue-info {
          background: var(--color-white);
          border-radius: 20px;
          padding: 2rem;
          border: 2px solid var(--color-border);
          margin-bottom: 2rem;
          box-shadow: 0 4px 20px rgba(255, 107, 157, 0.1);
        }

        @media (min-width: 768px) {
          .venue-info {
            padding: 3rem;
            margin-bottom: 3rem;
          }
        }

        .venue-name {
          font-family: 'Cinzel', serif;
          font-size: 1.4rem;
          color: var(--color-red);
          margin-bottom: 1.2rem;
          font-weight: 600;
        }

        @media (min-width: 768px) {
          .venue-name {
            font-size: 2rem;
            margin-bottom: 1.5rem;
          }
        }

        .venue-address {
          font-size: 1.05rem;
          color: var(--color-text-gray);
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        @media (min-width: 768px) {
          .venue-address {
            font-size: 1.2rem;
            margin-bottom: 2rem;
          }
        }

        .map-container {
          border-radius: 15px;
          overflow: hidden;
          border: 3px solid var(--color-pink);
          box-shadow: 0 10px 30px rgba(255, 107, 157, 0.2);
        }

        .map-container iframe {
          width: 100%;
          height: 350px;
          border: none;
        }

        @media (min-width: 768px) {
          .map-container iframe {
            height: 450px;
          }
        }

        /* Gallery Section */
        .gallery-section {
          background: var(--color-black);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .gallery-item {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          aspect-ratio: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 107, 157, 0.2);
          transition: all 0.4s ease;
          cursor: pointer;
        }

        .gallery-item:hover {
          transform: scale(1.05);
          border-color: var(--color-pink);
          box-shadow: 0 15px 40px rgba(255, 107, 157, 0.4);
        }

        .gallery-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background: linear-gradient(135deg, rgba(220, 20, 60, 0.1), rgba(255, 107, 157, 0.1));
        }

        .gallery-placeholder i {
          font-size: 4rem;
          color: var(--color-pink);
          margin-bottom: 1rem;
        }

        .gallery-placeholder-text {
          color: var(--color-gray);
          font-size: 1.1rem;
        }

        .video-container {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: var(--color-charcoal);
          aspect-ratio: 16/9;
          border: 3px solid rgba(255, 107, 157, 0.3);
          margin-top: 3rem;
        }

        .video-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background: linear-gradient(135deg, rgba(10, 10, 10, 0.9), rgba(45, 45, 45, 0.9));
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .video-placeholder:hover {
          background: linear-gradient(135deg, rgba(220, 20, 60, 0.2), rgba(255, 107, 157, 0.2));
        }

        .video-placeholder i {
          font-size: 5rem;
          color: var(--color-pink);
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .video-placeholder:hover i {
          transform: scale(1.2);
          color: var(--color-red);
        }

        .video-placeholder-text {
          font-family: 'Cinzel', serif;
          font-size: 1.3rem;
          color: var(--color-white);
          letter-spacing: 2px;
        }

        /* Dress Code Section */
        .dresscode-section {
          background: linear-gradient(135deg, var(--color-charcoal) 0%, var(--color-black) 100%);
          padding: 8rem 0;
        }

        .dresscode-card {
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(212, 175, 55, 0.4);
          border-radius: 20px;
          padding: 4rem 3rem;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .dresscode-icon {
          font-size: 4rem;
          margin-bottom: 2rem;
        }

        .dresscode-title {
          font-family: 'Cinzel', serif;
          font-size: 1.2rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 2rem;
          font-weight: 600;
        }

        .dresscode-colors {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          margin: 3rem 0;
          flex-wrap: wrap;
        }

        .color-swatch {
          text-align: center;
        }

        .color-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin: 0 auto 1rem;
          border: 3px solid var(--color-gold);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          transition: all 0.3s ease;
        }

        .color-circle:hover {
          transform: scale(1.1);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7);
        }

        .color-circle.black {
          background: #000000;
        }

        .color-circle.pink {
          background: #ff6b9d;
        }

        .color-circle.red {
          background: #dc143c;
        }

        .color-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          color: var(--color-white);
          font-weight: 600;
        }

        .dresscode-note {
          font-size: 1.2rem;
          color: var(--color-gray);
          margin-top: 2rem;
          font-style: italic;
          line-height: 1.8;
        }

        /* RSVP Section */
        .rsvp-section {
          background: var(--color-black);
          padding: 8rem 0;
        }

        .rsvp-card {
          background: linear-gradient(135deg, rgba(220, 20, 60, 0.1), rgba(255, 107, 157, 0.1));
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 20px;
          padding: 4rem 3rem;
          text-align: center;
        }

        .countdown-container {
          margin: 3rem 0;
        }

        .countdown-number {
          font-family: 'Cinzel', serif;
          font-size: 5rem;
          color: var(--color-pink);
          font-weight: 900;
          text-shadow: 0 0 30px rgba(255, 107, 157, 0.5);
        }

        .countdown-label {
          font-size: 1.3rem;
          color: var(--color-gray);
          margin-top: 1rem;
          letter-spacing: 2px;
        }

        .rsvp-text {
          font-size: 1.3rem;
          color: var(--color-white);
          margin: 2rem 0;
          line-height: 1.8;
        }

        .btn-rsvp {
          font-family: 'Cinzel', serif;
          background: linear-gradient(135deg, var(--color-red), var(--color-pink));
          color: var(--color-white);
          border: none;
          padding: 1.2rem 3rem;
          font-size: 1.1rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          box-shadow: 0 10px 30px rgba(220, 20, 60, 0.4);
        }

        .btn-rsvp:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(220, 20, 60, 0.6);
          background: linear-gradient(135deg, var(--color-pink), var(--color-red));
        }

        /* Footer */
        .footer {
          background: var(--color-charcoal);
          padding: 3rem 0;
          text-align: center;
        }

        .footer-heart {
          font-size: 2rem;
          color: var(--color-red);
          margin-bottom: 1rem;
          animation: heartbeat 2s ease-in-out infinite;
        }

        .footer-text {
          font-family: 'Great Vibes', cursive;
          font-size: 2rem;
          color: var(--color-pink);
          margin-bottom: 1rem;
        }

        .footer-subtitle {
          color: var(--color-gray);
          font-size: 1rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .wedding-section {
            padding: 4rem 0;
          }

          .story-card,
          .details-card,
          .venue-info {
            padding: 2rem;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .dresscode-colors {
            gap: 1rem;
          }

          .color-circle {
            width: 80px;
            height: 80px;
          }

          .countdown-number {
            font-size: 3.5rem;
          }
        }

        /* Parallax effect */
        .parallax-bg {
          transform: translateY(${scrollY * 0.5}px);
          transition: transform 0.1s ease-out;
        }
      `}</style>

      <div className="wedding-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-bg-pattern parallax-bg"></div>
          <div className="hero-content">
            <div className="hero-ornament">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z"
                  fill="var(--color-gold)"
                  opacity="0.8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="15"
                  fill="var(--color-pink)"
                  opacity="0.6"
                />
              </svg>
            </div>

            <div className="save-the-date">Trân Trọng Kính Mời</div>

            <h1 className="hero-title">
              Điện
              <span className="hero-ampersand">&</span>
              Mỹ Oanh
            </h1>

            <p className="hero-subtitle">Tiệc Báo Hỷ</p>

            <div className="hero-date">28 • 12 • 2025</div>
          </div>

          <div
            className="scroll-indicator"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <i className="fas fa-chevron-down"></i>
          </div>
        </section>

        {/* Story Section */}
        <section className="wedding-section story-section">
          <div className="container">
            <h2 className="section-title fade-in-up">Câu Chuyện Tình Yêu</h2>
            <p className="section-subtitle fade-in-up">
              Hành trình của chúng mình
            </p>

            <div className="row">
              <div className="col-md-6 mb-4 fade-in-up">
                <div className="story-card">
                  <div className="story-icon">💑</div>
                  <h3 className="story-title">Gặp Gỡ Định Mệnh</h3>
                  <p className="story-text">
                    Câu chuyện tình yêu của chúng mình bắt đầu như một phép màu.
                    Từ những buổi gặp gỡ đầu tiên đến những khoảnh khắc ngọt
                    ngào, mọi thứ đều như được an bài sẵn bởi số phận.
                  </p>
                </div>
              </div>

              <div className="col-md-6 mb-4 fade-in-up">
                <div className="story-card">
                  <div className="story-icon">💝</div>
                  <h3 className="story-title">Lời Hứa Trọn Đời</h3>
                  <p className="story-text">
                    Sau những ngày tháng yêu thương và thấu hiểu, chúng mình đã
                    quyết định bước vào hôn nhân - nơi mà tình yêu được vun đắp
                    mỗi ngày, và hạnh phúc được chia sẻ trọn vẹn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider">
          <span className="divider-ornament"></span>
        </div>

        {/* Wedding Details */}
        <section className="wedding-section details-section">
          <div className="container">
            <h2 className="section-title fade-in-up">Thông Tin Tiệc Cưới</h2>

            <div className="row g-4 mt-4">
              <div className="col-md-6 col-lg-3 fade-in-up">
                <div className="details-card">
                  <div className="details-icon">👰‍♂️</div>
                  <div className="details-label">Chú Rể</div>
                  <div className="details-value">Phạm Văn Điện</div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 fade-in-up">
                <div className="details-card">
                  <div className="details-icon">👰‍♀️</div>
                  <div className="details-label">Cô Dâu</div>
                  <div className="details-value">Trần Thị Mỹ Oanh</div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 fade-in-up">
                <div className="details-card">
                  <div className="details-icon">📅</div>
                  <div className="details-label">Ngày</div>
                  <div className="details-value large">28.12.2025</div>
                  <div
                    className="details-value"
                    style={{
                      fontSize: "1rem",
                      marginTop: "0.5rem",
                      color: "var(--color-gray)",
                    }}
                  >
                    Chủ Nhật
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 fade-in-up">
                <div className="details-card">
                  <div className="details-icon">⏰</div>
                  <div className="details-label">Giờ</div>
                  <div className="details-value large">11:00</div>
                  <div
                    className="details-value"
                    style={{
                      fontSize: "1rem",
                      marginTop: "0.5rem",
                      color: "var(--color-gray)",
                    }}
                  >
                    Trưa
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Venue & Map Section */}
        <section className="wedding-section venue-section">
          <div className="container">
            <h2 className="section-title fade-in-up">Địa Điểm Tổ Chức</h2>

            <div className="row justify-content-center">
              <div className="col-lg-10 fade-in-up">
                <div className="venue-info">
                  <div className="venue-name">
                    <i
                      className="fas fa-map-marker-alt"
                      style={{ color: "var(--color-red)", marginRight: "1rem" }}
                    ></i>
                    Trung Tâm Hội Nghị & Tiệc Cưới THE ADORA LUXURY
                  </div>
                  <div className="venue-address">
                    <i
                      className="fas fa-location-dot"
                      style={{
                        color: "var(--color-gold)",
                        marginRight: "0.5rem",
                      }}
                    ></i>
                    198 Đ. Hoàng Văn Thụ, Phường 9, Đức Nhuận, Thành phố Hồ Chí
                    Minh, Việt Nam
                  </div>

                  <div className="map-container">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1262711867987!2d106.66893731533404!3d10.802173661667794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529b0f3e3e3e3%3A0x3e3e3e3e3e3e3e3e!2s198%20Ho%C3%A0ng%20V%C4%83n%20Th%E1%BB%A5%2C%20Ph%C6%B0%E1%BB%9Dng%209%2C%20Qu%E1%BA%ADn%20Ph%C3%BA%20Nhu%E1%BA%ADn%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Wedding Venue Map"
                    ></iframe>
                  </div>

                  <div className="text-center mt-4">
                    <a
                      href="https://maps.app.goo.gl/d5wwNPewW8ktwJFK7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-rsvp"
                    >
                      <i
                        className="fas fa-directions"
                        style={{ marginRight: "0.5rem" }}
                      ></i>
                      Chỉ Đường
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider">
          <span className="divider-ornament"></span>
        </div>

        {/* Gallery Section */}
        <section className="wedding-section gallery-section">
          <div className="container">
            <h2 className="section-title fade-in-up">
              Khoảnh Khắc Của Chúng Mình
            </h2>
            <p className="section-subtitle fade-in-up">
              Những hình ảnh đáng nhớ
            </p>

            <div className="gallery-grid">
              <div className="gallery-item fade-in-up">
                <div className="gallery-placeholder">
                  <i className="fas fa-image"></i>
                  <div className="gallery-placeholder-text">Thêm ảnh 1</div>
                </div>
              </div>

              <div className="gallery-item fade-in-up">
                <div className="gallery-placeholder">
                  <i className="fas fa-image"></i>
                  <div className="gallery-placeholder-text">Thêm ảnh 2</div>
                </div>
              </div>

              <div className="gallery-item fade-in-up">
                <div className="gallery-placeholder">
                  <i className="fas fa-image"></i>
                  <div className="gallery-placeholder-text">Thêm ảnh 3</div>
                </div>
              </div>

              <div className="gallery-item fade-in-up">
                <div className="gallery-placeholder">
                  <i className="fas fa-image"></i>
                  <div className="gallery-placeholder-text">Thêm ảnh 4</div>
                </div>
              </div>

              <div className="gallery-item fade-in-up">
                <div className="gallery-placeholder">
                  <i className="fas fa-image"></i>
                  <div className="gallery-placeholder-text">Thêm ảnh 5</div>
                </div>
              </div>

              <div className="gallery-item fade-in-up">
                <div className="gallery-placeholder">
                  <i className="fas fa-image"></i>
                  <div className="gallery-placeholder-text">Thêm ảnh 6</div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center mt-5">
              <div className="col-lg-10 fade-in-up">
                <div className="video-container">
                  <div className="video-placeholder" onClick={toggleVideo}>
                    <i
                      className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}
                    ></i>
                    <div className="video-placeholder-text">
                      {isPlaying ? "Video đang phát" : "Thêm video cưới"}
                    </div>
                  </div>
                  {/* Replace with actual video element when ready */}
                  {/* <video src="your-video-url.mp4" controls /> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dress Code Section */}
        <section className="wedding-section dresscode-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 fade-in-up">
                <div className="dresscode-card">
                  <div className="dresscode-icon">👔</div>
                  <div className="dresscode-title">Dress Code</div>

                  <div className="dresscode-colors">
                    <div className="color-swatch">
                      <div className="color-circle black"></div>
                      <div className="color-name">Đen</div>
                    </div>

                    <div className="color-swatch">
                      <div className="color-circle pink"></div>
                      <div className="color-name">Hồng</div>
                    </div>

                    <div className="color-swatch">
                      <div className="color-circle red"></div>
                      <div className="color-name">Đỏ</div>
                    </div>
                  </div>

                  <div className="dresscode-note">
                    Chúng mình rất vinh dự được đón tiếp quý khách trong trang
                    phục
                    <br />
                    tông màu{" "}
                    <strong style={{ color: "var(--color-white)" }}>
                      Đen - Hồng - Đỏ
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider">
          <span className="divider-ornament"></span>
        </div>

        {/* RSVP Section */}
        <section className="wedding-section rsvp-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 fade-in-up">
                <div className="rsvp-card">
                  <h2
                    className="section-title"
                    style={{ marginBottom: "2rem" }}
                  >
                    Đếm Ngược
                  </h2>

                  <div className="countdown-container">
                    <div className="countdown-number">
                      {daysUntil > 0 ? daysUntil : "🎉"}
                    </div>
                    <div className="countdown-label">
                      {daysUntil > 0
                        ? "Ngày Nữa Đến Ngày Vui"
                        : "Hôm Nay Là Ngày Vui!"}
                    </div>
                  </div>

                  <p className="rsvp-text">
                    Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình
                    chúng tôi.
                    <br />
                    Rất mong được đón tiếp!
                  </p>

                  <button
                    className="btn-rsvp"
                    onClick={() => alert("Cảm ơn bạn đã xác nhận tham dự! 💕")}
                  >
                    <i
                      className="fas fa-heart"
                      style={{ marginRight: "0.5rem" }}
                    ></i>
                    Xác Nhận Tham Dự
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-heart">❤️</div>
            <div className="footer-text">Điện & Mỹ Oanh</div>
            <div className="footer-subtitle">28.12.2025 • Hẹn Gặp Lại!</div>
          </div>
        </footer>
      </div>
    </>
  );
}
