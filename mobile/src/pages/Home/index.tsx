import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground,View, Image, Text } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

interface State {
  label: string;
  value: any;
}

interface City {
  label: string;
  value: any;
}

const Home = () => {
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [selectedState, setSelectedState] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const navigation = useNavigation();

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
      const stateInitials = response.data.map(state => ({ label: state.sigla, value: state.sigla }));

      setStates(stateInitials);
    })
  }, []);

  useEffect(() => {
    if (selectedState === '0') {
      return;
    }
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios?orderBy=nome`).then(response => {
      const cityNames = response.data.map(city => ({ label: city.nome, value: city.nome }));
      setCities(cityNames);
    })
  }, [selectedState]);

  function handleNavigateToPoint() {
    navigation.navigate('Points', {
      state: selectedState,
      city: selectedCity
    });
  }

  return(
    <ImageBackground
     source={require('../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
      </View>

      <View style={styles.footer}>
        <RNPickerSelect
          placeholder={{
            label: 'Selecione um Estado',
            value: null
          }}
          onValueChange={value => setSelectedState(value)}
          items={states}
          style={pickerSelectStyles}
        />

        <RNPickerSelect
          placeholder={{
            label: 'Selecione uma Cidade',
            value: null
          }}
          onValueChange={value => setSelectedCity(value)}
          items={cities}
          style={pickerSelectStyles}
        />
        
        <RectButton style={styles.button} onPress={handleNavigateToPoint}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name='arrow-right' color='#FFF' size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor:'#f0f0f5'
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
});

export default Home;
