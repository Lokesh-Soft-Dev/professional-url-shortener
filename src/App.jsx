import { useState, useEffect } from 'react';
import '../src/styles/main.scss';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('urlHistory');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem('urlHistory', JSON.stringify(history));
  }, [history]);

  const shortenUrl = async () => {
    if (!originalUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    try {
      new URL(originalUrl);
    } catch (e) {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(originalUrl)}`
      );
      
      if (!response.ok) throw new Error('Failed to shorten URL');
      
      const data = await response.text();
      setShortUrl(data);
      
      setHistory(prev => [
        {
          id: Date.now(),
          original: originalUrl,
          shortened: data,
          date: new Date().toISOString()
        },
        ...prev.slice(0, 9) // Keep last 10 items
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text, id = null) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearHistory = () => setHistory([]);

  return (
    <div className="app">
      <header className="header">
        <h1>URL Shortener</h1>
        <p>Shorten your long URLs quickly and easily</p>
      </header>

      <main>
        <div className="shortener-container">
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
            >
              {isLoading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          {shortUrl && (
            <div className="result">
              <p>Short URL:</p>
              <div className="result-group">
                <a 
                  href={shortUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {shortUrl}
                </a>
                <button 
                  onClick={() => copyToClipboard(shortUrl, 'current')}
                  className={copiedId === 'current' ? 'copied' : ''}
                >
                  {copiedId === 'current' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="history">
            <div className="history-header">
              <h2>Your Shortened URLs</h2>
              <button onClick={clearHistory}>Clear History</button>
            </div>
            {history.map((entry) => (
              <div key={entry.id} className="history-item">
                <div className="url-group">
                  <p className="original">{entry.original}</p>
                  <a 
                    href={entry.shortened} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="shortened"
                  >
                    {entry.shortened}
                  </a>
                  <p className="date">{new Date(entry.date).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(entry.shortened, entry.id)}
                  className={copiedId === entry.id ? 'copied' : ''}
                >
                  {copiedId === entry.id ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Powered by TinyURL API | Developed with ❤️ by LOKESH</p>
      </footer>
    </div>
  );
}

export default App;