import React from 'react';
import People from '../types/People';
import {Image, Text, View} from 'react-native';
import styles from '../styles';

type FichaListaPersonajeProps = {
  codigo: number;
  personaje: People;
};
//https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/1.jpg
const FichaListaPersonaje = (props: FichaListaPersonajeProps) => {
  return (
    <View style={styles.contenedorFicha}>
      <Image
        style={styles.fotoPersonajeEnFicha}
        source={{
          uri: `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${props.codigo}.jpg`,
        }}
      />
      <View style={styles.contenedorDatosGenerales}>
        <Text style={styles.nombreEnFicha}>{props.personaje.name}</Text>
        <Text style={styles.datosGeneralesFicha}>
          Altura: {props.personaje.height}
        </Text>
        <Text style={styles.datosGeneralesFicha}>
          Año de Nacimiento: {props.personaje.birth_year}
        </Text>
      </View>
    </View>
  );
};

export default FichaListaPersonaje;
