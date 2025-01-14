import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import * as YUP from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Formik } from 'formik';

const passwordSchema = YUP.object().shape({
  passwordLength: YUP.number()
    .min(4, 'Min of 4 characters required!')
    .max(16, 'Max 16 characters allowed!')
    .required('Length is required!'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setupperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const generatePasswordString = (passwordLength : number) => {
    let charList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';
    if (upperCase) charList += upperCaseChars;
    if (lowerCase) charList += lowerCaseChars;
    if (numbers) charList += digitChars;
    if (symbols) charList += specialChars;

    const passwordResult = createPassword(charList, passwordLength);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters :string, passwordLength :number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(charIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(true);
    setupperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    text: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
  };

  return (
    <View style={[styles.appContainer, dynamicStyles.container]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={dynamicStyles.container}>
        <SafeAreaView style={styles.formContainer}>
          <Text style={[styles.title, dynamicStyles.text]}>
            Password Generator
          </Text>

          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={passwordSchema}
            onSubmit={(values) => {
              generatePasswordString(Number(values.passwordLength));
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={[styles.heading, dynamicStyles.text]}>
                      Password Length
                    </Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>{errors.passwordLength}</Text>
                    )}
                  </View>
                  <TextInput
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                    style={[
                      styles.inputStyle,
                      {
                        backgroundColor: isDarkMode ? '#222222' : '#F5F5F5',
                        color: isDarkMode ? '#FFFFFF' : '#000000',
                      },
                    ]}
                  />
                </View>
                 
                <View style={styles.inputWrapper}>

                  <Text style={styles.heading}>Include Lowercase</Text>
                  <View>
                  <BouncyCheckbox
                  useBuiltInState = {false}
                  isChecked = {lowerCase}
                  onPress={()=> setLowerCase(!lowerCase)}
                  fillColor='#29AB87'

                   />
                  </View>
                  
                </View>


                <View style={styles.inputWrapper}>

                  <Text style={styles.heading}>Include Uppercase</Text>
                  <View>
                  <BouncyCheckbox
                  useBuiltInState = {false}
                  isChecked = {upperCase}
                  onPress={()=> setupperCase(!upperCase)}
                  fillColor='#FED85D'

                   />
                  </View>
                  
                </View>


                <View style={styles.inputWrapper}>

                  <Text style={styles.heading}>Include Special Symbols</Text>
                  <View>
                  <BouncyCheckbox
                  useBuiltInState = {false}
                  isChecked = {symbols}
                  onPress={()=> setSymbols(!symbols)}
                  fillColor='#29AB87'

                   />
                  </View>
                  
                </View>



                <View style={styles.inputWrapper}>

                  <Text style={styles.heading}>Include Lowercase</Text>
                  <View>
                  <BouncyCheckbox
                  useBuiltInState = {false}
                  isChecked = {numbers}
                  onPress={()=> setNumbers(!numbers)}
                  fillColor='#FED85D'

                   />
                  </View>
                  
                </View>


                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={()=>{
                      handleSubmit()}}>
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={()=>{
                      handleReset();
                      resetPasswordState();
                      
                      }}>
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          
            {isPasswordGenerated && (
              <View style={styles.card}>
              <Text style={styles.pressTitle}>Long Press to Copy</Text>
              <Text selectable style={styles.generatedPass}>{password}</Text> 
              </View>)}
        
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    width : "100 %"
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: "space-between",
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    color : "white",
    justifyContent : "center"
  },
  card : {
    justifyContent:"center",
    alignItems : "center",
    margin : 12,
    height:100,
    backgroundColor : "#FED85D",
    borderRadius : 4
  },
  pressTitle : {
    fontSize : 18,
    fontWeight : "bold",
    marginBottom : 8
  },
  generatedPass : {
    fontSize : 16,
    backgroundColor : "#CAD5E2",
    paddingVertical : 8,
    paddingHorizontal : 12,
    color : "white"
  }
});
