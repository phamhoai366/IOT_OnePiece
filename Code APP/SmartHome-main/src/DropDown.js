import React, { useRef, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    View,
} from 'react-native';
import { Icon } from 'react-native-elements';

const DropDown = ({ label, data, onSelect }) => {
    const DropdownButton = useRef();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(undefined);
    const [dropdownTop, setDropdownTop] = useState(0);

    const toggleDropdown = () => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = () => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py);
        });
        setVisible(true);
    };

    const onItemPress = (item) => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
            <Text style={{color:"white", fontSize:16}}>{item.label}</Text>
        </TouchableOpacity>
    );

    const renderDropdown = () => {
        return (
            <Modal visible={visible} transparent animationType="none">
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => setVisible(false)}
                >
                    <View style={[styles.dropdown, { top: dropdownTop }]}>
                        <FlatList
                        //style={{color:"white"}}
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    return (
        <TouchableOpacity
            ref={DropdownButton}
            style={styles.button}
            onPress={toggleDropdown}
        >
            {renderDropdown()}
            <Text style={styles.buttonText}>
                {(selected && selected.label) || label}
            </Text>
            <Icon style={styles.icon} type="font-awesome" name="chevron-down" color="white" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: '#1ebbd7',
        height: 50,
        zIndex: 1,
        width: "45%",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: "center"
    },
    buttonText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        color: "white"
    },
    icon: {
        marginRight: 10,
    },
    dropdown: {
        position: "absolute",
        backgroundColor: '#71c7ec',
        width: '40%',
        shadowColor: '#ffffff',
        shadowRadius: 8,
        shadowOffset: { height: 4, width: 0 },
        borderRadius: 10,
        paddingHorizontal: 10,
        //        justifyContent:"center",
        //       alignItems: 'center',
    },
    overlay: {
        width: '100%',
        height: '100%',
        justifyContent:"center",
      alignItems: 'center',

    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomEndRadius:5,
        borderBottomStartRadius:5,
        borderColor:"#e1e1e1"
    },
});

export default DropDown;