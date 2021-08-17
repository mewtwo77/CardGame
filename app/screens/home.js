import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import Deck from '../components/deck';
import Header from '../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';


export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, padding: 12, backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
                <StatusBar />
                <Header />
                <Deck />
            </SafeAreaView>
        );
    }
}
