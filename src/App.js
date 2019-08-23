import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios'

export default function App() {
  const [results, setResult] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const searchInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setNewsResult();
  }, []); // make sure the request is made only once when component mount/unmount);

  const setNewsResult = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      setResult(response.data.hits);
      setLoading(false);
    } catch (e) {
      setError(e);
    }
  };

  const handleSearch = event => {
    event.preventDefault();
    setNewsResult();
  };

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  };

  return (
    <>
    <form onSubmit={handleSearch}>
      <input ref={searchInputRef} value={query} type="text" onChange={event => setQuery(event.target.value)}/>
      <button type="submit">Search</button>
      <button type="button" onClick={handleClearSearch}>Clear</button>
      {loading ? (
        <div>loading...</div>
      ) : (
      <ul>
        {results.map(result => (
          <li key={result.objectId}>
            <a href={result.url}>{result.title}</a>
          </li>
        ))}
      </ul>)}
    </form>
      {error && <div>{error.message}</div>}
    </>
  );
}