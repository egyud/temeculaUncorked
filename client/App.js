import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Container, Content } from 'native-base'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import StackNav from './navigation/Navigation'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default App = () => {
  return (
    <Provider store={store}>
      <Container>
        <StackNav />
      </Container>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});