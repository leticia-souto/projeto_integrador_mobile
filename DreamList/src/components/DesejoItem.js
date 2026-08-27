import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DesejoItem({ desejo, concluida, excluir }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.textoContainer}
        onPress={() => concluida(desejo.id)}
      >
        <Text style={[styles.texto, desejo.concluida && styles.textoConcluido]}>
          {desejo.texto}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={() => excluir(desejo.id)}
      >
        <Text style={styles.textoBotaoExcluir}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}