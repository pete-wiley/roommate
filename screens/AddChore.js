import React from 'react';
import { View, Text, Picker } from 'react-native'
import { Button, Input, ButtonGroup } from 'react-native-elements'

export default class AddChore extends React.Component {
    static navigationOptions = {
        title: 'Chore',
        headerStyle: {
            backgroundColor: '#58a6e2'
        },
        headerTintColor: 'white'
    }

    constructor(props) {
        super(props)
        this.state = {
            type: 'chore',
            title: '',
            date: "2019-03-29",
            nextChorer: 'peteid',
            isExempt: 'no one',
            isRepeating: 1
        }
        this.updateIsRepeating = this.updateIsRepeating.bind(this)
    }

    updateIsRepeating(isRepeating) {
        this.setState({ isRepeating })
    }

    addChore = async () => {
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
                    nextChorer: this.state.nextChorer,
                    isExempt: this.state.isExempt,
                    isRepeating: this.state.isRepeating
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
        const { isRepeating } = this.state
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
                        placeholder='What chore would you like to add?'
                        onChangeText={(title) => this.setState({title})}
                    />

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly" }}>
                        <Text>
                            Who is doing this chore next?
                        </Text>
                        <Picker
                            selectedValue={this.state.nextChorer}
                            style={{ height: 50, width: 150,}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ nextChorer: itemValue })
                            }>
                            <Picker.Item label="Pete" value="peteid" />
                            <Picker.Item label="Savannah" value="savid" />
                            <Picker.Item label="Ashley" value="ashid" />
                        </Picker>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly" }}>
                        <Text>
                            Who is exempt from doing this chore?
                        </Text>
                        <Picker
                            selectedValue={this.state.isExempt}
                            style={{ height: 50, width: 150,}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ isExempt: itemValue })
                            }>
                            <Picker.Item label="No one" value="no one" />
                            <Picker.Item label="Pete" value="peteid" />
                            <Picker.Item label="Ashley" value="ashid" />
                            <Picker.Item label="Savannah" value="savid" />
                        </Picker>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly" }}>
                        <Text>
                            Will this chore repeat?
                        </Text>
                        <ButtonGroup
                            onPress={this.updateIsRepeating}
                            selectedIndex={isRepeating}
                            buttons={repeatingButtons}
                            containerStyle={{ height: 40, width: 150 }}
                        />
                    </View>

                </View>
                <View style={{ position: 'absolute', bottom: 60, right: 0 }}>
                    <Button
                        title="Add Chore"
                        onPress={() => 
                            this.addChore()}
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