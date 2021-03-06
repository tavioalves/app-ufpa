import {
  ROUTE_INFO,
  MARK_LOCAL,
  LOADING_ROUTE,
  CREATING_ROUTE,
  SEARCHED_LOCAL,
  SEARCHING_LOCAL,
  RETRIEVE_LOCAIS,
  RETRIVING_LOCAIS,
  CLEAR_INPUT_SEARCH,
  CLOSE_ERROR_MESSAGE,
  CLOSE_HELPER_MESSAGE,
  CREATE_ROUTE_SUCCESS,
  ERROR_CREATING_ROUTE,
  INPUT_SEARCH_UNFOCUSED,
  SEARCHED_USER_LOCALIZATION,
  SEARCHING_USER_LOCALIZATION,
} from '../actions/types';

const INITIAL_STATE = {
  error: false,  
  helper: true,
  loading: true,
  showRoute: false,
  creatingRoute: false,
  inputSearchFocused: false,
  locais: [],
  locaisAchados: [],
  infoRoute: {},
  localMarcado: {},
  localizacaoUsuario: {},
  errorMessage: '',
  localPesquisado: '',
  localSendoPesquisado: '',
  helperMessage: 'Confira todos os locais do campus na UFPa, gere rotas e facilite sua locomoção com o Connect.'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MARK_LOCAL:
      return {
        ...state,
        helper: true,
        infoRoute: {},
        locaisAchados: [],
        localPesquisado: '',
        localMarcado: action.payload,
        localSendoPesquisado: action.payload.nome,
        helperMessage:
          'Clique no botão para gerar uma rota ao local pesquisado.',
      };
    case ERROR_CREATING_ROUTE:
      return {
        ...state,
        error: true,
        helper: false,
        showRoute: false,
        routeCreated: false,
        creatingRoute: false,
        errorMessage:
          'Por favor, pesquise um local desejado antes de tentar criar uma rota.',
      };
    case CLEAR_INPUT_SEARCH:
      return {
        ...state,
        infoRoute: {},
        localMarcado: {},
        locaisAchados: [],
        localPesquisado: '',
        localSendoPesquisado: '',
        helper: false,
        showRoute: false,
        creatingRoute: false,
        inputSearchFocused: false,
      };
    case RETRIEVE_LOCAIS:
      return {
        ...state,
        loading: false,
        locais: Object.values(action.payload),
      };
    case SEARCHING_LOCAL:
      return {
        ...state,        
        error: false,
        helper: false,
        creatingRoute: false,
        inputSearchFocused: true,
        infoRoute: {},
        localMarcado: {},
        locaisAchados: [],
        localPesquisado: action.payload,
        localSendoPesquisado: action.payload.nome,
      };
    case SEARCHED_LOCAL:
      return {
        ...state,
        infoRoute: {},
        localMarcado: {},
        localPesquisado: '',
        locaisAchados: action.payload,
      };
    case RETRIVING_LOCAIS:
      return { ...state, loading: true };
    case LOADING_ROUTE:
      return { ...state, creatingRoute: true };
    case CREATING_ROUTE:
      return { ...state, showRoute: true, error: false, helper: false };
    case CREATE_ROUTE_SUCCESS:
      return { ...state, creatingRoute: false };
    case INPUT_SEARCH_UNFOCUSED:
      return { ...state, inputSearchFocused: false };
    case ROUTE_INFO:
      return { ...state, infoRoute: action.payload };
    case SEARCHING_USER_LOCALIZATION:
      return { ...state };
    case SEARCHED_USER_LOCALIZATION:
      return { ...state, localizacaoUsuario: action.payload };
    case CLOSE_ERROR_MESSAGE:
      return { ...state, error: false };
    case CLOSE_HELPER_MESSAGE:
      return { ...state, helper: false };
    default:
      return state;
  }
};
