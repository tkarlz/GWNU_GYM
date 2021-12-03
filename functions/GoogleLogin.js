import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { webClientId } from './PrivateData';

const SignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    await firebase.auth().signInWithCredential(googleCredential);

    const user = firebase.auth().currentUser
    console.log(user) // for Testing..
    if (user?.email.match(/.*@gwnu.ac.kr$/i)) {
      const data = {
        name: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        creationTime: user.metadata.creationTime,
      };

      await firestore().collection('Users').doc(user.uid).set(data, { merge: true });
    } else {
      try {
        await user.delete()
      } catch {
        await user.reauthenticateWithCredential(googleCredential)
        await user.delete()
      }

      await GoogleSignin.revokeAccess()
    }

  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
}

const GetUserInfo = () => {
  const [authUser, setAuthUser] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    const unlisten = firebase.auth().onAuthStateChanged(authUser =>
      authUser && mountedRef.current ? setAuthUser(authUser) : setAuthUser(null)
    )
    return () => {
      mountedRef.current = false;
      unlisten()
    }
  }, []);

  return authUser
}

const SignOut = async () => {
  try {
    LoginConfigure()// for Testing..
    await GoogleSignin.revokeAccess()// for Testing..
    await firebase.auth().signOut()
  } catch (e) {
    // signout error
  }
}

const LoginConfigure = () => {
  GoogleSignin.configure({
    webClientId: webClientId,
    offlineAccess: true,
  })
}

const LoginButton = (props) => {
  return (
    <View {...props}>
      <GoogleSigninButton
        style={{ width: 312, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={SignIn}
      />
    </View>
  )
}

export {
  SignIn,
  GetUserInfo,
  SignOut,
  LoginConfigure,
  LoginButton
};
