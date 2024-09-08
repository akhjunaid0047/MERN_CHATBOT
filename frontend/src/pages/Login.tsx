import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import email_icon from '../Assest/email.png';
import password_icon from '../Assest/password.png';
import eye_open from '../Assest/watch.png';
import eye_close from '../Assest/closed-eyes.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const auth = useAuth();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!values.email) newErrors.email = 'Email is required';
    if (!values.password) newErrors.password = 'Password is required';

    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(values.email, values.password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (err) {
      console.log(err);
      toast.error("Failed to Sign In", { id: "login" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);

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
    gap: '1px',
    width: '100%',
    marginBottom: '20px',
  };

  const textStyle: React.CSSProperties = {
    color: '#FFFFFF',
    fontSize: '2.5rem',
    fontWeight: '700',
    fontFamily: 'Roboto, sans-serif',
    margin: '0',
    textDecoration: 'none',
  };

  const inputsStyle: React.CSSProperties = {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    width: '100%',
  };

  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: '6px',
    padding: '8px',
    backgroundColor: '#1C1C1C',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const inputStyle: React.CSSProperties = {
    height: '2.8rem',
    width: '100%',
    background: 'transparent',
    // border: '1px solid #333333',
    outline: 'none',
    color: '#E0E0E0',
    fontSize: '1.1rem',
    borderRadius: '4px',
    padding: '0 10px',
    transition: 'border-color 0.3s ease',
  };

  const submitContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    width: '100%',
    margin: '40px auto',
  };

  const submitStyle: React.CSSProperties = {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 24px',
    background: '#333333',
    color: '#FFFFFF',
    borderRadius: '50px',
    fontSize: '1.2rem',
    textAlign: 'center',
    width: '60%',
    height: '50px',
    border: 'none',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  };

  const iconStyle: React.CSSProperties = {
    width: '24px',
    height: '24px',
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
        <div style={textStyle}>Login</div>
        <div style={{ width: '100%', height: '1px', backgroundColor: '#FFFFFF', margin: '10px 0' }}></div>
      </div>

      <div style={inputsStyle}>
        <div style={inputContainerStyle}>
          <img
            src={email_icon}
            alt="Email Icon"
            style={iconStyle}
          />
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
          <img
            src={password_icon}
            alt="Password Icon"
            style={iconStyle}
          />
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
      </div>

      <div style={submitContainerStyle}>
        <button
          type="submit"
          style={submitStyle}
          onMouseOver={(e) => (e.currentTarget.style.background = '#444444')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#333333')}
        >
          Login
        </button>
      </div>
      <div style={messageStyle}>
      </div>
    </form>
  );
};

export default Login;
