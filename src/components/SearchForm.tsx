"use client";

import { useState } from "react";

// The search form will handle the user inputting the desired owner and repo, and will then pass
// the info to other components to display and handle data
// Most basic form will just require user to type the full owner and repo, no filters
type SearchFormProps = {
  onSearch: (repoInput: string, ownerInput: string) => void;
};

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [repoInput, setRepoInput] = useState("");
  const [ownerInput, setOwnerInput] = useState("");
  const [validationError, setValidationError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // input validation before searching
    const owner = ownerInput.trim();
    const repo = repoInput.trim();

    if (!owner || !repo) {
      setValidationError("Enter both an owner and repository name");
      return;
    }
    if (owner.includes("/") || repo.includes("/")) {
      setValidationError(
        "Enter the owner and repository separately without slashes",
      );
      return;
    }
    setValidationError(""); // reset error message if input is okay
    onSearch(repoInput, ownerInput);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={ownerInput}
        onChange={(e) => setOwnerInput(e.target.value)}
        placeholder="Owner"
        aria-label="Repository owner"
        required
        maxLength={100}
      ></input>
      <input
        value={repoInput}
        onChange={(e) => setRepoInput(e.target.value)}
        placeholder="Repo"
        aria-label="Repository name"
        required
        maxLength={100}
      ></input>

      <button type="submit">Search</button>

      {validationError && (
        <p role="alert" className="text-sm text-red-600">
          {validationError}
        </p>
      )}
    </form>
  );
}
