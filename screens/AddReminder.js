import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { Avatar, Header, Button, ListItem, Input, ButtonGroup } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'


export default class AddReminder extends React.Component {
    static navigationOptions = {
        title: 'Reminder',
        headerStyle: {
            backgroundColor: '#58a6e2'
        },
        headerTintColor: 'white'
    }

    constructor(props) {
        super(props)
        this.state = {
            type: 'reminder',
            title: '',
            date: "2019-03-29",
            isDated: 1
        }
        this.updateIsDated = this.updateIsDated.bind(this)
    }

    updateIsDated(isDated) {
        this.setState({ isDated })
    }

    AddReminder = async () => {
        try {
            let response = await fetch('https://roommate-api-v3.herokuapp.com/items', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: this.state.type,
                    title: this.state.title,
                    date: this.state.date,
                    isDated: this.state.isDated
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
        const isDatedButtons = ['No', 'Yes']
        const { isDated } = this.state
        return (
            <View style={{ flex: 1, display: 'flex', backgroundColor: '#58a6e2' }}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' , top: 100}}>
                    <Input
                        inputContainerStyle={{
                            paddingLeft: 10,
                            paddingRight: 10,
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 15
                        }}
                        containerStyle={{
                            paddingLeft: 30,
                            paddingRight: 30,
                            paddingBottom: 20
                        }}
                        placeholder='What are we doing?'
                        onChangeText={(title) => this.setState({title})}
                    />

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Text>
                            Is a date relevant?
                        </Text>
                        <ButtonGroup
                            onPress={this.updateIsDated}
                            selectedIndex={isDated}
                            buttons={isDatedButtons}
                            containerStyle={{ height: 40, width: 150 }}
                        />
                    </View>

                    <View style={{top: 20}}>
                        <Text>If a date is relevant, when? If not, don't worry about it</Text>
                        <DatePicker
                            style={{ width: 200, alignSelf: 'center', right: 17, top: 10 }}
                            date={this.state.date}
                            showIcon={false}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2025-12-31"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                    </View>
                </View>
                <View style={{ position: 'absolute', bottom: 60, right: 0 }}>
                    <Button
                        title="Add Item"
                        onPress={() => 
                            this.AddReminder()}
                        containerStyle={{
                            height: 30,
                            width: 120,
                            borderRadius: 20,
                            position: 'absolute',
                            right: 12,
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