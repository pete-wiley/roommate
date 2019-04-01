import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { Avatar, Header, Button, ListItem, Input} from 'react-native-elements'
import { createStackNavigator, createAppContainer } from "react-navigation";
import AddBill from './screens/AddBill'
import AddItem from './screens/AddItem'
import Home from './screens/Home'
import AddIOU from './screens/AddIOU'
import AddChore from './screens/AddChore'
import AddReminder from './screens/AddReminder'
import AddShopping from './screens/AddShopping'



const AppNavigator = createStackNavigator(
  {
    Home: Home,
    AddItem: AddItem,
    AddBill: AddBill,
    AddIOU: AddIOU,
    AddChore: AddChore,
    AddReminder: AddReminder,
    AddShopping: AddShopping
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator);