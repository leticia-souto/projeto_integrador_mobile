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
import TarefaItem from "../components/DesejoItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      concluida: false,
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

  function excluirDesejo(id) {
    setDesejo((desejosAtuais) => desejosAtuais.filter((desejo) => desejo.id !== id))
  }

  function limparDesejos() {
    setDesejo([])
  }

  return(
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : undefined}
    >

    </KeyboardAvoidingView>
  )
}