import React from 'react';

const UrlForm = ({ originalUrl, setOriginalUrl, shortenUrl, isLoading, error }) => (
  <div className="url-form">
    <div className="input-group">
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="Enter your long URL here..."
        disabled={isLoading}
        onKeyPress={(e) => e.key === 'Enter' && shortenUrl()}
      />
      <button 
        onClick={shortenUrl} 
        disabled={isLoading}
        className={isLoading ? 'loading' : ''}
      >
        {isLoading ? (
          <>
            <span className="spinner"></span>
            Shortening...
          </>
        ) : (
          'Shorten URL'
        )}
      </button>
    </div>

    {error && (
      <div className="error-message shake-animation">
        {error}
      </div>
    )}
  </div>
);

export default UrlForm;