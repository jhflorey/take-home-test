import axios from "axios";
import {
  FETCH_REPO_COMMITS_FINISH,
  FETCH_REPO_COMMITS_LOADING,
  FETCH_REPO_LIST_FINISH,
  FETCH_REPO_LIST_LOADING,
} from "./actions";

const initialState = {
  repoLists: [],
  isLoadingRepoLists: false,
  repoCommits: [],
  isLoadingRepoCommits: false,
};

export const getRepoList = (page) => async (dispatch) => {
  dispatch({ type: FETCH_REPO_LIST_LOADING });
  const response = await axios.get(
    `https://api.github.com/orgs/Netflix/repos?sort=updated&page=${page}&per_page=10`,
    {
      headers: {
        Authorization: "token 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",
      },
    }
  );
  dispatch({ type: FETCH_REPO_LIST_FINISH, data: response.data });
};

export const getRepoDetails = (name, page = 1) => async (dispatch) => {
  dispatch({ type: FETCH_REPO_COMMITS_LOADING });
  const response = await axios.get(
    `https://api.github.com/repos/Netflix/${name}/commits?page=${page}`
  );
  dispatch({ type: FETCH_REPO_COMMITS_FINISH, data: response.data });
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_REPO_LIST_LOADING:
      return { ...state, isLoadingRepoLists: true };
    case FETCH_REPO_LIST_FINISH:
      return {
        ...state,
        isLoadingRepoLists: false,
        repoLists: action.data,
      };
    case FETCH_REPO_COMMITS_LOADING:
      return { ...state, isLoadingRepoCommits: true };
    case FETCH_REPO_COMMITS_FINISH:
      return {
        ...state,
        isLoadingRepoCommits: false,
        repoCommits: action.data,
      };
    default:
      return state;
  }
}
