import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import { Link } from 'expo-router';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Handle the sign-in logic
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button label="Sign In" handlePress={handleSignIn} isLoading={false} />
      <Text style={styles.linkText}>
        No account? Click here to create{' '}
        <Link href="sign-up" style={styles.link}>
          Sign Up
        </Link>
      </Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  linkText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});
