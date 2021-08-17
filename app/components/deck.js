import React, { PureComponent, useState } from 'react';
import { FlatList, StyleSheet, Alert } from 'react-native';
import { MAX_WIDTH } from '../ultil/cardRandomizer';
import Card from './card';
import { generateCards } from '../redux/actions/card';
import { resetStep } from '../redux/actions/step';
import { connect } from 'react-redux';

class Deck extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: null
        }

    }

    componentDidMount() {
        this.props.generateCards();
    }

    onEnd = () => {
        Alert.alert('Congratulations!', `You win this game by ${this.props.steps} steps`,
            [
                {
                    text: "Try another round",
                    onPress: () => {
                        this.props.generateCards();
                        this.props.resetStep();
                    }
                }
            ]
        )
    }

    renderItem = ({ item }) => {
        return <Card item={item} onEnd={this.onEnd} />;

    }

    render() {
        let deck = this.props.cards;
        return (
            <FlatList style={styles.container}
                numColumns={MAX_WIDTH}
                data={deck}
                keyExtractor={(item) => item.key.toString()}
                renderItem={this.renderItem}
                extraData={this.state.selectedId}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
    },
});

const mapStateToProps = (state) => {
    return {
        cards: state.cardReducer.cards,
        steps: state.stepReducer.steps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        generateCards: () => dispatch(generateCards()),
        resetStep: () => dispatch(resetStep())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);