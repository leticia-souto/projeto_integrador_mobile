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
      style={styles.botaoConcluir}
      onPress={() => aoAlternarConcluida(desejo.id)}
    >
      <Text style={styles.textoBotaoConcluir}>
        {desejo.concluida ? "Concluído" : "Concluir"}
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
    backgroundColor: "#FFFFFF", 
    borderRadius: 18, 
    padding: 16, 
    marginBottom: 12, 
    flexDirection: "row", 
    alignItems: "center", 
    shadowColor: "#3F3852", 
    shadowOffset: { width: 0, height: 3, }, 
    shadowOpacity: 0.08, 
    shadowRadius: 8, 
    elevation: 3,
  },
  textoContainer: {
    flex: 1, 
    paddingRight: 10,
  },
  texto: {
    flex: 1, 
    color: "#3F3852", 
    fontSize: 16, 
    fontWeight: "600", 
    lineHeight: 22,
  },
  textoConcluido: {
    color: "#9A94A5", 
    textDecorationLine: "line-through",
  },
  botaoExcluir: {
    backgroundColor: "#E98B9B", 
    paddingHorizontal: 12, 
    paddingVertical: 9, 
    borderRadius: 11,
  },
  textoBotaoExcluir: {
    color: "#FFFFFF", 
    fontSize: 12, 
    fontWeight: "700",
  },
  botaoEditar: {
    backgroundColor: "#C9B8F4", 
    paddingHorizontal: 12, 
    paddingVertical: 9, 
    borderRadius: 11,
  },
  textoBotaoEditar: {
    color: "#3F3852", 
    fontSize: 12, 
    fontWeight: "700",
  },
})