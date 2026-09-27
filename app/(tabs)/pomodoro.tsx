import { StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";

import { useEffect } from "react";

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'; 

import { usePomodoroConfig } from "../pomodoro-context";

function formatarNumero(numero: number) {
    return numero.toString().padStart(2, '0');
}

export default function PomodoroScreen() {
    const { pomodoro, pausa, pausaLonga } = usePomodoroConfig();

    const Tempo_Inicial = pomodoro * 60;
    const pausa_Inicial = pausa * 60;
    const pausaLonga_Inicial = pausaLonga * 60;

    const [SegundosRestantes, setSegundosRestantes] = useState(Tempo_Inicial);
    const [pausaRestantes, setPausaRestantes] = useState(pausa_Inicial);
    const [RodandoPausa, setRodandoPausa] = useState(false);
    const [rodando, setrodando] = useState(false);

    // conta quantos pomodoros seguidos já foram completados
    const [ciclosCompletos, setCiclosCompletos] = useState(0);
    // guarda qual duração de pausa vale para a pausa atual (normal ou longa)
    const [duracaoPausaAtual, setDuracaoPausaAtual] = useState(pausa_Inicial);

    const animacaoReiniciar = useSharedValue(0);
    const estiloAnimado = useAnimatedStyle(() => {
        return {
            opacity: animacaoReiniciar.value,
            transform: [{
                translateY: (1 - animacaoReiniciar.value) * 20
            }],
        };
    });

    function reiniciar() {
        if (RodandoPausa === true) {
            setPausaRestantes(duracaoPausaAtual);
            setrodando(false);
        } else if (RodandoPausa === false) {
            setrodando(false);
            setSegundosRestantes(Tempo_Inicial);
        }
    }

    useEffect(() => {
        // não roda se: não estiver ligado, estiver na fase errada, OU o tempo configurado for 0
        if (!rodando || RodandoPausa || Tempo_Inicial === 0) return;

        const intervalo = setInterval(() => {
            setSegundosRestantes((valorAtual) => valorAtual - 1);
        }, 1000);

        return () => clearInterval(intervalo);
    }, [rodando, RodandoPausa]);

    useEffect(() => {
        if (SegundosRestantes === 0) {
            setrodando(false);
            setRodandoPausa(true);

            // decide se essa pausa deve ser a longa ou a normal
            const novosCiclos = ciclosCompletos + 1;
            setCiclosCompletos(novosCiclos);

            if (novosCiclos % 4 === 0) {
                setDuracaoPausaAtual(pausaLonga_Inicial);
                setPausaRestantes(pausaLonga_Inicial);
            } else {
                setDuracaoPausaAtual(pausa_Inicial);
                setPausaRestantes(pausa_Inicial);
            }
        }
    }, [SegundosRestantes]);

    useEffect(() => {
        // não roda se: não estiver ligado, não for fase de pausa, OU a duração da pausa atual for 0
        if (!rodando || !RodandoPausa || duracaoPausaAtual === 0) return;

        const pausaInterval = setInterval(() => {
            setPausaRestantes((valorAtual) => valorAtual - 1);
        }, 1000);

        return () => clearInterval(pausaInterval);
    }, [rodando, RodandoPausa]);

    useEffect(() => {
        if (pausaRestantes === 0) {
            setRodandoPausa(false);
            setrodando(false);
            setSegundosRestantes(Tempo_Inicial);
        }
    }, [pausaRestantes]);

    useEffect(() => {
        animacaoReiniciar.value = withTiming(rodando ? 1 : 0, { duration: 300 });
    }, [rodando]);

    return (<ThemedView style={styles.container}>

        <Link href='./pomodoroConfig' style={styles.bars}>
            <FontAwesome name="bars" size={20} color="white" />
        </Link>

        <ThemedView style={styles.divPai}>

            <ThemedView style={styles.estadoTimer}>
                <ThemedText style={[styles.styleAbaTexto, !RodandoPausa && styles.styleAbaTextoAtivo]}>Pomdoro</ThemedText>
                <ThemedText style={[styles.styleAbaTexto, RodandoPausa && styles.styleAbaTextoAtivo]}>Pausa</ThemedText>
            </ThemedView>

            <ThemedText style={styles.ciclos}>
                    Ciclo {ciclosCompletos % 4 === 0 && ciclosCompletos > 0 ? 4 : ciclosCompletos % 4} de 4
            </ThemedText>

            <ThemedView style={styles.cronometro}>
                <ThemedText type='subtitle' style={styles.tempo}>
                    {RodandoPausa ? (
                        `${formatarNumero(Math.floor(pausaRestantes / 60))}:${formatarNumero(pausaRestantes % 60)}`
                    ) : (
                        `${formatarNumero(Math.floor(SegundosRestantes / 60))}:${formatarNumero(SegundosRestantes % 60)}`
                    )}
                </ThemedText>

                 
            </ThemedView>

            <Pressable style={styles.botao} onPress={() => setrodando(!rodando)}>
                <Ionicons name={rodando ? 'pause' : 'play'} size={60} color="white" />
            </Pressable>

        </ThemedView>

        <ThemedView style={{ height: 60, justifyContent: "center" }}>
            <Animated.View style={estiloAnimado}>
                <Pressable onPress={reiniciar}>
                    <ThemedText style={styles.reiniciar}>Reiniciar</ThemedText>
                </Pressable>
            </Animated.View>
        </ThemedView>

    </ThemedView>
    );
}

const styles = StyleSheet.create({
    bars: {
        alignSelf: 'flex-end',
        marginEnd: 25,
        marginTop: 10,
    },
    container: {
        flex: 1,
        padding: 24,
        paddingTop: 60,
        gap: 16,
        alignItems: 'center',
    },
    divPai: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    cronometro: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tempo: {
        fontSize: 40,
        color: 'white',
        fontFamily: 'Poppins_400Regular',
    },
    botao: {
        justifyContent: 'center',
    },
    reiniciar: {
        fontSize: 15,
        color: '#888',
        fontFamily: 'Poppins_400Regular',
    },
    estadoTimer: {
        flexDirection: 'row',
        gap: 10,
    },
    styleAbaTexto: {
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 30,
        padding: 5,
    },
    styleAbaTextoAtivo: {
        backgroundColor: 'white',
        borderRadius: 30,
        color: 'black',
        padding: 5,
        fontFamily: 'Poppins_700Bold',
    },
    ciclos: {
    fontSize: 13,
    color: '#888',
    },
});