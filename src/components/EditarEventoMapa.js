import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { editEvent, saveNewEventCoords, closeEventMapHelper } from '../actions';
import { CardSection } from '../components/commons';
import Styles from '../Styles';

const ICON = require('../../assets/img/pin.png');

const { height, width } = Dimensions.get('window');
const HEIGHT = Dimensions.get('window').height;

let lat = -1.473987;
let long = -48.452267;
let coords = {
    lat: -1.473987,
    long: -48.452267
};
let LatLng = {
    latitude: -1.473987,
    longitude: -48.452267,
};

class EditarEventoMapa extends Component {
    static navigationOptions = {
        title: 'Editar local do evento',
        headerTintColor: '#2A4065',
        headerTitleStyle: {
            fontFamily: 'Ubuntu-Medium',
            fontWeight: '200',
            fontSize: 18,
        },
        headerStyle: {
            elevation: 5
        }
    };


    renderHelper() {
        if (this.props.helperMap) {
            return (
                <View
                    style={[
                        Styles.cardHelperStyle,
                        {
                            marginBottom: HEIGHT * this.props.positionHelper,
                            width: width * 0.5,
                            height: height * 0.2,
                        },
                    ]}
                >
                    <View style={{ flex: 2, flexDirection: 'row', margin: 5 }}>
                        <Text style={Styles.dicaTextStyle}>Dica</Text>
                        <TouchableOpacity
                            style={{ alignSelf: 'center' }}
                            onPress={() => {
                                this.props.closeEventMapHelper();
                            }}
                        >
                            <View style={Styles.buttomCloseStyle}>
                                <Icon name="clear" color="#FFF" size={15} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={Styles.textCardHelperStyle}>
                        {`${this.props.messageHelper}`}
                    </Text>
                </View>
            );
        }
    }

    render() {
        console.log('coords na view', this.props.coords)
        if (this.props.coords !== undefined) {
            lat = this.props.coords.lat;
            long = this.props.coords.long;
            coords = {
                lat: this.props.coords.lat,
                long: this.props.coords.long,
            };
            LatLng = {
                latitude: this.props.coords.lat,
                longitude: this.props.coords.long
            };
        }
        return (
            <View>
                {this.renderHelper()}
                <MapView
                    style={styles.mapStyle}
                    region={{
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.00021,
                        longitudeDelta: 0.0025
                    }}
                    onPress={(e) => {
                        const prop = 'coords';
                        const value = {
                            lat: e.nativeEvent.coordinate.latitude,
                            long: e.nativeEvent.coordinate.longitude
                        };
                        this.props.editEvent({ prop, value });
                    }}
                >
                    <Marker coordinate={LatLng} image={ICON} />
                </MapView>
                <CardSection styleSection={{ flex: 1, position: 'absolute', right: 0, left: 0, bottom: 0 }}>
                    <TouchableOpacity onPress={() => { this.props.saveNewEventCoords({ id: this.props.id, coords }); }} >
                        <View style={[Styles.iconButtomStyle, { backgroundColor: '#2A4065' }]}>
                            <Icon
                                type='material-community'
                                name='check'
                                color='#FFF'
                                size={25}
                            />
                        </View>
                    </TouchableOpacity>
                </CardSection>
            </View >
        );
    }
}

const styles = {
    mapStyle: {
        height: '100%',
        width: '100%'
    }
};

const mapStateToProps = (state) => {
    const { id, coords, helperMap, messageHelper, positionHelper } = state.eventoEdicao;

    return { id, coords, helperMap, messageHelper, positionHelper };
};

export default connect(mapStateToProps, { editEvent, saveNewEventCoords, closeEventMapHelper })(EditarEventoMapa);
