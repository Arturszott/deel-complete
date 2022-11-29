import { SearchItemType } from "./types";

import "./SearchItem.css";

interface SearchItemProps extends SearchItemType {
  onClick: (name: string) => void;
  phrase: string;
}

function SearchItem({ name, phrase, onClick }: SearchItemProps) {
  const phraseIndex = name.toLowerCase().indexOf(phrase.toLowerCase());

  const prefix = phraseIndex !== -1 ? name.slice(0, phraseIndex) : "";
  const suffix =
    phraseIndex !== -1 ? name.slice(phraseIndex + phrase.length) : "";
  const highlighted =
    phraseIndex !== -1
      ? name.slice(phraseIndex, phraseIndex + phrase.length)
      : "";

  if (!name.toLowerCase().includes(phrase.toLowerCase())) return null;

  return (
    <div className="searchItem" onClick={() => onClick(name)}>
      {prefix}
      <span className="searchItem-highlight">{highlighted}</span>
      {suffix}
    </div>
  );
}

export default SearchItem;
