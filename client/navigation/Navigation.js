import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Home from '../pages/Home'
import WineClubsPage from '../pages/WineClubsPage'
import WineryList from '../pages/WineryList'
import WineryPage from '../pages/WineryPage'
import EventsPage from '../pages/EventsPage'
import EventPage from '../pages/EventPage'
import ProfilePage from '../pages/ProfilePage'
import WineSearch from '../pages/WineSearch'
import ReviewScreen from '../pages/ReviewScreen'
import ImageGallery from '../pages/ImageGallery'
import LoginScreen from '../pages/LoginScreen'
import RegisterScreen from '../pages/RegisterScreen'
import PostCommentScreen from '../pages/PostCommentScreen'
import PostReviewScreen from '../pages/PostReviewScreen'
import WineScreen from '../pages/WineScreen'
import AccountPage from '../pages/AccountPage'
import UploadPhotoScreen from '../pages/UploadPhotoScreen'

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
  },
  Wine: {
    screen: WineScreen
  },
  Account: {
    screen: AccountPage
  },
  UploadPhoto: {
    screen: UploadPhotoScreen
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
  },
  Wine: {
    screen: WineScreen
  }
})

const ClubNav = createStackNavigator({
  WineClubs: {
    screen: WineClubsPage
  }
})

const AccountNav = createStackNavigator({
  Account: {
    screen: AccountPage
  },
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