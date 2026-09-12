import { useState } from 'react'

type LoginProps = {
  onLogin: (rememberMe: boolean) => void
}

function Login({ onLogin }: LoginProps) {
  const lightTheme = localStorage.getItem('skillsaarthi-theme') !== 'dark'
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password123')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (email.trim() === '' || password.trim() === '') {
      setError('Please enter your email and password.')
      return
    }

    if (email.trim().toLowerCase() === 'admin@example.com' && password.trim() === 'password123') {
      setSuccess('Login successful. Welcome to SkillSaarthi Admin.')
      onLogin(rememberMe)
      return
    }

    setError('Email or password is incorrect.')
  }

  return (
    <main className={`login-page ${lightTheme ? 'light-theme' : ''}`}>
      <section className="login-card">
        <div className="login-brand">
          <span className="brand-mark">S</span>
          <span>SKILLSAARTHI <b>ADMIN</b></span>
        </div>
        <div className="eyebrow">ADMIN WORKSPACE</div>
        <h1>Welcome back</h1>
        <p className="login-help">Sign in to manage employee skills and training.</p>

        <form onSubmit={handleLogin} className="login-form">
          <label>
            <span>Email</span>
            {/* email input here */}
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="admin@example.com"
            />
          </label>
          <label>
            <span>Password</span>
            {/* password input here */}
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </label>
          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={event => setRememberMe(event.target.checked)}
              />
              <span>Remember Me</span>
            </label>
            <button type="button" className="forgot-password" onClick={() => setError('Password reset is not available in this sample.')}>Forgot Password?</button>
          </div>
          <button type="submit" className="primary-button login-button">Sign In</button>
        </form>

        {error && <p className="login-message login-error" role="alert">{error}</p>}
        {success && <p className="login-message login-success" role="status">{success}</p>}
        <p className="login-sample">Sample login: admin@example.com / password123</p>
      </section>
    </main>
  )
}

export default Login
