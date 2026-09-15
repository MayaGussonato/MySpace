import { StyleSheet, Platform } from 'react-native';

export const cores = {
  fundo: '#FFFFFF',
  vinho: '#7B1B27',
  texto: '#1E1E1E',
  placeholder: '#B3B0B8',
  borda: '#E3E1E6',
  contador: '#B3B0B8',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 18,
  },
  botaoVoltar: {
    width: 40,
    padding: 4,
  },
  titulo: {
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
    fontSize: 17,
    color: cores.texto,
    fontFamily: 'Inter_600SemiBold',
  },
  caixa: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    minHeight: 260,
  },
  pergunta: {
    fontSize: 16,
    color: cores.texto,
    marginBottom: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  campoTexto: {
    flex: 1,
    fontSize: 15,
    color: cores.texto,
    fontFamily: 'Inter_400Regular',
    textAlignVertical: 'top',
  },
  contador: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: cores.contador,
    fontFamily: 'Inter_400Regular',
    marginTop: 8,
  },
  acoes: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  acao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  iconeAcao: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  iconeFeather: {
    marginRight: 6,
  },
  rotuloAcao: {
    fontSize: 13,
    color: cores.texto,
    fontFamily: 'Inter_500Medium',
  },
});