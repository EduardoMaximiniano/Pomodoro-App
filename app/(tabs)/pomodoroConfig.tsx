import { StyleSheet, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import { usePomodoroConfig } from '../pomodoro-context';

export default function ConfigurarPomodoro() {
const { pomodoro, setPomodoro, pausa, setPausa, pausaLonga, setPausaLonga } = usePomodoroConfig();

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="subtitle" style={styles.titulos}>Durações</ThemedText>
            <ThemedView style={styles.duracoes}>

                <ThemedView style={styles.campoConfig}>
                    <TextInput
                        value={pomodoro.toString()}
                        onChangeText={(texto) => {
                            const apenasNumeros = texto.replace(/[^0-9]/g, '');
                            setPomodoro(Number(apenasNumeros))}}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <ThemedText style={styles.label}>Pomodoro</ThemedText>
                </ThemedView>

                <ThemedView style={styles.campoConfig}>
                    <TextInput
                        value={pausa.toString()}
                        onChangeText={(texto) => {
                            const apenasNumeros = texto.replace(/[^0-9]/g, '');
                            setPausa(Number(apenasNumeros))}}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <ThemedText style={styles.label}>Pausa</ThemedText>
                </ThemedView>

                <ThemedView style={styles.campoConfig}>
                    <TextInput
                        value={pausaLonga.toString()}
                        onChangeText={(texto) => {
                            const apenasNumeros = texto.replace(/[^0-9]/g, '');
                            setPausaLonga(Number(apenasNumeros))}}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <ThemedText style={styles.label}>Pausa longa</ThemedText>
                </ThemedView>

            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingTop: 90,
    },
    titulos: {
        textAlign: 'center',
    },
    duracoes: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 20,
        marginTop: 20,
    },
    campoConfig: {
        alignItems: 'center',
        gap: 8,
    },
    input: {
        backgroundColor: '#999',
        borderRadius: 10,
        width: 80,
        height: 80,
        fontSize: 28,
        textAlign: 'center',
        color: 'white',
    },
    label: {
        fontSize: 13,
    },
});