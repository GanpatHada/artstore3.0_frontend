import { useState, useEffect } from "react";
import "./CustomAlert.css";

export default function CustomAlert() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check localStorage if user has already seen the alert
    const seen = localStorage.getItem("renderNoticeSeen");
    if (!seen) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    // Save flag so it won't show again
    localStorage.setItem("renderNoticeSeen", "true");
  };

  if (!visible) return null;

  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <h2 className="alert-title">⚠️ Notice</h2>
        <p className="alert-message">
          This project is hosted on <b>Render free tier</b>. <br />
          API calls may be delayed <b>5–60 seconds</b> when starting up.
        </p>
        <button className="alert-button" onClick={handleClose}>
          Got it
        </button>
      </div>
    </div>
  );
}
