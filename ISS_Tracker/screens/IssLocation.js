import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    StatusBar,
    SafeAreaView,
    Image,
    Alert,
    Platform
} from 'react-native';
import axios from 'axios';
import MapView,{Marker} from 'react-native-maps';

export default class IssLocationScreen extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            location:{}
        }

    }

    componentDidMount()
    {
        this.getIssLocation()
    }

    getIssLocation=()=>{
        axios.get("https://api.wheretheiss.at/v1/satellites/25544")
        .then(response =>{
            this.setState({loaction:response.data})
        })
        .catch(error=>{
            Alert.alert(error.message);
        })
    }
    render()
    {
            
        if (Object.keys(this.state.location).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading.....</Text>
                </View>
            )
        } 
        else{      
            return(
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea}/>
                    <ImageBackground source={require('../assets/meteor_bg1.png')} style={styles.backgroundImage}>
                        <View style={styles.titleBar}>
                            <Text style={styles.titleText}>ISS Tracker App</Text>
                        </View>
                        <View style={styles.mapContainer}>
                        <MapView style={styles.map}
                            region={{
                                latitude:this.state.location.latitude,
                                longitude:this.state.location.longitude,
                                latitudeDelta:100,
                                longitudeDelta:100
                            }}>
                            <Marker coordinate={{ latitude:this.state.location.latitude,longitude:this.state.location.longitude}}>
                            </Marker>
                                <Image source={require('../assets/iss_icon.png')} style={{width:50,height:50}}/>

                        </MapView>
                        </View>
                    </ImageBackground>
                </View>
            );
        }
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white"
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    mapContainer:{
        flex:0.5
    },
    map:{
        width:"100%" ,
        height:"100%"    
    },
})


