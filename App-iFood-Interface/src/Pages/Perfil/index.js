import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView, View } from './style';

export default function Perfil() {
    return (
        <>
            <StatusBar style='theme-dark' />
            <SafeAreaView>
                <View>
                    <Text>Perfil</Text>
                </View>
            </SafeAreaView>
        </>
    );
}
