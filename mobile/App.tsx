import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainAppContent from './screens/MainAppContent/MainAppContent';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MainAppContent />
      <Toast/>
    </GestureHandlerRootView>
  );
}


export default App;
