import React from 'react';
import { View, Picker, Text } from 'react-native'
import { Button, Input, ButtonGroup } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import AddReminder from './AddReminder';


export default class AddBill extends React.Component {
    static navigationOptions = {
        title: 'Bill',
        headerStyle: {
            backgroundColor: '#58a6e2'
        },
        headerTintColor: 'white'
    }

    constructor(props) {
        super(props)
        this.state = {
            type: 'bill',
            title: '',
            amount: '',
            date: "2019-03-29",
            isExempt: "no one",
            isRepeating: 1,
            isSplit: 1
        }
        this.updateIsRepeating = this.updateIsRepeating.bind(this)
        this.updateIsSplit = this.updateIsSplit.bind(this)
    }

    updateIsRepeating(isRepeating) {
        this.setState({ isRepeating })
    }
    updateIsSplit(isSplit) {
        this.setState({ isSplit })
    }

    addBill = async () => {
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
                    amount: this.state.amount,
                    date: this.state.date,
                    isExempt: this.state.isExempt,
                    isRepeating: this.state.isRepeating,
                    isSplit: this.state.isSplit,
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
        const repeatingButtons = ['No', 'Yes']
        const splitButtons = ['No', 'Yes']
        const { isRepeating } = this.state
        const { isSplit } = this.state

        return (
            <View style={{ flex: 1, backgroundColor: '#58a6e2' }}>
                <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    {/*-----------------------------------------------------title-------------------------------------------------------------------------------*/}
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
                        placeholder='What is this bill for?'
                        onChangeText={(title) => this.setState({title})}
                    />
                    {/*--------------------------------------------------------amount----------------------------------------------------------------------*/}
                    <Input
                        inputContainerStyle={{
                            //top: 100,
                            //paddingTop: 5,
                            //paddingBottom: 5,
                            paddingLeft: 10,
                            paddingRight: 10,
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 30
                        }}
                        containerStyle={{
                            paddingLeft: 30,
                            paddingRight: 30,
                            paddingBottom: 20
                        }}
                        placeholder='How much is the bill?'
                        onChangeText={(amount) => this.setState({amount})}
                    />
                    {/*-------------------------------------------------when is the bill due?--------------------------------------------------------------*/}
                    <DatePicker
                        style={{ width: 200, alignSelf: 'center', right: 17 }}
                        /*customStyles={{
                            dateInput: {
                                borderWidth: 0,
                                height: 50,
                                width: 170,
                                right: 30,
                            }
                        }}*/
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
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                    {/*----------------------------------------------who is exempt from paying the bill?---------------------------------------------------*/}
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly" }}>
                        <Text>
                            Who is exempt from paying this bill?
                        </Text>
                        <Picker
                            selectedValue={this.state.isExempt}
                            style={{ height: 50, width: 150, }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ isExempt: itemValue })
                            }>
                            <Picker.Item label="No one" value="no one" />
                            <Picker.Item label="Pete" value="peteid" />
                            <Picker.Item label="Ashley" value="ashid" />
                            <Picker.Item label="Savannah" value="savid" />
                        </Picker>
                    </View>
                    {/*---------------------------------------------------will the bill repeat?------------------------------------------------------------*/}
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly" }}>
                        <Text>
                            Will this bill repeat every month?
                        </Text>
                        <ButtonGroup
                            onPress={this.updateIsRepeating}
                            selectedIndex={isRepeating}
                            buttons={repeatingButtons}
                            containerStyle={{ height: 40, width: 150 }}
                        />
                    </View>
                    {/*--------------------------------------------------will the bill be split?------------------------------- ---------------------------*/}
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly" }}>
                        <Text>
                            Will this bill be split evenly{"\n"}between all home members?
                        </Text>

                        <ButtonGroup
                            onPress={this.updateIsSplit}
                            selectedIndex={isSplit}
                            buttons={splitButtons}
                            containerStyle={{ height: 40, width: 150 }}
                        />
                    </View>
                </View>
                <View style={{ position: 'absolute', bottom: 60, right: 0 }}>
                    <Button
                        title="Add Bill"
                        onPress={() =>
                            this.addBill()}
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