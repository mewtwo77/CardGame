import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { generateCards } from '../redux/actions/card';
import { resetStep } from '../redux/actions/step';
import { connect } from 'react-redux';

class Header extends PureComponent {
    constructor(props) {
        super(props);
    }

    onPress = () => {
        this.props.generateCards();
        this.props.resetStep();
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.onPress()}
                >
                    <Text style={{ color: 'darkblue' }}>RESTART</Text>
                </TouchableOpacity>
                <Text style={{ color: 'white' }}>STEPS: <Text style={{ color: 'darkblue', fontSize: 20 }}>{this.props.steps}</Text></Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    }
});


const mapStateToProps = (state) => {
    return {
        steps: state.stepReducer.steps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        generateCards: () => dispatch(generateCards()),
        resetStep: () => dispatch(resetStep())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);