import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';


const Card = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);


    return (
        <View style={styles.cardContainer}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onPress={(open) => console.log('was the picker open?', open)}

            />
        </View>
    );
};

const Gas = () => {
    return <Card />;
};
const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        elevation: 2,
        marginTop: StatusBar.currentHeight || 0,
    },

});

export default Gas;


