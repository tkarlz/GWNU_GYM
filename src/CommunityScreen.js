import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../functions/GwnuText'
import { GwnuBeige, GwnuBlue, GwnuPurple, GwnuYellow, LightenColor } from '../functions/GwnuColor'
import { GetCommunityList, GetCommunityContents} from '../functions/Firestore';

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        alignItems: "center",
    },
    infoView: {
        alignSelf: 'stretch',
        backgroundColor: GwnuBeige,
        borderRadius: 5,
        marginHorizontal: 30,
        marginVertical: 50,
        shadowColor: 'black', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 5, //IOS
        elevation: 5, // Android
    },
    infoViewTitle: {
        padding: 15,
        fontSize: 20,
        fontWeight: "bold",
    },
    infoViewContent: {
        Height: 20,
        backgroundColor: LightenColor,
        borderRadius: 5,
        padding: 15,
        overflow: "hidden", // IOS
    },
    listButton: {
        alignSelf: 'stretch',
        borderRadius: 5,
        marginHorizontal: 30,
        marginBottom: 15,
        shadowColor: 'black', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 5, //IOS
        elevation: 5 // Android
    },
    listButtonText: {
        padding: 20,
        fontWeight: "bold"
    }
})


const CommunityScreen = ({ route, navigation }) => {
    const { type } = route.params;
    const comm = GetCommunityList(type)
    return (
    
        <View>           
           
            {comm && comm.map((el, i) => {
                
                Getcontents.map((a) => {
                    console.log()
                    return (
                        <View style={styles.infoView}>
                            <Text style={styles.infoViewTitle}>{el.title}</Text>

                            <Text style={styles.infoViewContent}>
                                {console.log(a.contents)}
                            </Text>
                            <Text style={styles.infoViewContent}>
                                {el.date}
                            </Text>
                        </View>
                    )
                })
                
            })}
    </View>
    );
};
export default CommunityScreen