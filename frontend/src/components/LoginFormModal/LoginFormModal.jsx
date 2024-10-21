import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal(); // Access closeModal function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      await dispatch(sessionActions.login({ credential, password }));
      closeModal(); // Close modal on successful login
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors); // Set errors if they exist
      } else {
        setErrors({ credential: "The provided credentials were invalid" }); // Default error message
      }
    }
  };

  // Log in as Demo User function
  const loginAsDemoUser = async () => {
    await dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }));
    closeModal(); // Close modal as soon as Demo user logs in
  };

  // Disable button if username/password do not meet length requirements
  const isButtonDisabled = credential.length < 4 || password.length < 6;

  return (
    <div className="login-form-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {/* Display error if invalid credentials */}
        {errors.credential && <p className="error">{errors.credential}</p>}

        <button type="submit" disabled={isButtonDisabled}>Log In</button>
      </form>

      {/* Log in as Demo User button */}
      <button onClick={loginAsDemoUser}>
        Log in as Demo User
      </button>
    </div>
  );
}

export default LoginFormModal;
