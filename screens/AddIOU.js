import React from 'react';
import { View, Text, Picker } from 'react-native'
import { Button, Input } from 'react-native-elements'


export default class AddBill extends React.Component {
    static navigationOptions = {
        title: 'IOU',
        headerStyle: {
            backgroundColor: '#58a6e2'
        },
        headerTintColor: 'white'
    }

    constructor(props) {
        super(props)
        this.state = {
            type: 'iou',
            title: '',
            payback: '',
            receiver: "peteid",
        }
    }

    addIOU = async () => {
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
                    payback: this.state.payback,
                    receiver: this.state.receiver
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
                        placeholder='What do they owe you for?'
                        onChangeText={(title) => this.setState({title})}

                    />

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
                            //paddingTop: 150,
                            paddingLeft: 30,
                            paddingRight: 30,
                            paddingBottom: 20
                        }}
                        placeholder='What do you want in return?'
                        onChangeText={(payback) => this.setState({payback})}

                    />

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly" }}>
                        <Text>
                            Who owes you?
                        </Text>
                        <Picker
                            selectedValue={this.state.receiver}
                            style={{ height: 50, width: 150,}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ receiver: itemValue })
                            }>
                            <Picker.Item label="Pete" value="peteid" />
                            <Picker.Item label="Ashley" value="ashid" />
                            <Picker.Item label="Savannah" value="savid" />
                        </Picker>
                    </View>
                </View>
                <View style={{ position: 'absolute', bottom: 60, right: 0 }}>
                    <Button
                        title="Add IOU"
                        onPress={() => 
                            this.addIOU()}
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