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
    
}