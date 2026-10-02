import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('Sara');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Please enter a username and password.');
      return;
    }

    setError('');
    // For the prototype: Any non-empty credentials allow entering the app
    const displayName = username.trim();
    // Capitalize if single lowercase name like 'sara'
    const formattedName =
      displayName.charAt(0).toUpperCase() + displayName.slice(1);

    onLogin({
      name: formattedName || 'Sara',
      role: 'Team Member',
    });
  };

  const handleFillDemo = () => {
    setUsername('Sara');
    setPassword('demo123');
    setError('');
  };

  return (
    <div className="login-screen">
      <div className="login-box">
        {/* Logo & Brand */}
        <div className="login-brand" style={{ marginBottom: '20px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'var(--accent-light)',
              color: 'var(--accent)',
              marginBottom: '10px',
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" />
              <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
          </div>
          <h1>TeamTrack</h1>
        </div>

        {/* Headings */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            Welcome back
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Manage your college projects together.
          </p>
        </div>

        {error && (
          <div
            style={{
              background: '#fef2f2',
              color: 'var(--red)',
              border: '1px solid #fecaca',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              marginBottom: '14px',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username or Email</label>
            <input
              id="username"
              type="text"
              placeholder="e.g. name@college.edu"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError('');
              }}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px', padding: '10px 14px', justifyContent: 'center' }}
          >
            Login
          </button>

          <p
            style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              textAlign: 'center',
              marginTop: '12px',
              letterSpacing: '0.2px',
            }}
          >
            Prototype Demo
          </p>
        </form>

        {/* Demo Account Hint */}
        <div
          onClick={handleFillDemo}
          style={{
            marginTop: '16px',
            padding: '12px 14px',
            background: 'var(--bg)',
            border: '1px dashed var(--border)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            lineHeight: '1.5',
            cursor: 'pointer',
            transition: 'background 0.15s, border-color 0.15s',
          }}
          title="Click to fill demo account"
        >
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '3px' }}>
            Demo:
          </div>
          <div>Student: <strong>Sara</strong></div>
          <div>Role: <strong>Team Member</strong></div>
        </div>
      </div>
    </div>
  );
}
