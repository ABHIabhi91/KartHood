import React from "react";
import "./LoginModal.css";

const LoginModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Login</h2>
        <form>
          <input type="text" placeholder="Username or Email" className="modal-input" />
          <input type="password" placeholder="Password" className="modal-input" />
          <button type="submit" className="modal-submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
