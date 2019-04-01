billIsVisible: false,
            choreIsVisible: false,
            iouIsVisible: false,
            reminderIsVisible: false,
            shoppingIsVisible: false,


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
        
            renderCards() {
                this.state.items.map((item, i) => {
                    if (this.state.items.length == 1) {
                        this.state.cards.push(
                            <ListItem
                                key={i}
                                title={item.title}
                            />
                        )
                    } else {
                        if (item.type == 'bill') {
                            this.state.cards.push(
                                <ListItem
                                    key={i}
                                    title={`${item.title} - ${item.amount}`}
                                    subtitle={`Due on ${item.date}`}
                                    chevron
                                    containerStyle={{
                                        top: 15,
                                        borderRadius: 15,
                                        width: 400
                                    }}
                                />
                            )
                        } else if (item.type == 'chore') {
                            this.state.cards.push(
                                <ListItem
                                    key={i}
                                    title={item.title}
        
                                    chevron
                                    containerStyle={{
                                        top: 15,
                                        borderRadius: 15,
                                        width: 400
                                    }}
                                />
                            )
                        } else if (item.type == 'iou') {
                            this.state.cards.push(
                                <ListItem
                                    key={i}
                                    title={`${item.receiver} owes you for ${item.title}`}
                                    subtitle={`They owe you ${item.payback}`}
                                    chevron
                                    containerStyle={{
                                        top: 15,
                                        borderRadius: 15,
                                        width: 400
                                    }}
                                />
                            )
                        } else if (item.type == 'reminder') {
                            this.state.cards.push(
                                <ListItem
                                    key={i}
                                    title={item.title}
                                    subtitle={item.date}
                                    chevron
                                    containerStyle={{
                                        top: 15,
                                        borderRadius: 15,
                                        width: 400
                                    }}
                                />
                            )
                        } else if (item.type == 'shopping') {
                            this.state.cards.push(
                                <ListItem
                                    key={i}
                                    title={item.title}
                                    subtitle={`${item.nextBuyer}'s turn`}
                                    chevron
                                    containerStyle={{
                                        top: 15,
                                        borderRadius: 15,
                                        width: 400
                                    }}
                                />
                            )
                        }
                    }
                    console.log('cards-' + this.state.cards)
                })
            }
        


renderOverlay() {
    if (item.type == 'bill') {
        this.setState({
            overlayInfo: item,
            billIsVisible: true
        })
    } else if (item.type == 'chore') {
        this.setState({
            overlayInfo: item,
            choreIsVisible: true
        })
    } else if (item.type == 'iou') {
        this.setState({
            overlayInfo: item,
            iouIsVisible: true
        })
    } else if (item.type == 'reminder') {
        this.setState({
            overlayInfo: item,
            reminderIsVisible: true
        })
    } else if (item.type == 'shopping') {
        this.setState({
            overlayInfo: item,
            shoppingIsVisible: true
        })
    }
}








<Overlay
                        billIsVisible={this.state.billIsVisible}
                        onBackdropPress={() => this.setState({ billIsVisible: false })}
                        width={350}
                        height={275}
                    >
                        <Text style={{fontSize: 30}}>{this.state.overlayInfo.title} - {this.state.overlayInfo.amount}- BILL</Text>
                        <Text style={{fontSize: 20}}>Due on {this.state.overlayInfo.date}</Text>
                        
                        <View style={{ position: 'absolute', bottom: 5, flexDirection: 'row'}}>
                            <Button 
                                containerStyle={{
                                    width: 170,
                                    marginLeft: 3,
                                    marginRight: 2
                                }}
                                title='Delete'
                            />
                            
                            <Button
                                containerStyle={{
                                    width: 170,
                                    marginLeft: 2,
                                    marginRight: 3
                                }} 
                                title='Complete'
                            />
                        </View>
                    </Overlay>
                    <Overlay
                        choreIsVisible={this.state.choreIsVisible}
                        onBackdropPress={() => this.setState({ choreIsVisible: false })}
                        width={350}
                        height={275}
                    >
                        <Text style={{fontSize: 30}}>{this.state.overlayInfo.title} - CHORE</Text>
                        
                        
                        <View style={{ position: 'absolute', bottom: 5, flexDirection: 'row'}}>
                            <Button 
                                containerStyle={{
                                    width: 170,
                                    marginLeft: 3,
                                    marginRight: 2
                                }}
                                title='Delete'
                            />
                            
                            <Button
                                containerStyle={{
                                    width: 170,
                                    marginLeft: 2,
                                    marginRight: 3
                                }} 
                                title='Complete'
                            />
                        </View>
                    </Overlay>
                    <Overlay
                        iouIsVisible={this.state.iouIsVisible}
                        onBackdropPress={() => this.setState({ iouIsVisible: false })}
                        width={350}
                        height={275}
                    >
                        <Text style={{fontSize: 30}}>{this.state.overlayInfo.title} - IOU</Text>
                        
                        
                        <View style={{ position: 'absolute', bottom: 5, flexDirection: 'row'}}>
                            <Button 
                                containerStyle={{
                                    width: 170,
                                    marginLeft: 3,
                                    marginRight: 2
                                }}
                                title='Delete'
                            />
                            
                            <Button
                                containerStyle={{
                                    width: 170,
                                    marginLeft: 2,
                                    marginRight: 3
                                }} 
                                title='Complete'
                            />
                        </View>
                    </Overlay>
                    <Overlay
                        reminderIsVisible={this.state.reminderIsVisible}
                        onBackdropPress={() => this.setState({ reminderIsVisible: false })}
                        width={350}
                        height={275}
                    >
                        <Text style={{fontSize: 30}}>{this.state.overlayInfo.title} - REMINDER</Text>
                        <Text style={{fontSize: 20}}>Due on {this.state.overlayInfo.date}</Text>
                        
                        <View style={{ position: 'absolute', bottom: 5, flexDirection: 'row'}}>
                            <Button 
                                containerStyle={{
                                    width: 170,
                                    marginLeft: 3,
                                    marginRight: 2
                                }}
                                title='Delete'
                            />
                            
                            <Button
                                containerStyle={{
                                    width: 170,
                                    marginLeft: 2,
                                    marginRight: 3
                                }} 
                                title='Complete'
                            />
                        </View>
                    </Overlay>
                    <Overlay
                        shoppingIsVisible={this.state.shoppingIsVisible}
                        onBackdropPress={() => this.setState({ shoppingIsVisible: false })}
                        width={350}
                        height={275}
                    >
                        <Text style={{fontSize: 30}}>{this.state.overlayInfo.title} - SHOPPING</Text>
                        
                        
                        <View style={{ position: 'absolute', bottom: 5, flexDirection: 'row'}}>
                            <Button 
                                containerStyle={{
                                    width: 170,
                                    marginLeft: 3,
                                    marginRight: 2
                                }}
                                title='Delete'
                            />
                            
                            <Button
                                containerStyle={{
                                    width: 170,
                                    marginLeft: 2,
                                    marginRight: 3
                                }} 
                                title='Complete'
                            />
                        </View>
                    </Overlay>






