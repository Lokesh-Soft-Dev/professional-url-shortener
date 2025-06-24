import React from 'react';

const UrlResult = ({ shortUrl, copied, copyToClipboard }) => (
  <div className="url-result fade-in">
    <p className="result-label">Short URL:</p>
    <div className="result-group">
      <a 
        href={shortUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="short-url"
      >
        {shortUrl}
      </a>
      <button 
        onClick={copyToClipboard}
        className={copied ? 'copied pulse-animation' : ''}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  </div>
);

export default UrlResult;