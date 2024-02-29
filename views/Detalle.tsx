import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';
import axios from 'axios';
import People from '../types/People';
import styles from '../styles';
import {urlBase} from './Inicio';

const Detalle = ({navigation, route}) => {
  const [personaje, setPersonaje] = useState<People>();
  const CargarPersonaje = async () => {
    const codigo = route.params.codigo;
    const resultados = await axios.get(`${urlBase}people/${codigo}/`);
    if (resultados.data) {
      setPersonaje(resultados.data);
    }
  };

  useEffect(() => {
    CargarPersonaje();
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Image
          style={styles.fotoPersonajeEnFicha}
          source={{
            uri: `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${route.params.codigo}.jpg`,
          }}
        />
        <Text>{personaje?.name}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Detalle;
