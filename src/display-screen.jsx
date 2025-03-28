import React, { useEffect, useState, useRef, useCallback } from "react"; 

// --- CSS Styles String (hcb-) ---
// (Keep the exact same CSS string as the previous 'meteor shower' version)
const componentStyles = `
 /* ... All hcb- styles, keyframes, meteor layers etc. remain unchanged ... */

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
    overflow: hidden; /* Crucial to clip meteors */
    font-family: 'Orbitron', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    perspective: 1200px;
    position: relative; /* Needed for absolute children */
  }

  /* --- Meteor Shower Layers --- */
  .hcb-meteor-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden; /* Clip shadows within the layer */
      pointer-events: none; /* Don't interfere with interaction */
      z-index: 0; /* Behind the card but above background */
  }

  /* Common style for meteor pseudo-elements */
  .hcb-meteor-layer::before {
      content: '';
      position: absolute;
      width: 1px; /* Base element size - can be tiny */
      height: 1px;
      background: transparent; /* Make base element invisible */
      border-radius: 50%;
      /* The box-shadows ARE the meteors! */
      /* Add MANY more comma-separated values for density */
      box-shadow: /* Layer 1 Shadows (Faster, Smaller) */
          100px 50px 0 0px #ffffff66, 300px 200px 0 0px #ffffff55,
          500px 100px 0 0px #ffffff44, 700px 300px 0 0px #ffffff55,
          50px 400px 0 0px #ffffff66, 250px 500px 0 0px #ffffff44,
          450px 450px 0 0px #ffffff55, 650px 550px 0 0px #ffffff66,
          900px 150px 0 0px #ffffff44, 1100px 250px 0 0px #ffffff55,
          1300px 50px 0 0px #ffffff66, 1500px 350px 0 0px #ffffff44,
          /* ... more ... */
          1700px 500px 0 0px #ffffff55;

      /* Animation is applied per layer */
  }

  /* Layer Specific Shadows & Animations */
  .hcb-meteor-layer.layer-1::before {
       box-shadow: /* Layer 1 Shadows */
          100px 50px 0 0px #ffffff66, 300px 200px 0 0px #ffffff55, 500px 100px 0 0px #ffffff44, 700px 300px 0 0px #ffffff55, 50px 400px 0 0px #ffffff66, 250px 500px 0 0px #ffffff44, 450px 450px 0 0px #ffffff55, 650px 550px 0 0px #ffffff66, 900px 150px 0 0px #ffffff44, 1100px 250px 0 0px #ffffff55, 1300px 50px 0 0px #ffffff66, 1500px 350px 0 0px #ffffff44, 100px 650px 0 0px #ffffff55, 300px 750px 0 0px #ffffff66, 500px 700px 0 0px #ffffff44, /* ... more ... */ 1700px 600px 0 0px #ffffff55;
      animation: hcb-meteor-fall-1 8s linear infinite; /* Faster */
      top: -200px; left: -200px;
  }

  .hcb-meteor-layer.layer-2::before {
      width: 2px; height: 2px;
      box-shadow: /* Layer 2 Shadows */
          150px 80px 0 0px #ffffff99, 400px 250px 0 0px #ffffff88, 600px 150px 0 0px #ffffffaa, 800px 350px 0 0px #ffffff99, 100px 450px 0 0px #ffffff88, 350px 550px 0 0px #ffffffaa, 550px 500px 0 0px #ffffff99, 750px 600px 0 0px #ffffff88, 1000px 200px 0 0px #ffffffaa, 1200px 400px 0 0px #ffffff99, 1400px 100px 0 0px #ffffff88, 1600px 500px 0 0px #ffffffaa, /* ... more ... */ 1800px 300px 0 0px #ffffff99;
      animation: hcb-meteor-fall-2 12s linear infinite 1s; /* Slower, delayed */
       top: -300px; left: -300px;
  }

    .hcb-meteor-layer.layer-3::before {
      width: 1px; height: 1px;
       box-shadow: /* Layer 3 Shadows */
          200px 120px 0 0px #ffffff33, 450px 300px 0 0px #ffffff22, 650px 200px 0 0px #ffffff44, 850px 400px 0 0px #ffffff33, 150px 500px 0 0px #ffffff22, 400px 600px 0 0px #ffffff44, 600px 550px 0 0px #ffffff33, 800px 650px 0 0px #ffffff22, 1050px 250px 0 0px #ffffff44, 1250px 450px 0 0px #ffffff33, 1450px 150px 0 0px #ffffff22, 1650px 550px 0 0px #ffffff44, /* ... more ... */ 1850px 400px 0 0px #ffffff33;
      animation: hcb-meteor-fall-3 18s linear infinite 0.5s; /* Slowest, slightly delayed */
       top: -400px; left: -400px;
  }


  /* Card Styles */
  .hcb-card {
    /* ... same styles ... */
    position: relative;
    z-index: 10; /* Above meteors */
     /* ... rest of card styles ... */
    background: rgba(15, 15, 35, 0.75);
    backdrop-filter: blur(16px) saturate(150%);
    padding: 35px 40px;
    border-radius: 18px;
    box-shadow: 0 0 15px rgba(140, 100, 255, 0.6),
                0 0 35px rgba(100, 150, 255, 0.4),
                inset 0 0 8px rgba(220, 220, 255, 0.25);
    width: 90%;
    max-width: 500px;
    color: #e8e8ff;
    text-align: center;
    border: 1px solid rgba(200, 200, 255, 0.25);
    opacity: 0;
    transform: rotateY(-25deg) rotateX(5deg) scale(0.75) translateZ(-80px);
    transition: opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1), transform 1s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform-origin: center center;
    overflow: hidden;
    animation: hcb-card-pulse 4s ease-in-out infinite alternate;
    animation-play-state: paused;
  }
  .hcb-card-visible {
    opacity: 1;
    transform: rotateY(0deg) rotateX(0deg) scale(1) translateZ(0px);
    animation-play-state: running;
  }
  .hcb-card::after { /* Glow */
    content: ''; position: absolute; top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: conic-gradient( transparent, transparent, rgba(170, 120, 255, 0.6), rgba(120, 180, 255, 0.5), transparent 35% );
    animation: hcb-border-spin 4s linear infinite;
    z-index: -1; opacity: 0;
    transition: opacity 1s ease-in 0.2s;
   }
   .hcb-card-visible::after { opacity: 1; }

  /* Content Wrapper */
  .hcb-content-wrapper {
    opacity: 0; position: relative; z-index: 1;
  }
  .hcb-content-wrapper::before, .hcb-content-wrapper::after { /* Burst */
      content: ''; position: absolute; top: 50%; left: 50%;
      width: 1px; height: 1px; border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(220, 200, 255, 0.7);
      opacity: 0; z-index: 2; pointer-events: none;
  }

  /* Image, Text, Loading, Spinner */
  /* ... same styles ... */
  .hcb-image {
    width: 90%; max-width: 350px; height: auto; border-radius: 12px;
    margin: 0 auto 30px auto; display: block;
    box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.4), 0 3px 8px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(220, 220, 255, 0.15);
  }
  .hcb-text {
    font-size: 1.5em; font-weight: 700; margin-top: 0; line-height: 1.5;
    color: #f8f8ff;
    text-shadow: 0 0 10px rgba(200, 200, 255, 0.8), 0 0 20px rgba(150, 150, 255, 0.6), 0 0 35px rgba(100, 100, 255, 0.4);
  }
  .hcb-loading {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; min-height: 200px;
  }
  .hcb-spinner {
    width: 65px; height: 65px; border-radius: 50%; border: 4px solid transparent;
    border-top-color: #c0c0ff; border-right-color: #c0c0ff; border-bottom-color: #8080ff;
    animation: hcb-spin 1s linear infinite; margin-bottom: 25px; position: relative;
  }
  .hcb-spinner::before {
      content: ''; position: absolute; top: 6px; left: 6px; right: 6px; bottom: 6px;
      background: radial-gradient(ellipse at center, rgba(180,180,255,0.5) 0%, rgba(180,180,255,0) 70%);
      border-radius: 50%; animation: hcb-spinner-pulse 1.5s ease-in-out infinite alternate;
  }
  .hcb-loading-text {
    font-size: 1.2em; color: #bbc;
    text-shadow: 0 0 6px rgba(150, 150, 255, 0.4);
    animation: hcb-loading-fade 1.8s ease-in-out infinite alternate;
  }

  /* Keyframes */
  /* ... hcb-bg-pan, hcb-meteor-fall-1/2/3, hcb-border-spin, hcb-card-pulse */
  /* ... hcb-content-appear, hcb-burst, hcb-spin, hcb-spinner-pulse, hcb-loading-fade */
  /* ... All keyframes remain unchanged ... */
   @keyframes hcb-bg-pan { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
   @keyframes hcb-meteor-fall-1 { 0% { transform: translate(0, 0); } 100% { transform: translate(120vw, 120vh); } }
   @keyframes hcb-meteor-fall-2 { 0% { transform: translate(0, 0); } 100% { transform: translate(110vw, 110vh); } }
   @keyframes hcb-meteor-fall-3 { 0% { transform: translate(0, 0); } 100% { transform: translate(100vw, 100vh); } }
   @keyframes hcb-border-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
   @keyframes hcb-card-pulse { 0% { box-shadow: 0 0 15px rgba(140, 100, 255, 0.55), 0 0 35px rgba(100, 150, 255, 0.35), inset 0 0 8px rgba(220, 220, 255, 0.2); } 100% { box-shadow: 0 0 20px rgba(160, 120, 255, 0.7), 0 0 45px rgba(120, 170, 255, 0.5), inset 0 0 8px rgba(220, 220, 255, 0.3); } }
   @keyframes hcb-content-appear { from { opacity: 0; transform: translateY(25px) scale(0.95); filter: blur(5px); } to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); } }
   @keyframes hcb-burst { 0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; box-shadow: 0 0 0 0 rgba(220, 200, 255, 0.8), 5px 5px 0 0 rgba(180, 150, 255, 0.7), -5px -5px 0 0 rgba(150, 180, 255, 0.7), 5px -5px 0 0 rgba(180, 150, 255, 0.7), -5px 5px 0 0 rgba(150, 180, 255, 0.7); } 100% { transform: translate(-50%, -50%) scale(3.5); opacity: 0; box-shadow: 0 0 0 0 rgba(220, 200, 255, 0), 30px 30px 0 0 rgba(180, 150, 255, 0), -30px -30px 0 0 rgba(150, 180, 255, 0), 30px -30px 0 0 rgba(180, 150, 255, 0), -30px 30px 0 0 rgba(150, 180, 255, 0); } }
   @keyframes hcb-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
   @keyframes hcb-spinner-pulse { 0% { opacity: 0.4; transform: scale(0.9); } 100% { opacity: 0.8; transform: scale(1.1); } }
   @keyframes hcb-loading-fade { 0% { opacity: 0.6; } 100% { opacity: 1; } }
`;


// --- Constants ---
const WS_URL = "wss://organic-trout-4j6gx5gpxj5pfj59w-8080.app.github.dev";
const INITIAL_RECONNECT_DELAY = 1000; // 1 second
const MAX_RECONNECT_DELAY = 30000; // 30 seconds
const DISPLAY_DURATION = 10000; // 10 seconds

// --- Component ---
const DisplayScreen = () => {
  // State for currently displayed item
  const [currentImage, setCurrentImage] = useState(null);
  const [currentText, setCurrentText] = useState("");
  const [isShowingContent, setIsShowingContent] = useState(false); // Tracks if card content should be visible

  // State for queue management
  const [messageQueue, setMessageQueue] = useState([]);
  const [isDisplaying, setIsDisplaying] = useState(false); // Tracks if an item is *actively* being shown (during its 10s)

  // State for connection/loading status
  const [connectionStatus, setConnectionStatus] = useState("connecting"); // 'connecting', 'connected', 'reconnecting', 'disconnected'

  // Refs
  const wsRef = useRef(null); // Holds the WebSocket instance
  const displayTimerRef = useRef(null);
  const reconnectTimerRef = useRef(null); // Holds the setTimeout ID for reconnection attempts
  const currentRetryDelay = useRef(INITIAL_RECONNECT_DELAY); // Holds the current delay value
  const isUnmountingRef = useRef(false); // Flag to prevent reconnect on unmount

  // Refs for Animations/Sound
  const audioRef = useRef(null);
  const alertSoundSrc = "/sounds/alert-sound.mp3";
  const [dataKey, setDataKey] = useState(Date.now());
  const [showBurst, setShowBurst] = useState(false);


  // --- Function to establish WebSocket connection ---
  const connectWebSocket = useCallback(() => {
    // Prevent multiple connections
    if (wsRef.current && wsRef.current.readyState < 2) { // 0=CONNECTING, 1=OPEN
      console.log("WebSocket already connecting or open.");
      return;
    }
    // Clear any pending reconnection attempt
    clearTimeout(reconnectTimerRef.current);

    console.log(`Attempting to connect to ${WS_URL}...`);
    //setConnectionStatus("connecting");
    isUnmountingRef.current = false; // Reset unmount flag on new attempt

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws; // Store the instance

    ws.onopen = () => {
      console.log("WebSocket connection established.");
      setConnectionStatus("connected");
      // Reset reconnect delay on successful connection
      currentRetryDelay.current = INITIAL_RECONNECT_DELAY;
      // Clear any lingering reconnect timer just in case
      clearTimeout(reconnectTimerRef.current);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Add the valid message to the queue
        // Use functional update to ensure we're working with the latest queue state
        setMessageQueue(prevQueue => [...prevQueue, { imageUrl: data.imageUrl, text: data.text }]);
        console.log("Message added to queue, length:", messageQueue.length + 1);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", event.data, error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      // Note: onerror often immediately precedes onclose.
      // We primarily handle reconnection logic in onclose.
      // We could set status to 'reconnecting' here, but onclose will likely trigger soon.
    };

    ws.onclose = (event) => {
      console.log(`WebSocket closed. Code: ${event.code}, Reason: ${event.reason}, Was Clean: ${event.wasClean}`);
      wsRef.current = null; // Clear the ref

      // Don't attempt to reconnect if the component is unmounting
      if (isUnmountingRef.current) {
        console.log("Close occurred during unmount, not reconnecting.");
        // setConnectionStatus("disconnected");
        return;
      }

      // Don't reconnect on normal closure codes (like 1000) if desired
      // if (event.code === 1000) {
      //   console.log("Normal closure, not reconnecting.");
      //   setConnectionStatus("disconnected");
      //   return;
      // }

      // --- Reconnection Logic ---
      // setConnectionStatus("reconnecting");
      const delay = currentRetryDelay.current;
      console.log(`Attempting to reconnect in ${delay / 1000} seconds...`);

      // Clear previous timer just in case
      clearTimeout(reconnectTimerRef.current);

      reconnectTimerRef.current = setTimeout(() => {
        // Exponential backoff
        currentRetryDelay.current = Math.min(
          delay * 2,
          MAX_RECONNECT_DELAY
        );
        connectWebSocket(); // Try to connect again
      }, delay);
    };

  }, []); // Empty dependency array - this function doesn't change

  // --- Function to process the display queue ---
  const processQueue = useCallback(() => {
    if (isDisplaying || messageQueue.length === 0) {
      // If not displaying an item and queue is empty, hide the content area
      if (!isDisplaying && messageQueue.length === 0) {
          setIsShowingContent(false);
      }
      return;
    }

    setIsDisplaying(true);
    setIsShowingContent(true); // Make sure card content area is visible

    const nextMessage = messageQueue[0];
    setMessageQueue(prevQueue => prevQueue.slice(1));

    console.log("Displaying message:", nextMessage);

    setCurrentImage(nextMessage.imageUrl);
    setCurrentText(nextMessage.text || "Incoming Signal...");
    setDataKey(Date.now());

    if (audioRef.current && alertSoundSrc) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    setShowBurst(true);
    setTimeout(() => setShowBurst(false), 600);

    if (displayTimerRef.current) clearTimeout(displayTimerRef.current);
    displayTimerRef.current = setTimeout(() => {
      setIsDisplaying(false); // Free up the display slot
      // The useEffect below will trigger processQueue again if needed
    }, DISPLAY_DURATION);

  }, [isDisplaying, messageQueue, alertSoundSrc]);

  // --- Effect for Initial Connection & Cleanup ---
  useEffect(() => {
    // Inject styles
    const styleElement = document.createElement("style");
    styleElement.id = "hyper-cosmic-broadcast-styles";
    styleElement.textContent = componentStyles;
    if (!document.getElementById(styleElement.id)) {
      document.head.appendChild(styleElement);
    }

    // Start the connection process
    isUnmountingRef.current = false;
    connectWebSocket();

    // --- Cleanup Function ---
    return () => {
      console.log("Cleanup: Component unmounting...");
      isUnmountingRef.current = true; // Set the flag

      // Clear any pending reconnection timer
      clearTimeout(reconnectTimerRef.current);
      console.log("Cleared reconnect timer.");

      // Clear the display timer
      clearTimeout(displayTimerRef.current);
      console.log("Cleared display timer.");

      // Close the WebSocket connection if it exists and is open/connecting
      if (wsRef.current) {
         // Use code 1000 for normal closure
        wsRef.current.close(1000, "Component unmounting");
        console.log("WebSocket connection closed.");
        wsRef.current = null;
      }

      // Remove styles
      const existingStyleElement = document.getElementById("hyper-cosmic-broadcast-styles");
      if (existingStyleElement) {
        document.head.removeChild(existingStyleElement);
        console.log("Removed styles.");
      }
    };
  }, [connectWebSocket]); // Include connectWebSocket in dependency array

  // --- Effect to Trigger Queue Processing ---
  useEffect(() => {
    // Process queue when display is free or when queue gets new items (if display is free)
    processQueue();
  }, [isDisplaying, messageQueue, processQueue]);

  // --- Effect for Dynamic Burst Style Injection (no changes needed) ---
  useEffect(() => {
    let burstStyleElement = null;
    const styleId = 'hcb-burst-temp-style';
    const existingBurstStyle = document.getElementById(styleId);
    if (existingBurstStyle) { document.head.removeChild(existingBurstStyle); }
    if (showBurst) {
        burstStyleElement = document.createElement('style');
        burstStyleElement.id = styleId;
        burstStyleElement.textContent = `.hcb-content-wrapper::before, .hcb-content-wrapper::after { animation: hcb-burst 0.6s ease-out forwards; }`;
        document.head.appendChild(burstStyleElement);
    }
    return () => {
        const finalBurstStyle = document.getElementById(styleId);
        if (finalBurstStyle) { try { document.head.removeChild(finalBurstStyle); } catch (e) {} }
    };
  }, [showBurst]);


  // --- Render Logic ---
  const isLoadingState = connectionStatus === 'connecting' || connectionStatus === 'reconnecting';
  const cardIsActuallyVisible = isShowingContent || isLoadingState; // Show card if loading/reconnecting or showing content
  const cardClass = `hcb-card ${cardIsActuallyVisible ? 'hcb-card-visible' : ''}`;

  const contentWrapperStyle = isShowingContent ? {
    animation: `hcb-content-appear 0.8s 0.5s cubic-bezier(0.2, 1, 0.3, 1) forwards`
  } : {};

  let loadingText = "Awaiting Signal...";
  if (connectionStatus === 'connecting') loadingText = "Connecting...";
  if (connectionStatus === 'reconnecting') loadingText = `Reconnecting (retry in ${Math.round(currentRetryDelay.current / 1000)}s)...`;


  return (
    <div className="hcb-container">
      {/* Meteor Layers */}
      <div className="hcb-meteor-layer layer-1"></div>
      <div className="hcb-meteor-layer layer-2"></div>
      <div className="hcb-meteor-layer layer-3"></div>

      {/* Audio Element */}
      {alertSoundSrc && <audio ref={audioRef} src={alertSoundSrc} preload="auto" />}

      {/* Card */}
      <div className={cardClass}>
        {/* Show loading indicator if connecting/reconnecting OR if connected but nothing is being displayed/queued */}
        {isLoadingState || !isShowingContent ? (
          <div className="hcb-loading">
            <div className="hcb-spinner"></div>
            {/* Use dynamic loading text */}
            <p className="hcb-loading-text">{loadingText}</p>
          </div>
        ) : (
          // Show content only when isShowingContent is true
          <div
            key={dataKey}
            className="hcb-content-wrapper"
            style={contentWrapperStyle}
            aria-live="polite"
          >
            {currentImage && <img src={currentImage} alt="Broadcast visual" className="hcb-image" />}
            {currentText && <p className="hcb-text">{currentText}</p>}
          </div>
        )}
      </div>
       {/* Optional: Display queue/status for debugging */}
       {/* <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', background: 'rgba(0,0,0,0.5)', padding: '5px', borderRadius: '3px', zIndex: 100 }}>
           Status: {connectionStatus} | Queue: {messageQueue.length} | Displaying: {isDisplaying.toString()}
       </div> */}
    </div>
  );
};

export default DisplayScreen;