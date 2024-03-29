import { useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import auth from '@react-native-firebase/auth'
import { Box, VStack, Heading, Icon, useTheme, Pressable, Text } from 'native-base'
import Logo from '../assets/logo_primary.svg'
import { Envelope, Key } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

import { Input } from '../components/Input'
import { Button } from '../components/Button'

export function SignIn() {

  const [isLoading, setIsLoading] = useState(false); 
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { colors } = useTheme();

  function handleSignIn() {
    if(!email || !password) {
      return Alert.alert('Entrar', 'Informe e-mail e senha.')
    }

    setIsLoading(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        
        if(error.code === 'auth/invalid-email') {
          return Alert.alert('Entrar', 'E-mail inválido.')
        }

        if(error.code === 'auth/wrong-password') {
          return Alert.alert('Entrar', 'E-mail ou senha inválida.')
        }

        if(error.code === 'auth/user-not-found') {
          return Alert.alert('Entrar', 'E-mail ou senha inválida.')
        }

        return Alert.alert('Entrar', 'Não foi possível entrar.')
      })
  }

  function handleSignUp() {
    navigation.navigate("signUp")
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box flex={1} bg="gray.600">
        <KeyboardAvoidingView behavior="position" enabled>
          <VStack alignItems="center" px={8} pt={24}>
            <Logo />

            <Heading color="gray.100" fontSize="xl" mt={8} mb={6}>
              Acesse sua conta
            </Heading>

            <Input 
              placeholder="E-mail" 
              mb={4}
              InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
              onChangeText={setEmail}
            />
            <Input 
              mb={8}
              placeholder="Senha" 
              InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
              secureTextEntry
              onChangeText={setPassword}
            />

            <Button 
              title='Entrar' 
              mb={6}
              w="full" 
              onPress={handleSignIn} 
              isLoading={isLoading}
            />
            <Pressable mb={8}>
              <Text color="gray.100">
                Ainda não tem uma conta?
                <Text onPress={handleSignUp} color="primary.700"> Cadastre-se</Text>
              </Text>
            </Pressable>
          </VStack> 
        </KeyboardAvoidingView>
      </Box>
    </TouchableWithoutFeedback>       
  )
}