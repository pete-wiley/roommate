import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { Avatar, Header, Button, ListItem } from 'react-native-elements'

export default class AddItem extends React.Component {
    static navigationOptions = {
        title: 'Add an Item',
        headerStyle: {
            backgroundColor: '#58a6e2'
        },
        headerTintColor: 'white'
    }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#58a6e2' }}>

        <Text style={{ color: 'white', fontSize: 24, alignSelf: 'center', top: 100 }}>What would you like to add?</Text>

        <View style={{flexDirection: 'row', top: 400, justifyContent: 'space-evenly'}}>
          <Button
            title="A Bill"
            onPress={() => this.props.navigation.navigate('AddBill')}
            containerStyle={{
              width: 100
            }}
            buttonStyle={{
              borderRadius: 20,
              backgroundColor: "#E6C229",
              borderColor: "white",
              borderWidth: 1
            }}
          />
          <Button
            title="An IOU"
            onPress={() => this.props.navigation.navigate('AddIOU')}
            containerStyle={{
              width: 100
            }}
            buttonStyle={{
              borderRadius: 20,
              backgroundColor: "#E6C229",
              borderColor: "white",
              borderWidth: 1
            }}
          />
          <Button
            title="A Chore"
            onPress={() => this.props.navigation.navigate('AddChore')}
            containerStyle={{
              width: 100
            }}
            buttonStyle={{
              borderRadius: 20,
              backgroundColor: "#E6C229",
              borderColor: "white",
              borderWidth: 1
            }}
          />
        </View>

        <View style={{flexDirection: 'row', top: 425, justifyContent: 'space-evenly'}}>
          <Button
            title="Reminder"
            onPress={() => this.props.navigation.navigate('AddReminder')}
            containerStyle={{
              width: 100
            }}
            buttonStyle={{
              borderRadius: 20,
              backgroundColor: "#E6C229",
              borderColor: "white",
              borderWidth: 1
            }}
          />
          <Button
            title="Shopping"
            onPress={() => this.props.navigation.navigate('AddShopping')}
            containerStyle={{
              width: 100
            }}
            buttonStyle={{
              borderRadius: 20,
              backgroundColor: "#E6C229",
              borderColor: "white",
              borderWidth: 1
            }}
          />
        </View>
      </View>
    )
  }
}