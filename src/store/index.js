import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import services from './services';
import { routerMiddleware } from 'react-router-redux';

const browserHistory = createBrowserHistory();
const middleware = routerMiddleware(browserHistory);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    process.env.NODE_ENV === 'production' ? applyMiddleware(
        middleware,
        sagaMiddleware
    ) : compose(applyMiddleware(
        middleware,
        sagaMiddleware
    ), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : NOOP => NOOP )
);

services.forEach(service => sagaMiddleware.run(service));

export default store;