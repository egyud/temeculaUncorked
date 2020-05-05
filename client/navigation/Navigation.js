import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Home from '../screens/Home'
import ClubComparison from '../screens/ClubComparison'
import WineryList from '../screens/WineryList'
import WineryScreen from '../screens/WineryScreen'
import EventsScreen from '../screens/EventsScreen'
import EventScreen from '../screens/EventScreen'
import ProfileScreen from '../screens/ProfileScreen'
import WineSearch from '../screens/WineSearch'
import ReviewScreen from '../screens/ReviewScreen'
import Gallery from '../screens/Gallery'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import PostCommentScreen from '../screens/PostCommentScreen'
import PostReviewScreen from '../screens/PostReviewScreen'
import WineScreen from '../screens/WineScreen'
import AccountScreen from '../screens/AccountScreen'
import ClubListScreen from '../screens/ClubListScreen'
import ClubScreen from '../screens/ClubScreen'
import PhotoPickerScreen from '../screens/PhotoPickerScreen'

const StackNavigator = createStackNavigator({
  Home: { 
    screen: Home
  },
  Comparison: {
    screen: ClubComparison
  },
  WineryList: {
    screen: WineryList
  },
  Events: {
    screen: EventsScreen
  },
  Profile: {
    screen: ProfileScreen
  },
  Winery: {
    screen: WineryScreen
  },
  Event: {
    screen: EventScreen
  },
  WineSearch: {
    screen: WineSearch
  },
  Review: {
    screen: ReviewScreen
  },
  Gallery: {
    screen: Gallery
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
    screen: AccountScreen
  },
  ClubList: {
    screen: ClubListScreen
  },
  Club: {
    screen: ClubScreen
  },
  PhotoPicker: {
    screen: PhotoPickerScreen
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
    screen: ProfileScreen
  },
  Event: {
    screen: EventScreen
  },
  Gallery: {
    screen: Gallery
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
  Comparison: {
    screen: ClubComparison
  },
})

const AccountNav = createStackNavigator({
  Account: {
    screen: AccountScreen
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
  Wineries: {
    screen: SearchNav
  },
  Clubs: {
    screen: ClubNav
  },
  Account: {
    screen: AccountNav
  }
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#fcf1d2',
    },
    activeTintColor: '#620014'
  }
})

export default StackNav = createAppContainer(TabNavigator)