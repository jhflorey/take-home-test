import { createSelector } from "@reduxjs/toolkit";

export const repoListSelector = createSelector(
  (state) => state.repoLists,
  (state) => state.isLoadingRepoLists,
  (repoLists, isLoadingRepoLists) => ({
    isLoadingRepoLists,
    repoLists,
  })
);

export const repoCommitsListSelector = createSelector(
  (state) => state.repoCommits,
  (state) => state.isLoadingRepoCommits,
  (repoCommits, isLoadingRepoCommits) => ({
    isLoadingRepoCommits,
    repoCommits,
  })
);
