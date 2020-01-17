import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../pages/Home/Home'
import WineClubsPage from '../pages/WineClubsPage/WineClubsPage'
import WineryList from '../pages/WineryList/WineryList'
import WineryPage from '../pages/WineryPage/WineryPage'
import EventsPage from '../pages/EventsPage/EventsPage'
import EventPage from '../pages/EventPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import WineSearch from '../pages/WineSearch/WineSearch'

const StackNavigator = createStackNavigator({
  Home: { 
    screen: Home
  },
  WineClubs: {
    screen: WineClubsPage
  },
  WineryList: {
    screen: WineryList
  },
  Events: {
    screen: EventsPage
  },
  Profile: {
    screen: ProfilePage
  },
  Winery: {
    screen: WineryPage
  },
  Event: {
    screen: EventPage
  },
  WineSearch: {
    screen: WineSearch
  }
},
{
  initialRouteName: 'Home',
})

export default StackNav = createAppContainer(StackNavigator)