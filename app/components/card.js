import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { MAX_HEIGHT } from '../ultil/cardRandomizer';
import { connect } from 'react-redux';
import { flipCard, addSelectedCard, resetSelectedCards } from '../redux/actions/card';
import { addStep } from '../redux/actions/step';
import { verify, hasWinner } from '../ultil/cardVerifier';

class Card extends PureComponent {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
        this.currentValue = 0;
        this.animatedValue.addListener(({ value }) => {
            this.currentValue = value;
        });
    }

    flipAnimation = () => {
        if (this.currentValue >= 90) {
            Animated.spring(this.animatedValue, {
                toValue: 0,
                tension: 10,
                friction: 8,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.spring(this.animatedValue, {
                toValue: 180,
                tension: 10,
                friction: 8,
                useNativeDriver: false,
            }).start();
        }
    };

    onPress = async (item) => {
        if (item.flip) return;
        await this.props.addSelectedCard(item);
        await this.props.flipCard(item.key);
        await this.props.addStep();
        await verify(this.props.selectedCards, this.props.resetSelectedCards, this.props.flipCard);
        if (await hasWinner(this.props.cards)) this.props.onEnd()
    }

    render() {
        let { item } = this.props

        const setInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
        });

        const rotateYAnimatedStyle = {
            transform: [{ rotateY: setInterpolate }],
        };


        return (
            <Animated.View style={[/**rotateYAnimatedStyle**/, styles.container]} key={item.key}>
                <TouchableOpacity
                    onPress={() => {
                        this.onPress(item);
                        // this.flipAnimation();
                    }}
                    key={item.key}
                    style={[styles.item, item.flip ? styles.front : styles.back]}
                >

                    <Text style={[styles.itemText, item.flip ? styles.itemTextFront : styles.itemTextBack]}>{item.flip ? item.value : '?'}</Text>
                </TouchableOpacity>
            </Animated.View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    front: {
        backgroundColor: 'white',
    },
    back: {
        backgroundColor: 'darkblue',
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 2,
        height: (Dimensions.get('window').height * 0.8) / MAX_HEIGHT,
        borderColor: 'white',
        borderRadius: 12,
        borderWidth: 2
    },
    itemText: {
        fontSize: 30
    },

    itemTextFront: {
        color: 'black',
    },

    itemTextBack: {
        color: '#fff'
    },
});


const mapStateToProps = (state) => {
    return {
        cards: state.cardReducer.cards,
        selectedCards: state.cardReducer.selectedCards
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        flipCard: async (key) => dispatch(flipCard(key)),
        addStep: async () => dispatch(addStep()),
        addSelectedCard: async (card) => dispatch(addSelectedCard(card)),
        resetSelectedCards: async () => dispatch(resetSelectedCards())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);

