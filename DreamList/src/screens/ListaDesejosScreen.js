import { useEffect, useState } from "react";

import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DesejoItem from "../components/DesejoItem";

const CHAVE_STORAGE = "DreamList: desejos";

export default function ListaDesejosScreen() {
  const [desejo, setDesejo] = useState([])
  const [textoInput, setTextoInput] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [desejoEditando, setDesejoEditando] = useState(null);

  useEffect(() => {
    async function carregarDesejos() {
      try {
        const desejosSalvos = await AsyncStorage.getItem(CHAVE_STORAGE);

        if (desejosSalvos !== null) {
          setDesejo(JSON.parse(desejosSalvos));
        }
      } catch (erro) {
        console.error("Erro ao carregar desejos do storage:", erro);
      } finally {
        setCarregando(false);
      }
    }
    carregarDesejos();
  }, []);

  useEffect(() => {
    if (carregando) return;

    AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(desejo)).catch(
      (erro) => {
        console.error("Erro ao salvar desejos no storage: ", erro);
      },
    );
  }, [desejo, carregando]);

  function adicionarDesejo() {
    const texto = textoInput.trim();

    if (texto === "") return;

    if (desejoEditando !== null) {
      setDesejo((desejosAtuais) =>
        desejosAtuais.map((desejo) =>
          desejo.id === desejoEditando
            ? { ...desejo, texto }
            : desejo
        ))

      setTextoInput("")
      setDesejoEditando(null)
      return;
    }

    const novoDesejo = {
      id: Date.now().toString(),
      texto,
      concluido: false,
      avaliacao: 0,
    };

    setDesejo((desejosAtuais) => [...desejosAtuais, novoDesejo]);

    setTextoInput("");
  }

  function editarDesejo(desejo) {
    setTextoInput(desejo.texto)
    setDesejoEditando(desejo.id)

  }

  function alternarConcluida(id) {
    setDesejo((desejosAtuais) => desejosAtuais.map((desejo) => desejo.id === id ? { ...desejo, concluido: !desejo.concluido } : desejo))

  }

  function avaliarDesejo(id, avaliacao) {
    setDesejo((desejosAtuais) =>
      desejosAtuais.map((desejo) =>
        desejo.id === id
          ? {
              ...desejo,
              avaliacao: avaliacao,
            }
          : desejo
      )
    );
  }

  function excluirDesejo(id) {
    setDesejo((desejosAtuais) => desejosAtuais.filter((desejo) => desejo.id !== id))
  }

  function limparDesejos() {
    setDesejo([])
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >

      <Text style={styles.titulo}>DreamList</Text>

      <View style={styles.formulario}>
        <TextInput style={styles.input}
          placeholder="Digite um novo desejo..."
          value={textoInput}
          onChangeText={setTextoInput}
          onSubmitEditing={adicionarDesejo}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={adicionarDesejo}
        >
          <Text style={styles.textoBotaoAdicionar}>
            {desejoEditando !== null ? "Salvar" : "Adicionar"}
          </Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={styles.botaoLimpar}
        onPress={limparDesejos}
      >
        <Text style={styles.textoBotaoLimpar}>
          Limpar todos os Desejos
        </Text>
      </TouchableOpacity>

      <FlatList
        data={desejo}
        keyExtractor={(desejo) => desejo.id}
        renderItem={({ item }) => (
          <DesejoItem
            desejo={item}
            aoAlternarConcluida={alternarConcluida}
            aoExcluir={excluirDesejo}
            aoEditar={editarDesejo}
            aoAvaliar={avaliarDesejo}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>
            Nenhum desejo cadastrado ainda.
          </Text>
        }
        contentContainerStyle={styles.listaConteudo}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#9B7EDE", 
    paddingTop: Platform.OS === "ios" ? 60 : 40, 
    paddingBottom: 28, 
    paddingHorizontal: 24, 
    borderBottomLeftRadius: 28, 
    borderBottomRightRadius: 28,

  },
  titulo: {
    color: "#FFFFFF", 
    fontSize: 30, 
    fontWeight: "800", 
    letterSpacing: 0.3,
  },
  formulario: {
    backgroundColor: "#FFFFFF", 
    borderRadius: 18,
     padding: 8, 
     flexDirection: "row", 
     alignItems: "center", 
     shadowColor: "#3F3852",
  },
  input: {
    flex: 1, 
    height: 48, 
    paddingHorizontal: 14, 
    color: "#3F3852", 
    fontSize: 15,
  },
  botaoAdicionar:{
    backgroundColor: "#9B7EDE", 
    paddingHorizontal: 18, 
    height: 46, 
    borderRadius: 14, 
    justifyContent: "center", 
    alignItems: "center",
  },
  textoBotaoAdicionar:{
    color: "#FFFFFF", 
    fontSize: 14, 
    fontWeight: "700",
  },
  listaConteudo:{
    paddingTop: 18, 
    paddingBottom: 30,
  },
  listaVazia:{
    color: "#3F3852", 
    fontSize: 17, 
    fontWeight: "700", 
    textAlign: "center",
  },
  botaoLimpar:{
    alignSelf: "flex-end", 
    marginTop: 12, 
    paddingVertical: 6, 
    paddingHorizontal: 4,

  },
  textoBotaoLimpar:{
    color: "#9B7EDE", 
    fontSize: 13, 
    fontWeight: "600",

  },
  
})