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

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
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
    <form onSubmit={handleSubmit} className="mt-8 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto] sm:p-5">
      <input
        value={ownerInput}
        onChange={(e) => setOwnerInput(e.target.value)}
        placeholder="Owner"
        aria-label="Repository owner"
        required
        maxLength={100}
        className="min-w-0 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
      ></input>
      <input
        value={repoInput}
        onChange={(e) => setRepoInput(e.target.value)}
        placeholder="Repo"
        aria-label="Repository name"
        required
        maxLength={100}
        className="min-w-0 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
      ></input>

      <button type="submit" className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900">Search</button>

      {validationError && (
        <p role="alert" className="text-sm text-red-600 sm:col-span-3">
          {validationError}
        </p>
      )}
    </form>
  );
}
