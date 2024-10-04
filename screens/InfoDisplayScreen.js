import {View, Text, StatusBar, StyleSheet, Button, SafeAreaView} from "react-native";
import {ItemsList} from "../components/ItemsList";
import {useState, useEffect, createContext} from "react";




const InfoDisplayScreen = ({navigation, route}) => {

    useEffect(() => {
        console.log('Updated itemList:', itemList);
    }, [itemList]);


    const [itemList, setItemList] = useState([]);

    const handleAdd = (itemData) => {
        const {id, type} = itemData;
        let newItem = {id: id || Date.now(), type};

        if (type === 'activity') {
            newItem = {
                ...newItem,
                title: itemData.title,
                time: itemData.time instanceof Date ? itemData.time : new Date(itemData.time),
                duration: itemData.duration,
            };
        } else if (type === 'diet') {
            newItem = {
                ...newItem,
                description: itemData.description,
                date: itemData.date instanceof Date ? itemData.date : new Date(itemData.date),
                calories: itemData.calories,
            };
        }

        setItemList((prevItemList) => {
            if (id) {
                // Update existing item
                return prevItemList.map((item) => (item.id === id ? newItem : item));
            } else {
                // Add new item
                return [...prevItemList, newItem];
            }
        });
    };


    const type = route.name === 'Activities' ? 'activity' : 'diet';

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View>
                    <Button
                        title="Add"
                        onPress={() => navigation.navigate('Entry', {type, handleAdd})}
                    />
                </View>
            ),
        });
    }, [navigation, type, handleAdd]);

    return (<SafeAreaView>
        <View>
            <ItemsList itemList={itemList} type={type} handleAdd={handleAdd}/>
        </View>
    </SafeAreaView>);
}

export default InfoDisplayScreen;

