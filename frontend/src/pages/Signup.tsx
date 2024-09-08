import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import email_icon from '../Assest/email.png';
import password_icon from '../Assest/password.png';
import eye_open from '../Assest/watch.png';
import eye_close from '../Assest/closed-eyes.png';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);
  const [visible, setVisible] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.name) newErrors.name = "Name is required.";
    if (!values.email) newErrors.email = "Email is required.";
    if (!values.password) newErrors.password = "Password is required.";
    if (values.password !== values.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    setErrors(Object.keys(newErrors).length ? newErrors : null);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(values.name, values.email, values.password);
      toast.success("Signed Up Successfully", { id: "signup" });
      navigate("/chat");
    } catch (error) {
      console.log(error);
      toast.error("Signing Up Failed", { id: "signup" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate("/chat");
    }
  }, [auth, navigate]);

  // Styles optimized for larger desktop screens
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#000000',
    padding: '40px',
    width: '100%',
    maxWidth: '500px',
    borderRadius: '20px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9)',
    transition: 'all 0.3s ease',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
    width: '100%',
    marginBottom: '0',
  };

  const textStyle: React.CSSProperties = {
    color: '#FFFFFF',
    fontSize: '2.5rem',  // Larger font size for desktop
    fontWeight: '700',
    fontFamily: 'Roboto, sans-serif',
    margin: '0',
    textDecoration: 'none',
  };

  const inputsStyle: React.CSSProperties = {
    marginTop: '30px',  // Increased margin for more spacing
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',  // Increased gap between input fields
    width: '100%',
  };

  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: '6px',
    padding: '12px',  // Larger padding for input container
    backgroundColor: '#1C1C1C',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const inputStyle: React.CSSProperties = {
    height: '2.8rem',  // Slightly larger input fields
    width: '100%',
    background: 'transparent',
    border: '1px solid #333333',
    outline: 'none',
    color: '#E0E0E0',
    fontSize: '1.1rem',  // Increased font size for better readability
    borderRadius: '4px',
    padding: '0 10px',
    transition: 'border-color 0.3s ease',
  };

  const submitContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    width: '100%',
    margin: '50px auto',
  };

  const submitStyle: React.CSSProperties = {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px 30px',
    background: '#333333',
    color: '#FFFFFF',
    borderRadius: '50px',
    fontSize: '1.5rem',  // Larger text on the button
    textAlign: 'center',
    width: '70%',  // Slightly wider button
    height: '55px',  // Adjusted height
    border: 'none',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  };

  const iconStyle: React.CSSProperties = {
    width: '26px',
    height: '26px',
    marginRight: '12px',
    filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5))',
  };

  const messageStyle: React.CSSProperties = {
    margin: '0px',
    padding: '6px',
    fontSize: '14px',
    color: '#E0E0E0',
    textAlign: 'center',
  };

  return (
    <form onSubmit={handleSubmit} style={containerStyle} autoComplete="off">
      <div style={headerStyle}>
        <div style={textStyle}>Sign Up</div>
        <div style={{ width: '100%', height: '1px', backgroundColor: '#FFFFFF', margin: '10px 0' }}></div>
      </div>

      <div style={inputsStyle}>
        <div style={inputContainerStyle}>
          <img src={email_icon} alt="Name Icon" style={iconStyle} />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleInput}
            style={inputStyle}
            autoComplete="off"
          />
          {errors?.name && <span style={{ color: '#CF6679', fontSize: '12px', marginTop: '5px' }}>{errors.name}</span>}
        </div>

        <div style={inputContainerStyle}>
          <img src={email_icon} alt="Email Icon" style={iconStyle} />
          <input
            type="email"
            name="email"
            placeholder="Email Id"
            value={values.email}
            onChange={handleInput}
            style={inputStyle}
            autoComplete="off"
          />
          {errors?.email && <span style={{ color: '#CF6679', fontSize: '12px', marginTop: '5px' }}>{errors.email}</span>}
        </div>

        <div style={inputContainerStyle}>
          <img src={password_icon} alt="Password Icon" style={iconStyle} />
          <input
            type={visible ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleInput}
            style={inputStyle}
            autoComplete="off"
          />
          <img
            src={visible ? eye_open : eye_close}
            alt="Password Visibility"
            style={{ ...iconStyle, cursor: 'pointer', marginLeft: '12px' }}
            onClick={() => setVisible(!visible)}
          />
          {errors?.password && <span style={{ color: '#CF6679', fontSize: '12px', marginTop: '5px' }}>{errors.password}</span>}
        </div>

        <div style={inputContainerStyle}>
          <img src={password_icon} alt="Confirm Password Icon" style={iconStyle} />
          <input
            type={visible ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleInput}
            style={inputStyle}
            autoComplete="off"
          />
          {errors?.confirmPassword && <span style={{ color: '#CF6679', fontSize: '12px', marginTop: '5px' }}>{errors.confirmPassword}</span>}
        </div>
      </div>

      <div style={submitContainerStyle}>
        <button
          type="submit"
          style={submitStyle}
          onMouseOver={(e) => (e.currentTarget.style.background = '#444444')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#333333')}
        >
          Sign Up
        </button>
      </div>
      <div style={messageStyle}>
      </div>
    </form>
  );
};

export default Signup;
