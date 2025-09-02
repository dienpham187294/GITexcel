import { useState } from "react";
import bangantu from "../ulti/filedulieu/3000tuthongdung/tuvung3000thongdungJSON.json";

// Constants moved to separate objects for better organization
const CONSTANTS = {
  sounds44: [
    "ɪ",
    "i",
    "iː",
    "ʊ",
    "uː",
    "e",
    "ɛ",
    "ə",
    "ɜː",
    "ɒ",
    "ɔː",
    "æ",
    "ʌ",
    "ɑː",
    "ɪə",
    "ʊə",
    "eə",
    "eɪ",
    "ɔɪ",
    "aɪ",
    "əʊ",
    "aʊ",
    "p",
    "b",
    "t",
    "d",
    "ʧ",
    "ʤ",
    "k",
    "g",
    "f",
    "v",
    "ð",
    "θ",
    "s",
    "z",
    "ʃ",
    "m",
    "n",
    "ŋ",
    "l",
    "r",
    "w",
    "h",
    "j",
  ],

  partsOfSpeech: [
    "-",
    " v.",
    "adj",
    "n.",
    "adv",
    "prep",
    "conj",
    "det",
    "pron",
    "exclamation",
  ],

  engLetters: [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "ae",
    "ce",
    "se",
    "ea",
    "oa",
    "ue",
    "oi",
    "oo",
  ],

  countOptions: Array.from({ length: 21 }, (_, i) => i),
};

// Utility Components
const FilterSection = ({ title, description, children }) => (
  <div className="mb-4">
    <h5 className="fw-bold text-primary">
      <i>{title}</i>
    </h5>
    <p className="text-muted small mb-2">{description}</p>
    {children}
  </div>
);

const SelectableButton = ({
  item,
  isSelected,
  onClick,
  className = "btn btn-outline-secondary btn-sm me-1 mb-1",
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`${className} ${isSelected ? "btn-warning" : ""}`}
    style={{
      minWidth: "45px",
      backgroundColor: isSelected ? "#ffc107" : "transparent",
    }}
  >
    {item}
  </button>
);

const NumberSelector = ({ options, selected, onSelect }) => (
  <div className="d-flex flex-wrap gap-1">
    {options.map((num) => (
      <SelectableButton
        key={num}
        item={num}
        isSelected={num === selected}
        onClick={() => onSelect(num)}
        className="btn btn-outline-primary btn-sm"
      />
    ))}
  </div>
);

const MultiSelector = ({ options, selected, onToggle, onClear }) => (
  <div>
    <div className="d-flex flex-wrap gap-1 mb-2">
      {options.map((item, index) => (
        <SelectableButton
          key={index}
          item={item}
          isSelected={selected.includes(item)}
          onClick={() => onToggle(item)}
        />
      ))}
    </div>
    {selected.length > 0 && (
      <button
        type="button"
        onClick={onClear}
        className="btn btn-outline-danger btn-sm"
      >
        Clear All ({selected.length})
      </button>
    )}
  </div>
);

const WordsTable = ({ words }) => {
  if (!words?.length) {
    return (
      <div className="alert alert-info">
        <i className="bi bi-info-circle me-2"></i>
        No words match your criteria. Please adjust your filters.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>IPA UK</th>
            <th>IPA US</th>
            <th>Word</th>
            <th>Part of Speech</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word, index) => (
            <tr key={index}>
              <td className="font-monospace text-primary fw-bold">
                {word.ipaUK}
              </td>
              <td className="font-monospace text-secondary fw-bold">
                {word.ipaUS}
              </td>
              <td className="fw-bold text-dark">{word.word}</td>
              <td className="text-success">{word.partsOfSpeech}</td>
              <td className="text-muted">{word.mean}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main Component
export default function LayIPASort() {
  // State management
  const [filteredWords, setFilteredWords] = useState(bangantu);
  const [minLength, setMinLength] = useState(0);
  const [maxLength, setMaxLength] = useState(4);
  const [requiredSounds, setRequiredSounds] = useState([]);
  const [excludedSounds, setExcludedSounds] = useState([]);
  const [requiredPartsOfSpeech, setRequiredPartsOfSpeech] = useState([]);
  const [requiredLetters, setRequiredLetters] = useState([]);

  // Filter logic
  const applyFilters = () => {
    const filtered = bangantu.filter((word) => {
      // Length filters
      if (word.len < minLength || word.len > maxLength) return false;

      // Required sounds
      if (requiredSounds.some((sound) => !word.ipaUK.includes(sound)))
        return false;

      // Excluded sounds
      if (excludedSounds.some((sound) => word.ipaUK.includes(sound)))
        return false;

      // Required parts of speech
      if (
        requiredPartsOfSpeech.some((pos) => !word.partsOfSpeech.includes(pos))
      )
        return false;

      // Required letters
      if (
        requiredLetters.some(
          (letter) => !word.word.toLowerCase().includes(letter)
        )
      )
        return false;

      return true;
    });

    setFilteredWords(filtered);
  };

  // Toggle functions for multi-selectors
  const toggleArrayItem = (array, setter, item) => {
    const newArray = array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
    setter(newArray);
  };

  const handlePractice = () => {
    if (filteredWords.length === 0) {
      alert("No words selected for practice!");
      return;
    }
    // Practice logic here
    console.log("Practice with:", filteredWords);
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-4 text-primary">
            IPA Word Filter & Practice Tool
          </h2>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h4 className="card-title mb-3">Filters</h4>

              <div className="row">
                <div className="col-md-6">
                  <FilterSection
                    title="Minimum Character Count"
                    description="Choose the lowest number of characters"
                  >
                    <NumberSelector
                      options={CONSTANTS.countOptions}
                      selected={minLength}
                      onSelect={setMinLength}
                    />
                  </FilterSection>
                </div>

                <div className="col-md-6">
                  <FilterSection
                    title="Maximum Character Count"
                    description="Choose the highest number of characters"
                  >
                    <NumberSelector
                      options={CONSTANTS.countOptions}
                      selected={maxLength}
                      onSelect={setMaxLength}
                    />
                  </FilterSection>
                </div>
              </div>

              <FilterSection
                title="Required IPA Sounds"
                description="Select IPA sounds that must appear in words"
              >
                <MultiSelector
                  options={CONSTANTS.sounds44}
                  selected={requiredSounds}
                  onToggle={(item) =>
                    toggleArrayItem(requiredSounds, setRequiredSounds, item)
                  }
                  onClear={() => setRequiredSounds([])}
                />
              </FilterSection>

              <FilterSection
                title="Excluded IPA Sounds"
                description="Select IPA sounds to exclude from words"
              >
                <MultiSelector
                  options={CONSTANTS.sounds44}
                  selected={excludedSounds}
                  onToggle={(item) =>
                    toggleArrayItem(excludedSounds, setExcludedSounds, item)
                  }
                  onClear={() => setExcludedSounds([])}
                />
              </FilterSection>

              <FilterSection
                title="Parts of Speech"
                description="Select required word types"
              >
                <MultiSelector
                  options={CONSTANTS.partsOfSpeech}
                  selected={requiredPartsOfSpeech}
                  onToggle={(item) =>
                    toggleArrayItem(
                      requiredPartsOfSpeech,
                      setRequiredPartsOfSpeech,
                      item
                    )
                  }
                  onClear={() => setRequiredPartsOfSpeech([])}
                />
              </FilterSection>

              <FilterSection
                title="Required Letters"
                description="Select letters that must appear in words"
              >
                <MultiSelector
                  options={CONSTANTS.engLetters}
                  selected={requiredLetters}
                  onToggle={(item) =>
                    toggleArrayItem(requiredLetters, setRequiredLetters, item)
                  }
                  onClear={() => setRequiredLetters([])}
                />
              </FilterSection>

              <div className="d-flex gap-2 mt-4">
                <button className="btn btn-primary" onClick={applyFilters}>
                  <i className="bi bi-funnel me-1"></i>
                  Apply Filters ({filteredWords.length} words)
                </button>

                {/* <button
                  className="btn btn-success"
                  onClick={handlePractice}
                  disabled={filteredWords.length === 0}
                >
                  <i className="bi bi-play-circle me-1"></i>
                  Start Practice
                </button> */}
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-header">
              <h4 className="card-title mb-0">
                Filtered Words ({filteredWords.length})
              </h4>
            </div>
            <div className="card-body p-0">
              <WordsTable words={filteredWords} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
