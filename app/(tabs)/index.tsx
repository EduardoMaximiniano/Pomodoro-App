  import { StyleSheet, Pressable, TextInput, View } from 'react-native';
  import { useState } from 'react';
  import { Link } from 'expo-router';

  import { ThemedText } from '@/components/themed-text';
  import { ThemedView } from '@/components/themed-view';

  export default function HomeScreen() {
    // ---------- ESTADOS ----------
    const [contador, setContador] = useState(0);
    const [nome, setNome] = useState('');
    const [lista, setLista] = useState(['Estudar React-Native', 'Estudar JavaScript']);
      const [valor, setValor] = useState('');
      const [desconto, setDesconto] = useState(10);
      const [descontoTela, setDescontoTela] = useState(0);
      const [resultado, setResultado] = useState(0);
    // ---------- FUNÇÕES (a lógica fica toda aqui, separada do JSX) ----------
    function adicionarNaLista() {
      if (nome !== '') {
        setLista([...lista, nome]);
        setNome('');
      } else {
        alert('Digite algo antes de adicionar!');
      }
    }

    function removerDaLista(index: number) {
      setLista(lista.filter((item, i) => i !== index));
    }

    function realizarDesconto() {
      if (valor === '') {
        alert('Digite o valor!');
      } else {
        const valorNumber = Number(valor);
        const valorDoDesconto = valorNumber * (desconto/100);
        const valorComDesconto = valorNumber - valorDoDesconto;
        setValor('');
        setDescontoTela(valorDoDesconto);
        setResultado(valorComDesconto);
      }
        
    }
    // ---------- TELA (só desenha, não decide nada complicado) ----------
    return (

      <ThemedView style={styles.container}>

      <Link href="./pomodoro">
        <ThemedText>Ir para pomodoro</ThemedText>
      </Link>

        <ThemedText type="title">Contador</ThemedText>
        <Pressable onPress={() => setContador(contador + 1)}>
          <ThemedText>Toquei {contador} vezes</ThemedText>
        </Pressable>
        <Pressable onPress={() => setContador(0)}>
          <ThemedText>Zerar contador</ThemedText>
        </Pressable>

        <ThemedText type="title" style={styles.espacoTopo}>Lista de tarefas</ThemedText>
        <TextInput
          value={nome}
          onChangeText={setNome}
          placeholder="Digite uma tarefa"
          placeholderTextColor="#999"
          style={styles.input}
        />
        <Pressable style={styles.botao} onPress={adicionarNaLista}>
          <ThemedText>Adicionar</ThemedText>
        </Pressable>

        {lista.length === 0 ? (
          <ThemedText>Sua lista está vazia!</ThemedText>
        ) : (
          lista.map((item, index) => (
            <View key={index} style={styles.linhaItem}>
              <ThemedText>• {item}</ThemedText>
              <Pressable onPress={() => removerDaLista(index)}>
                <ThemedText>❌</ThemedText>
              </Pressable>
            </View>
          ))
        )}

        <ThemedView style={styles.containerDesconto}>
          <ThemedText type='title'>Desconto</ThemedText>
          <TextInput
            value={valor}
            onChangeText={setValor}
            placeholder='Digite um Valor'
            placeholderTextColor='#999'
            style={styles.input}
            />
          <Pressable style={styles.botao} onPress={realizarDesconto}>
            <ThemedText>Fazer Desconto</ThemedText>
          </Pressable>
          <ThemedText type='subtitle'>
            Desconto: {descontoTela.toFixed(2)} Valor Total: {resultado.toFixed(2)}
          </ThemedText>
        </ThemedView>

      </ThemedView>

      
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      paddingTop: 60,
      gap: 12,
    },
    containerTexto: {
      padding: 24,
      paddingTop: 60,
      gap: 12,
    },
    containerTitulo: {
      padding: 24,
      paddingTop: 60,
      gap: 12,
    },
    containerDesconto: {
      padding: 24,
      paddingTop: 60,
      gap: 12,
    },
    espacoTopo: {
      marginTop: 24,
    },
    botao: {
      borderRadius: 5,
      backgroundColor: 'blue',
      padding: 10,
      alignItems: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      color: '#333',
    },
    linhaItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 8,
    },
  });