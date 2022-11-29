import { useEffect, useState, useCallback } from "react";
import { SearchItemType } from "./types";
import SearchItem from "./SearchItem";
import Loader from "./Loader";
import * as API from "./API";

import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [showResults, setShouldShowResults] = useState(false);
  const [showLoader, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchItemType[]>([]);

  const selectItem = useCallback((name: string) => {
    setShouldShowResults(false);
    setInputValue(name);
  }, []);

  useEffect(() => {
    if (!showResults) return;

    if (inputValue.length > 0) {
      const interval = setTimeout(() => {
        setLoading(true);
        setShouldShowResults(true);

        API.search(inputValue)
          .then((results) => setSearchResults(results.slice(0, 8)))
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      }, 300);

      return () => {
        window.clearTimeout(interval);
      };
    } else {
      setShouldShowResults(false);
    }
  }, [inputValue, showResults]);

  return (
    <div className="App">
      <img
        src="https://19498232.fs1.hubspotusercontent-na1.net/hubfs/19498232/deel-logo-blue.svg"
        alt="Deel"
      />
      <div className="search-wrapper">
        <label>User search</label>
        <div className="input-wrapper">
          <input
            type="text"
            value={inputValue}
            placeholder="Type to search for the user"
            onChange={(event) => {
              setInputValue(event.target.value);
              setShouldShowResults(true);
            }}
          />
          <div className="input-suffix">{showLoader && <Loader />}</div>
        </div>

        {showResults && searchResults.length > 0 && (
          <div className="results">
            {searchResults.map((item) => (
              <SearchItem
                key={item.id + item.name}
                {...item}
                onClick={selectItem}
                phrase={inputValue}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
