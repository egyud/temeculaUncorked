import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Container } from 'native-base'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import StackNav from './navigation/Navigation'
import FlashMessage from 'react-native-flash-message'
import ErrorBoundary from 'react-native-error-boundary'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Container style={styles.container}>
          <StackNav />
          <FlashMessage position="top"/>
        </Container>
      </Provider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});