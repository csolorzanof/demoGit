import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import People from '../types/People';
import axios from 'axios';
import PeopleResult from '../types/PeopleResult';
import FichaListaPersonaje from '../components/FichaListaPersonaje';
import styles from '../styles';

const ArregloPersonasInicial: People[] = [];
export const urlBase = 'https://swapi.dev/api/';
const Inicio = ({navigation}) => {
  const [personajes, setPersonajes] = useState(ArregloPersonasInicial);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');
  const [cargando, setCargando] = useState(false);
  const refScroll = useRef(null);

  const CargarPersonas = async () => {
    const resultados = await axios.get(`${urlBase}people`);
    if (resultados.data) {
      const datos: PeopleResult = resultados.data;
      setCount(datos.count);
      if (datos.next == null) {
        setNext('');
      } else {
        setNext(datos.next);
      }

      if (datos.previous == null) {
        setPrevious('');
      } else {
        setPrevious(datos.previous as string);
      }
      setPersonajes(datos.results);
    }
  };

  const CargarSiguientePagina = async () => {
    if (next !== '') {
      setCargando(true);
      const resultados = await axios.get(next);
      if (resultados.data) {
        const datos: PeopleResult = resultados.data;
        if (datos.next == null) {
          setNext('');
        } else {
          setNext(datos.next);
        }
        if (datos.previous == null) {
          setPrevious('');
        } else {
          setPrevious(datos.previous as string);
        }
        setPersonajes([...personajes, ...datos.results]);
      }
    }
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const handleScroll = ({nativeEvent}) => {
    if (isCloseToBottom(nativeEvent)) {
      if (!cargando) {
        console.log('Iniciando carga');
        CargarSiguientePagina();
      }
    }
  };

  useEffect(() => {
    CargarPersonas();
  }, []);

  useEffect(() => {
    console.log('Finalizando carga');
    setCargando(false);
  }, [personajes]);

  const handlePressIrInicio = () => {
    refScroll.current.scrollTo({x: 0, y: 0, animated: true});
  };

  const handlePressPersonaje = (codigo: number) => {
    navigation.navigate('Detalle', {codigo: codigo});
  };
  return (
    <SafeAreaView style={styles.contenedorScroll}>
      <ScrollView
        style={{height: '97%'}}
        onScroll={handleScroll}
        ref={refScroll}>
        {personajes.map((p, index) => {
          return (
            <Pressable onPress={() => handlePressPersonaje(index + 1)}>
              <FichaListaPersonaje
                key={`personaje-${index + 1}`}
                codigo={index + 1}
                personaje={p}
              />
            </Pressable>
          );
        })}
        {cargando && <ActivityIndicator size={'large'} />}
      </ScrollView>
      <Pressable onPress={handlePressIrInicio}>
        <View style={styles.botonIrInicio}>
          <Text style={styles.textoBotonIrInicio}>Ir a Inicio</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Inicio;
