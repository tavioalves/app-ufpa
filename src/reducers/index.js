import { combineReducers } from 'redux';
import CreateUserReducer from './CreateUserReducer';
import LoginReducer from './LoginReducer';
import ForgotPasswordReducer from './ForgotPasswordReducer';
import LocalizacaoReducer from './LocalizacaoReducer';
import EventoReducer from './EventoReducer';

export default combineReducers({
   createUser: CreateUserReducer,
   login: LoginReducer,
   forgotPassword: ForgotPasswordReducer,
   localizacao: LocalizacaoReducer,
   evento: EventoReducer
});
