import React, { useState, useEffect, useRef } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const directionMultiplierRef = useRef(1);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => {
        // Get current time values for hours, minutes, and seconds
        let currentHours = prevTime.getHours();
        let currentMinutes = prevTime.getMinutes();
        let currentSeconds = prevTime.getSeconds();

        // Adjust based on direction (clockwise/anti-clockwise)
        currentSeconds += directionMultiplierRef.current;

        if (currentSeconds >= 60) {
          currentSeconds = 0;
          currentMinutes += 1;
        } else if (currentSeconds < 0) {
          currentSeconds = 59;
          currentMinutes -= 1;
        }

        if (currentMinutes >= 60) {
          currentMinutes = 0;
          currentHours += 1;
        } else if (currentMinutes < 0) {
          currentMinutes = 59;
          currentHours -= 1;
        }

        if (currentHours >= 24) {
          currentHours = 0;
        } else if (currentHours < 0) {
          currentHours = 23;
        }

        // Create a new date object with the updated time values
        const updatedTime = new Date();
        updatedTime.setHours(currentHours);
        updatedTime.setMinutes(currentMinutes);
        updatedTime.setSeconds(currentSeconds);

        return updatedTime;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  // Handle direction change
  const handleDirectionChange = (clockwise) => {
    directionMultiplierRef.current = clockwise ? 1 : -1;
  };
  
  return (
    <div>
      <div className="clock">
        <div
          className="hour_hand"
          style={{
            transform: `rotateZ(${time.getHours() * 30 + time.getMinutes() * 0.5}deg)` 
          }}
        />
        <div
          className="min_hand"
          style={{
            transform: `rotateZ(${time.getMinutes() * 6}deg)` // 360 / 60 minutes = 6 degrees per minute
          }}
        />
        <div
          className="sec_hand"
          style={{
            transform: `rotateZ(${time.getSeconds() * 6}deg)` // 360 / 60 seconds = 6 degrees per second
          }}
        />
        <span className="twelve">12</span>
        <span className="one">1</span>
        <span className="two">2</span>
        <span className="three">3</span>
        <span className="four">4</span>
        <span className="five">5</span>
        <span className="six">6</span>
        <span className="seven">7</span>
        <span className="eight">8</span>
        <span className="nine">9</span>
        <span className="ten">10</span>
        <span className="eleven">11</span>
      </div>

      <div className="controls">
        <button className="clockwise-button" onClick={() => handleDirectionChange(true)}>Clockwise</button>
        <button className="anti-clockwise-button" onClick={() => handleDirectionChange(false)}>Anti-Clockwise</button>
      </div>
    </div>
  );
};

export default Clock;
