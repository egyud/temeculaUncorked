import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Drawer } from 'native-base'
import HeaderBar from './components/HeaderBar/HeaderBar'
import SideBar from './components/SideBar/SideBar'
import Home from './pages/Home/Home'

export default function App() {
  return (
    <Container>
      <HeaderBar />
      <Content>
        <View>
          <Home />
          
        </View>
        <View>
          {/* reviewList */}
        </View>
      </Content>
    </Container>
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
