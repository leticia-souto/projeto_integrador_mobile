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

export default function ListaDesejosScreen(){
    const [desejo, setDesejo] = useState([])
    const [textoInput, setTextoInput] = useState("");
    const [carregando, setCarregando] = useState(true);

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
        console.error("Erro ao salvar desejo no storage: ", erro);
      },
    );
  }, [desejo, carregando]);

  function adicionarDesejo() {
    const texto = textoInput.trim();

    if (texto === "") return;

    const novoDesejo = {
      id: Date.now().toString(),
      texto,
      concluida: false,
    };

    setDesejo((desejoAtuais) => [...desejoAtuais, novoDesejo]);

    setTextoInput("");
  }

}