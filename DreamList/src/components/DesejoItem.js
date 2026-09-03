import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DesejoItem({
  desejo,
  aoAlternarConcluida,
  aoExcluir,
  aoEditar,
  aoAvaliar,
}) {
  return (
    <View style={styles.item}>

      <TouchableOpacity
        style={styles.textoContainer}
        onPress={() => aoAlternarConcluida(desejo.id)}
      >
        <Text
          style={[
            styles.texto,
            desejo.concluida && styles.textoConcluido,
          ]}
        >
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

      <View style={styles.linhaBotoes}>

        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={() => aoExcluir(desejo.id)}
        >
          <Text style={styles.textoBotaoExcluir}>
            Excluir
          </Text>
        </TouchableOpacity>

        {desejo.concluida ? (
          <View style={styles.avaliacao}>
            {[1, 2, 3, 4, 5].map((numero) => (
              <TouchableOpacity
                key={numero}
                onPress={() => aoAvaliar(desejo.id, numero)}
              >
                <Text style={styles.estrela}>
                  {numero <= (desejo.avaliacao || 0) ? "★" : "☆"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.botaoEditar}
            onPress={() => aoEditar(desejo)}
          >
            <Text style={styles.textoBotaoEditar}>
              Editar
            </Text>
          </TouchableOpacity>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,

    shadowColor: "#3F3852",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  textoContainer: {
    width: "100%",
    marginBottom: 14,
  },

  texto: {
    color: "#3F3852",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
  },

  textoConcluido: {
    color: "#9A94A5",
    textDecorationLine: "line-through",
  },

  botaoConcluir: {
    width: "100%",
    height: 38,
    backgroundColor: "#A8DCC8",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  textoBotaoConcluir: {
    color: "#3F3852",
    fontSize: 13,
    fontWeight: "700",
  },

  linhaBotoes: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
  },

  botaoExcluir: {
    flex: 1,
    height: 38,
    backgroundColor: "#E98B9B",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotaoExcluir: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  botaoEditar: {
    flex: 1,
    height: 38,
    backgroundColor: "#C9B8F4",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotaoEditar: {
    color: "#3F3852",
    fontSize: 13,
    fontWeight: "700",
  },

  avaliacao: {
    flex: 1,
    height: 38,
    backgroundColor: "#FAF8FF",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },

  estrela: {
    color: "#9B7EDE",
    fontSize: 22,
  },
});