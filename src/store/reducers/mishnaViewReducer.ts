import { excerptInSubline } from "../../inc/excerptUtils";
import { iSubline } from "../../types/types";
import {
  FILTER_EXCERPTS_BY_LINES,
  REQUEST_START,
  SELECT_EXCERPT,
  SELECT_SUBLINES,
  SET_EXCERPT_POPUP,
  TOGGLE_DIVIDE_TO_LINES,
  TOGGLE_SHOW_SOURCES,
  TOGGLE_SHOW_PUNCTUATION,
} from "../actions/mishnaViewActions";
import {
  RECEIVE_MISHNA,
  SET_CURRENT_MISHNA,
} from "../actions/navigationActions";
interface ViewState {
  loading: boolean;
  selectedSublines: iSubline[];
  excerpts: any;
  filteredExcerpts: any;
  expanded: boolean;
  selectedExcerpt: null;
  detailsExcerptPopup: boolean;
  divideToLines: boolean;
  showPunctuation: boolean;
  showSources: boolean;
}

const initialState: ViewState = {
  loading: false,
  selectedSublines: [],
  excerpts: [],
  filteredExcerpts: [],
  expanded: false,
  selectedExcerpt: null,
  detailsExcerptPopup: false,
  divideToLines: true,
  showPunctuation: true,
  showSources: true,
};

const mishnaViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_MISHNA:
      const excerpts = action.currentMishna?.excerpts?.sort(
        (a, b) => a.selection.fromLine - b.selection.fromLine
      );
      return {
        ...state,
        excerpts,
        filteredExcerpts: action.currentMishna?.excerpts,
      };
    case REQUEST_START:
      return { ...state, loading: true };
    case RECEIVE_MISHNA:
      return { ...state, currentMishna: action.currentMishna, loading: false };
    case SELECT_SUBLINES:
      return {
        ...state,
        selectedSublines: action.selectedSublines,
      };
    case SELECT_EXCERPT:
      return {
        ...state,
        selectedExcerpt: action.excerpt,
        detailsExcerptPopup: action.excerpt !== null,
      };
    case SET_EXCERPT_POPUP:
      return { ...state, detailsExcerptPopup: action.detailsExcerptPopup };
    case TOGGLE_SHOW_PUNCTUATION:
      return { ...state, showPunctuation: !state.showPunctuation };
    case TOGGLE_DIVIDE_TO_LINES:
      const newDivideToLines = !state.divideToLines;
      return {
        ...state,
        divideToLines: newDivideToLines,
        showPunctuation: newDivideToLines ? state.showPunctuation : false,
      };
    case TOGGLE_SHOW_SOURCES:
      return { ...state, showSources: !state.showSources };
    case FILTER_EXCERPTS_BY_LINES:
      const selectedSublines = action?.selectedSublines;
      debugger;
      const newExcerpts = selectedSublines.length > 0
        ? state.excerpts.filter((excerpt) => {
          return selectedSublines!.some(subline => excerptInSubline(excerpt, subline))
          })
        : state.excerpts;

      return {
        ...state,
        filteredExcerpts: newExcerpts,
        expanded: action.selectedSublineData,
      };
    default:
      return state;
  }
};
export default mishnaViewReducer;
