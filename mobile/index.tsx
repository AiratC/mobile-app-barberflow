import { registerRootComponent } from 'expo';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';


const ReduxStore = () => {
   return (
      <Provider store={store}>
         <App />
      </Provider>
   )
};

registerRootComponent(ReduxStore);
