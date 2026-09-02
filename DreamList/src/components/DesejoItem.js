import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DesejoItem({ desejo, aoAlternarConcluida, aoExcluir, aoEditar }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.textoContainer}
        onPress={() => aoAlternarConcluida(desejo.id)}
      >
        <Text style={[styles.texto, desejo.concluida && styles.textoConcluido]}>
          {desejo.texto}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={() => aoExcluir(desejo.id)}
      >
        <Text style={styles.textoBotaoExcluir}>Excluir</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoEditar}
        onPress={() => aoEditar(desejo)}
      >
        <Text style={styles.textoBotaoEditar}>Editar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {

  },
  textoContainer: {

  },
  texto: {

  },
  textoConcluido: {

  },
  botaoExcluir: {

  },
  textoBotaoExcluir: {

  },
  botaoEditar: {

  },
  textoBotaoEditar: {

  },
})