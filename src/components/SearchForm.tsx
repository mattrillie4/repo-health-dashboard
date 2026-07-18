"use client";

import { useState } from "react";
import type { Repo } from "@/lib/types";

// The search form will handle the user inputting the desired owner and repo, and will then pass
// the info to other components to display and handle data
// Most basic form will just require user to type the full owner and repo, no filters
type SearchFormProps = {
  onSearch: (repoInput: string, ownerInput: string) => void;
};

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [repoInput, setRepoInput] = useState("");
  const [ownerInput, setOwnerInput] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(repoInput, ownerInput);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={repoInput}
        onChange={(e) => setRepoInput(e.target.value)}
        placeholder="Repo"
      ></input>
      <input
        value={ownerInput}
        onChange={(e) => setOwnerInput(e.target.value)}
      ></input>
      <button type="submit">Search</button>
    </form>
  );
}
