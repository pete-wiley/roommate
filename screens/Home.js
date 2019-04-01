import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { Avatar, Header, Button, ListItem, Overlay } from 'react-native-elements'
import axios from 'axios'

class Home extends Component {

    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#58a6e2'
        },
        headerTintColor: 'white',
        headerRight:
            <Avatar
                rounded
                containerStyle={{ marginRight: 10 }}
                source={{
                    uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                }}
            />
    }

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            gotRes: 0,
            cards: [],
            isVisible: false,
            overlayInfo: {

            }
        }
    }

    getItems = async () => {
        try {
            let response = await fetch('https://roommate-api-v3.herokuapp.com/items', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let res = await response.json();
            if (!res) {
                console.log('Nope');
            } else {
                console.log(res);
                this.setState({
                    items: res,
                    gotRes: 1
                })
            }
        } catch (error) {
            console.log('Something went wrong');
        }
    }

    

    render() {
        this.getItems()
        return (
            <View style={{ flex: 1, backgroundColor: "#58a6e2" }}>
                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

                    <Overlay
                        isVisible={this.state.isVisible}
                        onBackdropPress={() => this.setState({ isVisible: false })}
                        width={350}
                        height={275}
                    >

                        <Text style={{ fontSize: 30 }}>{this.state.overlayInfo.title}</Text>
                        <Text style={{ fontSize: 20 }}>{this.state.overlayInfo.date}</Text>
                        <Text style={{ fontSize: 20 }}>{this.state.overlayInfo.receiver}{this.state.overlayInfo.payback}</Text>
                        <Text style={{ fontSize: 20 }}>{this.state.overlayInfo.nextBuyer}</Text>
                        <Text style={{ fontSize: 20 }}>{this.state.overlayInfo.nextChorer}</Text>
                        <Text style={{ fontSize: 20 }}>{this.state.overlayInfo.amount}</Text>
                        <View style={{ position: 'absolute', bottom: 5, flexDirection: 'row' }}>
                            <Button
                                containerStyle={{
                                    width: 170,
                                    marginLeft: 3,
                                    marginRight: 2,
                                    
                                }}
                                buttonStyle={{
                                    backgroundColor: '#f44336'
                                }}
                                title='Delete'
                                onPress={ () => {
                                    axios.delete(`https://roommate-api-v3.herokuapp.com/items/${this.state.overlayInfo._id}`)
                                    .then(response => console.log(response))
                                    this.setState({
                                        isVisible: false
                                    })
                                }
                                }
                            />

                            <Button
                                containerStyle={{
                                    width: 170,
                                    marginLeft: 2,
                                    marginRight: 3,

                                }}
                                buttonStyle={{
                                    backgroundColor: '#509f67'
                                }}
                                title='Complete'
                                onPress={ () => {
                                    axios.delete(`https://roommate-api-v3.herokuapp.com/items/${this.state.overlayInfo._id}`)
                                    .then(response => console.log(response))
                                    this.setState({
                                        isVisible: false
                                    })
                                }
                                }
                            />
                        </View>
                    </Overlay>

                    {
                        this.state.items.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                subtitle={item.date}
                                chevron
                                containerStyle={{
                                    borderRadius: 15,
                                    width: 400
                                }}

                                onPress={() =>
                                    this.setState({
                                        isVisible: true,
                                        overlayInfo: item
                                    })
                                }
                                style={{
                                    marginTop: 15,
                                    borderRadius: 15,
                                    width: 400
                                }}
                            />
                        ))
                    }

                </View>
                <View style={{ position: 'absolute', bottom: 60, right: 0 }}>
                    <Button
                        title="+   Add Item"
                        onPress={() => this.props.navigation.navigate('AddItem')}
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

export default Home

/*{
    list.map((l, i) => (
        <ListItem
            style={{
                padding: 10,
            }}
            key={i}
            //leftAvatar={{ source: { uri: l.avatar_url } }}
            title={l.name}
            subtitle={l.subtitle}
            chevron
            containerStyle={{
                backgroundColor: '#fff',
                borderRadius: 10
            }}
        />
    ))
}*/