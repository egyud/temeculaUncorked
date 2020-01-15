import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Drawer } from 'native-base'
import { NativeRouter, Route, Link } from 'react-router-native'
import HeaderBar from './components/HeaderBar/HeaderBar'
import SideBar from './components/SideBar/SideBar'
import Home from './pages/Home/Home'
import WineClubsPage from './pages/WineClubsPage/WineClubsPage'
import WineryList from './pages/WineryList/WineryList'
import WineryPage from './pages/WineryPage/WineryPage'
import EventsPage from './pages/EventsPage/EventsPage'
import EventPage from './pages/EventPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import WineSearch from './pages/WineSearch/WineSearch'

export default App = () => {
  return (
    <NativeRouter>
      <Container>
        <HeaderBar title='Uncorked'/>
        <Content>
          <Route exact path="/" component={Home}/>
          <Route path="/winery/:name" component={WineryPage} />
          <Route path="/wineClubs" component={WineClubsPage}/>
          <Route path="/profile/:userId" component={ProfilePage}/>
          <Route path="/wineryList" component={WineryList}/>
          <Route path="/eventsPage" component={EventsPage}/>
          <Route path="/event/:eventId" component={EventPage}/>
          <Route path="/wineList" component={WineSearch}/>
        </Content>
      </Container>
    </NativeRouter>
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
