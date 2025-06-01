import React, { useState, useEffect, useRef } from 'react';
import './AuthPage.css';

// Mock database - In real app, this would be your actual database
const MOCK_GYM_MEMBERS = [
  { id: 1, name: 'John Doe', email: 'john@email.com', whatsapp: '1234567890' },
  { id: 2, name: 'Jane Smith', email: 'jane@email.com', whatsapp: '0987654321' },
  { id: 3, name: 'Mike Johnson', email: 'mike@email.com', whatsapp: '5555555555' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@email.com', whatsapp: '7777777777' }
];

// Mock attendance database
let ATTENDANCE_DB = [
  { userId: 1, date: new Date().toDateString(), present: false },
  { userId: 2, date: new Date().toDateString(), present: false },
  { userId: 3, date: new Date().toDateString(), present: false },
  { userId: 4, date: new Date().toDateString(), present: false }
];

// Expected QR code data for gym attendance
const GYM_QR_CODE = "GYM_ATTENDANCE_2024";

export default function AuthPage() {
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    loginName: '',
    loginWhatsapp: ''
  });

  // QR Scanner states
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [qrStatus, setQrStatus] = useState('');
  const [qrError, setQrError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);

  // Load remembered user on component mount
  useEffect(() => {
    const rememberedUser = JSON.parse(localStorage.getItem('gymUser') || 'null');
    if (rememberedUser) {
      setUser(rememberedUser);
    }
  }, []);

  // Load jsQR library for QR scanning
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jsqr/1.4.0/jsQR.min.js';
    document.head.appendChild(script);

    return () => {
      stopScanning();
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showMessage = (msg, isSuccess = false) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    const existingMember = MOCK_GYM_MEMBERS.find(
      member => member.name.toLowerCase() === formData.name.toLowerCase() && 
               member.email.toLowerCase() === formData.email.toLowerCase() &&
               member.whatsapp === formData.whatsapp
    );

    if (!existingMember) {
      showMessage('Please become a member to access these features.');
      return;
    }

    const userData = {
      id: existingMember.id,
      name: existingMember.name,
      email: existingMember.email,
      whatsapp: existingMember.whatsapp
    };
    
    localStorage.setItem('gymUser', JSON.stringify(userData));
    setUser(userData);
    showMessage('Registration successful! Welcome to the gym system.', true);
  };

  const handleSignin = (e) => {
    e.preventDefault();
    
    const member = MOCK_GYM_MEMBERS.find(
      member => member.name.toLowerCase() === formData.loginName.toLowerCase() && 
               member.whatsapp === formData.loginWhatsapp
    );

    if (!member) {
      showMessage('Invalid credentials or you are not a gym member.');
      return;
    }

    const userData = {
      id: member.id,
      name: member.name,
      email: member.email,
      whatsapp: member.whatsapp
    };
    
    localStorage.setItem('gymUser', JSON.stringify(userData));
    setUser(userData);
    showMessage('Sign in successful! Welcome back.', true);
  };

  const handleLogout = () => {
    localStorage.removeItem('gymUser');
    setUser(null);
    setFormData({
      name: '',
      email: '',
      whatsapp: '',
      loginName: '',
      loginWhatsapp: ''
    });
    showMessage('Logged out successfully.', true);
  };

  const handleGoogleLogin = () => {
    alert('Google Login feature coming soon!');
  };

  // Feature handlers - placeholder functions for now
  const handleLeaderboard = () => {
    showMessage('Leaderboard feature coming soon!');
    // You can add your leaderboard code here later
  };

  const handlePerformance = () => {
    showMessage('Performance tracking feature coming soon!');
    // You can add your performance tracking code here later
  };

  // QR Scanner Functions
  const showQrStatus = (message, isError = false) => {
    if (isError) {
      setQrError(message);
      setQrStatus('');
    } else {
      setQrStatus(message);
      setQrError('');
    }
  };

  const hideQrStatus = () => {
    setQrStatus('');
    setQrError('');
  };

  const startCamera = async () => {
    try {
      hideQrStatus();
      setLoading(true);
      showQrStatus('Starting camera...');
      
      const constraints = {
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          if (canvasRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
          }
          startScanning();
          setLoading(false);
        };
      }
    } catch (error) {
      console.error('Camera access error:', error);
      let errorMessage = 'Unable to access camera. ';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Please allow camera permissions and try again.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No camera found on this device.';
      } else {
        errorMessage += 'Please check your camera settings.';
      }
      
      showQrStatus(errorMessage, true);
      setLoading(false);
    }
  };

  const startScanning = () => {
    if (!isScanning) {
      setIsScanning(true);
      showQrStatus('📷 Scanning for gym QR code... Point your camera at the QR code');
      
      scanIntervalRef.current = setInterval(() => {
        scanForQR();
      }, 100);
    }
  };

  const scanForQR = () => {
    if (!window.jsQR || !videoRef.current || !canvasRef.current) return;
    
    if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = window.jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        processQRResult(code.data);
        stopScanning();
      }
    }
  };

  const processQRResult = (data) => {
    // Check if this is the gym's QR code
    if (data === GYM_QR_CODE) {
      markAttendance();
    } else {
      showQrStatus('Invalid QR code. Please scan the gym attendance QR code.', true);
      setTimeout(() => {
        setShowQRScanner(false);
      }, 2000);
    }
    
    // Vibrate if supported
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  };

  const markAttendance = () => {
    const today = new Date().toDateString();
    
    // Find user's attendance record for today
    const attendanceIndex = ATTENDANCE_DB.findIndex(
      record => record.userId === user.id && record.date === today
    );

    if (attendanceIndex !== -1) {
      // Update attendance
      ATTENDANCE_DB[attendanceIndex].present = true;
    } else {
      // Create new attendance record
      ATTENDANCE_DB.push({
        userId: user.id,
        date: today,
        present: true
      });
    }
    
    setShowQRScanner(false);
    showMessage(`✅ Attendance marked for ${user.name}! Welcome to the gym.`, true);
  };

  const stopScanning = () => {
    setIsScanning(false);
    
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    hideQrStatus();
  };

  const openQRScanner = () => {
    setShowQRScanner(true);
    setTimeout(() => {
      startCamera();
    }, 100);
  };

  const closeQRScanner = () => {
    stopScanning();
    setShowQRScanner(false);
  };

  // If user is logged in, show dashboard
  if (user) {
    const todayAttendance = ATTENDANCE_DB.find(
      record => record.userId === user.id && record.date === new Date().toDateString()
    );

    return (
      <>
        <div className="auth-container">
          <div className="auth-card">
            <h2 className="auth-title">Welcome, {user.name}!</h2>
            
            <div className="user-status">
              <p className="status-text">
                Status: {todayAttendance?.present ? '✅ Present Today' : '❌ Not Marked'}
              </p>
              
              {!todayAttendance?.present && (
                <button 
                  className="toggle-btn qr-scan-btn"
                  onClick={openQRScanner}
                >
                  📱 Scan QR for Attendance
                </button>
              )}
              
              {todayAttendance?.present && (
                <div className="attendance-box">
                  <p className="attendance-text">
                    ✅ Attendance Confirmed for Today!
                  </p>
                </div>
              )}
            </div>

            {/* Features Section */}
            <div className="features-section">
              <h3 className="section-title">🏋️ Gym Features</h3>
              
              <button 
                className="feature-btn"
                onClick={handleLeaderboard}
              >
                🏆 Leaderboard
              </button>
              
              <button 
                className="feature-btn"
                onClick={handlePerformance}
              >
                📊 Your Performance
              </button>
            </div>

            <hr className="divider" />
            
            <div className="logout-section">
              <button 
                className="google-btn logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          
          {message && (
            <div className={`notification ${message.includes('successful') || message.includes('marked') || message.includes('Welcome') ? 'notification-success' : 'notification-error'}`}>
              {message}
            </div>
          )}
        </div>

        {/* QR Scanner Modal */}
        {showQRScanner && (
          <div className="qr-scanner-container">
            <div className="qr-scanner-card">
              <h2 className="qr-scanner-title">
                📱 Gym Attendance Scanner
              </h2>
              
              <p className="qr-scanner-subtitle">
                Scan the gym's QR code to mark your attendance
              </p>
              
              <div className="video-container">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className={`video-element ${isScanning ? 'video-visible' : 'video-hidden'}`}
                />
                
                {isScanning && (
                  <div className="scanning-overlay" />
                )}
              </div>
              
              <canvas ref={canvasRef} className="canvas-hidden" />
              
              <div className="qr-controls">
                <button
                  onClick={isScanning ? stopScanning : startCamera}
                  disabled={!!qrError}
                  className="toggle-btn qr-toggle-btn"
                >
                  {isScanning ? 'Stop Scanner' : 'Start Scanner'}
                </button>
                
                <button
                  onClick={closeQRScanner}
                  className="close-qr-btn"
                >
                  Close
                </button>
              </div>
              
              {qrStatus && (
                <div className="status-message">
                  {loading && <span className="loading-spinner" />}
                  {qrStatus}
                </div>
              )}
              
              {qrError && (
                <div className="error-message">
                  {qrError}
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Want to become an OG?</h2>
        {!showSignup && (
          <button className="toggle-btn" onClick={() => setShowSignup(true)}>
            Sign Up
          </button>
        )}
        {showSignup && (
          <div className="form">
            <input 
              className="input"
              type="text" 
              name="name"
              placeholder="Name" 
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input 
              className="input"
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input 
              className="input"
              type="tel" 
              name="whatsapp"
              placeholder="WhatsApp Number" 
              value={formData.whatsapp}
              onChange={handleInputChange}
              required
            />
            <button 
              className="button" 
              onClick={handleSignup}
            >
              Register
            </button>
            <button 
              className="back-btn"
              onClick={() => setShowSignup(false)}
            >
              Back to Sign In
            </button>
          </div>
        )}
        <hr className="divider" />
        <h2 className="auth-title">Already an OG?</h2>
        <div className="form">
          <input 
            className="input"
            type="text" 
            name="loginName"
            placeholder="Name" 
            value={formData.loginName}
            onChange={handleInputChange}
            required
          />
          <input 
            className="input"
            type="tel" 
            name="loginWhatsapp"
            placeholder="WhatsApp Number" 
            value={formData.loginWhatsapp}
            onChange={handleInputChange}
            required
          />
          <button 
            className="button" 
            onClick={handleSignin}
          >
            Sign In
          </button>
          <p className="or">or</p>
          <button 
            className="google-btn" 
            onClick={handleGoogleLogin}
          >
            Sign In with Google
          </button>
        </div>
      </div>
      
      {message && (
        <div className={`notification ${message.includes('successful') || message.includes('Welcome') ? 'notification-success' : 'notification-error'}`}>
          {message}
        </div>
      )}
    </div>
  );
}