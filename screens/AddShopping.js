import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native'
import { Avatar, Header, Button, ListItem, Input, ButtonGroup } from 'react-native-elements'

export default class AddShopping extends React.Component {
    static navigationOptions = {
        title: 'Shopping List Item',
        headerStyle: {
            backgroundColor: '#58a6e2'
        },
        headerTintColor: 'white'
    }

    constructor(props) {
        super(props)
        this.state = {
            type: 'shopping',
            title: '',
            date: "2019-03-29",
            isRotating: 1,
            repeatInterval: 'never',
            nextBuyer: 'peteid'
        }
        this.updateIsRotating = this.updateIsRotating.bind(this)
    }

    updateIsRotating(isRotating) {
        this.setState({ isRotating })
    }

    addShopping = async () => {
        try {
            let response = await fetch('https://roommate-api-v3.herokuapp.com/items', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: this.state.type,
                    date: this.state.date,
                    title: this.state.title,
                    isRotating: this.state.isRotating,
                    repeatInterval: this.state.repeatInterval,
                    nextBuyer: this.state.nextBuyer,
                })
            })
            let res = await response.json();
            if (res.errors) {
                this.setState({ errors: res.errors });
            } else {
                // let accessToken = res.token;
                // this.storeToken(accessToken);
                this.props.navigation.navigate('Home');
            }
        } catch (errors) {
            console.log('catch err');
            console.log(errors);
        }
    }

    render() {
        const rotatingButtons = ['No', 'Yes']
        const { isRotating } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: '#58a6e2' }}>
                <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Input
                        inputContainerStyle={{
                            // top: 100,
                            //paddingTop: 5,
                            //paddingBottom: 5,
                            paddingLeft: 10,
                            paddingRight: 10,
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 30
                        }}
                        containerStyle={{
                            paddingTop: 150,
                            paddingLeft: 30,
                            paddingRight: 30,
                            paddingBottom: 20
                        }}
                        placeholder='What are we shopping for?'
                        onChangeText={(title) => this.setState({title})}
                    />

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly" }}>
                        <Text>
                            Will we rotate who buys this item?
                        </Text>
                        <ButtonGroup
                            onPress={this.updateIsRotating}
                            selectedIndex={isRotating}
                            buttons={rotatingButtons}
                            containerStyle={{ height: 40, width: 150 }}
                        />
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly" }}>
                        <Text>
                            How often will this reminder repeat?
                        </Text>
                        <Picker
                            selectedValue={this.state.repeatInterval}
                            style={{ height: 50, width: 150,}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ repeatInterval: itemValue })
                            }>
                            <Picker.Item label="Never" value="never" />
                            <Picker.Item label="Every week" value="week" />
                            <Picker.Item label="Every two weeks" value="twoweeks" />
                            <Picker.Item label="Every month" value="month" />
                        </Picker>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly" }}>
                        <Text>
                            Who is buying this now?
                        </Text>
                        <Picker
                            selectedValue={this.state.nextBuyer}
                            style={{ height: 50, width: 150,}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ nextBuyer: itemValue })
                            }>
                            <Picker.Item label="Pete" value="peteid" />
                            <Picker.Item label="Savannah" value="savid" />
                            <Picker.Item label="Ashley" value="ashid" />
                        </Picker>
                    </View>
                </View>
                <View style={{ position: 'absolute', bottom: 60, right: 0 }}>
                    <Button
                        title="Add Item"
                        onPress={() => 
                            this.addShopping()}
                        containerStyle={{
                            height: 30,
                            width: 120,
                            borderRadius: 20,
                            position: 'absolute',
                            right: 12,
                            //top: 700
                            
                        }}
                        buttonStyle={{
                            borderRadius: 20,
                            backgroundColor: "#509f67",
                            borderColor: "white",
                            borderWidth: 1
                        }}
                    />
                </View>
            </View>
        )
    }
}