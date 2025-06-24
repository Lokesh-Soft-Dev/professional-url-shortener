import React from 'react';

const UrlHistory = ({ history, copiedId, copyToClipboard, clearHistory }) => (
  <div className="url-history glass-card slide-up">
    <div className="history-header">
      <h2>Your Shortened URLs</h2>
      <button 
        onClick={clearHistory}
        className="clear-btn"
      >
        Clear History
      </button>
    </div>
    
    <div className="history-list">
      {history.map((entry) => (
        <div key={entry.id} className="history-item">
          <div className="url-group">
            <p className="original-url">{entry.original}</p>
            <a 
              href={entry.shortened} 
              target="_blank" 
              rel="noopener noreferrer"
              className="shortened-url"
            >
              {entry.shortened}
            </a>
            <p className="url-date">
              {new Date(entry.date).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => copyToClipboard(entry.shortened, entry.id)}
            className={copiedId === entry.id ? 'copied pulse-animation' : ''}
          >
            {copiedId === entry.id ? 'Copied!' : 'Copy'}
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default UrlHistory;