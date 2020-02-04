import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Home from '../pages/Home/Home'
import WineClubsPage from '../pages/WineClubsPage/WineClubsPage'
import WineryList from '../pages/WineryList/WineryList'
import WineryPage from '../pages/WineryPage/WineryPage'
import EventsPage from '../pages/EventsPage/EventsPage'
import EventPage from '../pages/EventPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import WineSearch from '../pages/WineSearch/WineSearch'
import ReviewScreen from '../pages/ReviewScreen'
import ImageGallery from '../pages/ImageGallery'
import LoginScreen from '../pages/LoginScreen'
import RegisterScreen from '../pages/RegisterScreen'
import PostCommentScreen from '../pages/PostCommentScreen'
import PostReviewScreen from '../pages/PostReviewScreen'

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
  },
  Review: {
    screen: ReviewScreen
  },
  Gallery: {
    screen: ImageGallery
  },
  Register: {
    screen: RegisterScreen
  },
  Login: {
    screen: LoginScreen
  },
  NewComment: {
    screen: PostCommentScreen
  },
  NewReview: {
    screen: PostReviewScreen
  }
},
{
  initialRouteName: 'Home',
})

const SearchNav = createStackNavigator({
  WineryList: {
    screen: WineryList
  },
  Review: {
    screen: ReviewScreen
  },
  Profile: {
    screen: ProfilePage
  },
  Event: {
    screen: EventPage
  },
  Gallery: {
    screen: ImageGallery
  },
  NewComment: {
    screen: PostCommentScreen
  },
  NewReview: {
    screen: PostReviewScreen
  }
})

const ClubNav = createStackNavigator({
  WineClubs: {
    screen: WineClubsPage
  }
})

const AccountNav = createStackNavigator({
  Register: {
    screen: RegisterScreen
  },
  Login: {
    screen: LoginScreen
  }
})

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: StackNavigator,
  },
  Search: {
    screen: SearchNav
  },
  Clubs: {
    screen: ClubNav
  },
  Account: {
    screen: AccountNav
  }
})

export default StackNav = createAppContainer(TabNavigator)