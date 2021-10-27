import React from 'react';
import { Text } from 'react-native';
import { TextColor } from './GwnuColor'

const GwnuText = (props) => {
    return(
        <Text {...props} style = {[{
            color: TextColor,
            fontSize: 16, 
            fontFamily: "NotoSansKR-Regular",
        }, props.style]}>
            {props.children}
        </Text>
    )
}

export default GwnuText