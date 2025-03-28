import React, { useEffect, useState, useRef } from "react"; // Import React, useRef

// --- CSS Styles String (hcb-) --- (Keep the CSS string exactly the same as before)
const componentStyles = `
  /* ... (All the CSS styles from the previous correct version) ... */
  /* Make sure all the hcb- styles, keyframes, etc. are here */

  .hcb-container {
    /* Animated Cosmic Background */
    background: linear-gradient(280deg, #0a081f, #1c1a4e, #18182e, #0a081f);
    background-size: 400% 400%;
    animation: hcb-bg-pan 30s ease infinite;

    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    font-family: 'Orbitron', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    perspective: 1200px; /* Deeper perspective */
    position: relative; /* For stars pseudo-element */
  }

  /* --- Subtle Starfield --- */
  .hcb-container::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 100%; height: 100%;
    background-image:
      radial-gradient(1px 1px at 20% 30%, #ffffffdd, transparent),
      radial-gradient(1px 1px at 40% 20%, #ffffffcc, transparent),
      radial-gradient(1px 1px at 70% 60%, #ffffffbb, transparent),
      radial-gradient(1.5px 1.5px at 90% 40%, #ffffffee, transparent),
      radial-gradient(1px 1px at 10% 80%, #ffffffaa, transparent),
      radial-gradient(1px 1px at 55% 75%, #ffffffcc, transparent),
      radial-gradient(1.5px 1.5px at 30% 90%, #ffffffee, transparent);
    background-repeat: repeat;
    background-size: 300px 300px; /* Adjust density */
    animation: hcb-stars-twinkle 15s linear infinite alternate;
    opacity: 0.7;
    pointer-events: none; /* Stars shouldn't block interaction */
  }
    /* Shooting Star */
  .hcb-container::after {
      content: '';
      position: absolute;
      top: 50%;
      left: -50%; /* Start off screen */
      width: 1px; /* Tail width */
      height: 1px;
      background: linear-gradient(90deg, white, transparent);
      border-radius: 50%;
      box-shadow: 0 0 5px 1px white;
      animation: hcb-shooting-star 10s linear infinite 2s; /* Delay start */
      opacity: 0; /* Start hidden */
      pointer-events: none;
  }


  .hcb-card {
    background: rgba(15, 15, 35, 0.75); /* Slightly darker, richer base */
    backdrop-filter: blur(16px) saturate(150%);
    padding: 35px 40px;
    border-radius: 18px;
    /* More intense, pulsating outer glow + inner definition */
    box-shadow: 0 0 15px rgba(140, 100, 255, 0.6), /* Base Glow */
                0 0 35px rgba(100, 150, 255, 0.4), /* Wider Glow */
                inset 0 0 8px rgba(220, 220, 255, 0.25);
    width: 90%;
    max-width: 500px; /* Even wider */
    color: #e8e8ff;
    text-align: center;
    border: 1px solid rgba(200, 200, 255, 0.25);

    /* --- Materialize Animation --- */
    opacity: 0;
    transform: rotateY(-25deg) rotateX(5deg) scale(0.75) translateZ(-80px); /* More 3D */
    transition: opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1), transform 1s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform-origin: center center; /* Animate from center */
    position: relative;
    /* overflow: visible; Let's clip it to avoid weird large overflows */
    overflow: hidden;
     animation: hcb-card-pulse 4s ease-in-out infinite alternate; /* Add pulse */
     animation-play-state: paused; /* Start paused */
  }

  .hcb-card-visible {
    opacity: 1;
    transform: rotateY(0deg) rotateX(0deg) scale(1) translateZ(0px);
    animation-play-state: running; /* Start pulse when visible */
  }

  /* --- Animated Border Glow (conic gradient) --- */
   .hcb-card::after {
    content: '';
    position: absolute;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: conic-gradient(
      transparent,
      transparent,
      rgba(170, 120, 255, 0.6), /* Brighter */
      rgba(120, 180, 255, 0.5),
      transparent 35%
    );
    animation: hcb-border-spin 4s linear infinite; /* Faster spin */
    z-index: 0; /* Behind content wrapper but above card background */
    opacity: 0;
    transition: opacity 1s ease-in 0.2s; /* Fade in slightly delayed */
   }

   .hcb-card-visible::after {
      opacity: 1;
   }

  /* --- Content & Energy Burst Placeholder --- */
  .hcb-content-wrapper {
    opacity: 0; /* Starts hidden */
    position: relative; /* Needed for z-index */
    z-index: 1; /* Above card background and ::after glow */
    /* Base style, animation applied via inline style */
  }

   /* Placeholder for burst pseudo-elements if needed */
   /* We'll target these dynamically when showBurst is true */
  .hcb-content-wrapper::before,
  .hcb-content-wrapper::after {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      width: 1px; height: 1px; /* Start small */
      border-radius: 50%;
      /* Initial box-shadow defines particle start points */
      box-shadow:
          0 0 0 0 rgba(220, 200, 255, 0.7);
      opacity: 0; /* Start transparent */
      z-index: 2; /* Above content briefly */
      pointer-events: none; /* Don't block interaction */
      /* Animation will be applied dynamically */
  }


  .hcb-image {
    width: 90%;
    max-width: 350px; /* Larger image allowed */
    height: auto;
    border-radius: 12px;
    margin: 0 auto 30px auto;
    display: block;
    box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.4),
                0 3px 8px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(220, 220, 255, 0.15);
  }

  .hcb-text {
    font-size: 1.5em; /* Even larger */
    font-weight: 700; /* Bolder Orbitron */
    margin-top: 0;
    line-height: 1.5;
    color: #f8f8ff;
    /* Intense text glow */
    text-shadow: 0 0 10px rgba(200, 200, 255, 0.8),
                 0 0 20px rgba(150, 150, 255, 0.6),
                 0 0 35px rgba(100, 100, 255, 0.4);
  }

  /* --- Loading State --- */
  .hcb-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }

  .hcb-spinner {
    width: 65px; height: 65px;
    border-radius: 50%; border: 4px solid transparent;
    border-top-color: #c0c0ff; border-right-color: #c0c0ff;
    border-bottom-color: #8080ff;
    animation: hcb-spin 1s linear infinite;
    margin-bottom: 25px; position: relative;
  }
  .hcb-spinner::before {
      content: ''; position: absolute;
      top: 6px; left: 6px; right: 6px; bottom: 6px;
      background: radial-gradient(ellipse at center, rgba(180,180,255,0.5) 0%, rgba(180,180,255,0) 70%);
      border-radius: 50%;
      animation: hcb-spinner-pulse 1.5s ease-in-out infinite alternate;
  }

  .hcb-loading-text {
    font-size: 1.2em;
    color: #bbc;
    text-shadow: 0 0 6px rgba(150, 150, 255, 0.4);
    animation: hcb-loading-fade 1.8s ease-in-out infinite alternate;
  }

  /* --- Keyframes --- */
  @keyframes hcb-bg-pan {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes hcb-stars-twinkle {
      0% { opacity: 0.6; transform: translateY(0px); }
      100% { opacity: 0.8; transform: translateY(-10px); } /* Gentle drift + twinkle */
  }
   @keyframes hcb-shooting-star {
        0% { transform: translate(0, 0) rotate(45deg); opacity: 0; width: 100px; } /* Start off screen, rotated */
        20% { opacity: 1; } /* Fade in */
        80% { opacity: 0; } /* Fade out */
        100% { transform: translate(150vw, -150vw) rotate(45deg); opacity: 0; width: 1px; } /* Move across screen */
   }


  @keyframes hcb-border-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

   @keyframes hcb-card-pulse {
       0% { box-shadow: 0 0 15px rgba(140, 100, 255, 0.55), 0 0 35px rgba(100, 150, 255, 0.35), inset 0 0 8px rgba(220, 220, 255, 0.2); }
       100% { box-shadow: 0 0 20px rgba(160, 120, 255, 0.7), 0 0 45px rgba(120, 170, 255, 0.5), inset 0 0 8px rgba(220, 220, 255, 0.3); }
   }

  /* Data Stream / Content Animation */
  @keyframes hcb-content-appear {
    from {
      opacity: 0;
      transform: translateY(25px) scale(0.95);
      filter: blur(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0px);
    }
  }

  /* Energy Burst Animation */
  @keyframes hcb-burst {
      0% {
          transform: translate(-50%, -50%) scale(0.5); /* Center origin */
          opacity: 1;
          /* Define multiple particles with different start offsets */
          box-shadow:
              0 0 0 0 rgba(220, 200, 255, 0.8), /* Center */
              5px 5px 0 0 rgba(180, 150, 255, 0.7),
              -5px -5px 0 0 rgba(150, 180, 255, 0.7),
              5px -5px 0 0 rgba(180, 150, 255, 0.7),
              -5px 5px 0 0 rgba(150, 180, 255, 0.7);
        }
      100% {
          transform: translate(-50%, -50%) scale(3.5); /* Expand outwards */
          opacity: 0;
          /* Particles move further out and fade */
          box-shadow:
              0 0 0 0 rgba(220, 200, 255, 0),
              30px 30px 0 0 rgba(180, 150, 255, 0),
              -30px -30px 0 0 rgba(150, 180, 255, 0),
              30px -30px 0 0 rgba(180, 150, 255, 0),
              -30px 30px 0 0 rgba(150, 180, 255, 0);
        }
  }


  @keyframes hcb-spin { /* Spinner rotation */
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes hcb-spinner-pulse { /* Spinner core pulse */
      0% { opacity: 0.4; transform: scale(0.9); }
      100% { opacity: 0.8; transform: scale(1.1); }
  }

   @keyframes hcb-loading-fade { /* Loading text pulse */
       0% { opacity: 0.6; }
       100% { opacity: 1; }
   }
`;


// --- Component ---
const DisplayScreen = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dataKey, setDataKey] = useState(Date.now());
  const [showBurst, setShowBurst] = useState(false); // State to trigger burst animation

  // Ref for the audio element
  const audioRef = useRef(null);
  // --- IMPORTANT: Set this to your actual sound file URL ---
  const alertSoundSrc = "/sounds/alert-sound.mp3"; // Example path - place your sound in the public folder

  // --- Effect for Style Injection and WebSocket ---
  useEffect(() => {
    // --- Style Injection ---
    const styleElement = document.createElement("style");
    styleElement.id = "hyper-cosmic-broadcast-styles";
    styleElement.textContent = componentStyles;
    if (!document.getElementById(styleElement.id)) {
       document.head.appendChild(styleElement);
    }

    // --- WebSocket connection logic ---
    const WS_URL = import.meta.env.VITE_WS_URL || "wss://organic-trout-4j6gx5gpxj5pfj59w-8080.app.github.dev";
    console.log("Connecting to WebSocket:", WS_URL);
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => console.log("WebSocket connection established");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received data:", data);
        const { imageUrl, text } = data;

        // Play sound effect
        if (audioRef.current && alertSoundSrc) {
            audioRef.current.currentTime = 0; // Rewind
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        }

        // Trigger burst animation
        setShowBurst(true);
        // Reset burst state after animation duration (match hcb-burst duration)
        setTimeout(() => setShowBurst(false), 600);

        setImage(imageUrl);
        setText(text || "Incoming Signal...");
        setIsLoading(false);
        setDataKey(Date.now());

      } catch (error) {
        console.error("Failed to parse WebSocket message:", event.data, error);
        setText("Signal Corruption Detected.");
        setImage(null);
        setIsLoading(false);
        setDataKey(Date.now());
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setText("Subspace Link Severed.");
      setImage(null);
      setIsLoading(false);
      setDataKey(Date.now());
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason);
      // Optional: Handle reconnection state
    };

    // --- Cleanup ---
    return () => {
      console.log("Closing WebSocket and removing styles");
      ws.close();
      const existingStyleElement = document.getElementById("hyper-cosmic-broadcast-styles");
      if (existingStyleElement) {
        document.head.removeChild(existingStyleElement);
      }
    };
  }, []); // Empty dependency array

  // --- Effect for Dynamic Burst Style Injection --- (MOVED INSIDE COMPONENT)
  useEffect(() => {
    let burstStyleElement = null;
    const styleId = 'hcb-burst-temp-style';

    // Remove any previous temporary style first
    const existingBurstStyle = document.getElementById(styleId);
    if (existingBurstStyle) {
        document.head.removeChild(existingBurstStyle);
    }

    // If showBurst is true, create and inject the new style
    if (showBurst) {
        burstStyleElement = document.createElement('style');
        burstStyleElement.id = styleId;
        // Target the pseudo-elements specifically when the burst should show
        burstStyleElement.textContent = `
            .hcb-content-wrapper::before,
            .hcb-content-wrapper::after {
                /* Apply the burst animation */
                animation: hcb-burst 0.6s ease-out forwards;
            }
        `;
        document.head.appendChild(burstStyleElement);
    }

    // Cleanup function for this specific effect
    return () => {
        // Ensure cleanup happens even if showBurst changes rapidly
        const finalBurstStyle = document.getElementById(styleId);
        if (finalBurstStyle) {
            try {
                document.head.removeChild(finalBurstStyle);
            } catch (e) {
                // Ignore error if element already removed somehow
                // console.warn("Could not remove burst style, already gone?", e);
            }
        }
    };
}, [showBurst]); // This effect depends ONLY on the showBurst state

  // --- Dynamic Styles & Classes ---
  const cardClass = `hcb-card ${!isLoading ? 'hcb-card-visible' : ''}`;

  const contentWrapperStyle = !isLoading ? {
    animation: `hcb-content-appear 0.8s 0.5s cubic-bezier(0.2, 1, 0.3, 1) forwards`
  } : {};

  // No need for burstStyle inline object anymore

  return (
    <div className="hcb-container">
      {/* Audio Element - hidden */}
      {alertSoundSrc && <audio ref={audioRef} src={alertSoundSrc} preload="auto" />}

      <div className={cardClass}>
        {isLoading ? (
          <div className="hcb-loading">
            <div className="hcb-spinner"></div>
            <p className="hcb-loading-text">Calibrating Receiver...</p>
          </div>
        ) : (
          <div
            key={dataKey}
            className="hcb-content-wrapper" // Burst animation targets ::before/::after of this
            style={contentWrapperStyle}
            aria-live="polite"
          >
            {/* Content goes directly inside */}
            {image && <img src={image} alt="Broadcast visual" className="hcb-image" />}
            {text && <p className="hcb-text">{text}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayScreen;