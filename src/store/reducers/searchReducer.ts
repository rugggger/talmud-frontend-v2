import { SEARCH_TEXT } from '../actions/searchActions';

const initialState = {
  searchResults: [],
};

export interface ISearchResult {
  guid: string;
  mainLine: string;
  lineNumber: string;
}

export interface SearchState {
  searchResults: ISearchResult[];
}

export const searchReducer = (state = initialState, action): SearchState => {
  switch (action.type) {
    case SEARCH_TEXT:
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};
