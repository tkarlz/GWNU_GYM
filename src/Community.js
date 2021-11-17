import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../functions/GwnuText'
import { GwnuBeige, GwnuBlue, GwnuPurple, GwnuYellow, LightenColor } from '../functions/GwnuColor'
import { GetCommunityList} from '../functions/Firestore';

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
        minHeight: 100,
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

const ListView = () => {
    const comm =GetCommunityList('health_gym')
    return (
        <TouchableOpacity
            activeOpacity={0.8}>

                <Text style={styles.infoViewTitle}>
                    {comm && comm.map((el) => {
                        return el.title, el.date
                    })}
                </Text>

        </TouchableOpacity>
    )
}
const Community = () => {
    return (
    <View>
       <View style={styles.infoView}>
          <Text style={styles.infoViewContent}>커뮤니티</Text>
        </View>
        <View style={styles.infoView}>
           <ListView/>
        </View>
    </View>
    );
};
export default Community