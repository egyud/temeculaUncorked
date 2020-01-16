import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Drawer } from 'native-base'
// import HeaderBar from './components/HeaderBar/HeaderBar'
// import SideBar from './components/SideBar/SideBar'
import Home from './pages/Home/Home'
import WineClubsPage from './pages/WineClubsPage/WineClubsPage'
import WineryList from './pages/WineryList/WineryList'
import WineryPage from './pages/WineryPage/WineryPage'
import EventsPage from './pages/EventsPage/EventsPage'
import EventPage from './pages/EventPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import WineSearch from './pages/WineSearch/WineSearch'
// import DrawerNavigator from './navigation/Navigation'
import StackNav from './navigation/Navigation'

export default App = () => {
  return (
    <StackNav />
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

// export default StackNavigator({
//   Home: {
//     screen: Home
//   },
//   Events: {
//     screen: EventsPage
//   },
//   WineClubs: {
//     screen: WineClubsPage
//   }
// })
