import React, { useState, useEffect, useContext, createContext } from 'react';
import cookie from 'js-cookie';

import firebase from './firebase';
import { createUser } from './db';
import Router from 'next/router';
import { Seller } from 'types/seller';

const authContext = createContext(null);

export function AuthProvider({ children }: any) {
  const auth = useProvideAuth();
  return (<authContext.Provider value={auth}> {children} </authContext.Provider>);
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      // extract the token property from the user object
      const { token, ...userWithoutToken } = user;
      console.log('handle user create');
      console.log(userWithoutToken);
      
      setUser(user);

      cookie.set('fast-feedback-auth', true, {
        expires: 1
      });

      return user;
    } else {
      console.log('here????');
    //  Router.push('/');
      // when we log out
      setUser(false);
      cookie.remove('fast-feedback-auth');

      return false;
    }
  };

  const signinWithGitHub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response.user))
      .then((_) => {
        console.log('sign in success');
        console.log(_);
        Router.push('/dashboard');
      })
      .catch((err) => {
        console.log('sign in error');
        console.log(err);
        // pop up some kind of error
      })
  };

  const signinWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => handleUser(response.user))
      .then((_) => {
        console.log('sign in success');
        console.log(_);
        Router.push('/dashboard');
      })
      .catch((err) => {
        console.log('sign in error');
        console.log(err);
        // pop up some kind of error
      })
  };

  const signinWithEmail = (seller: Seller) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(seller.email, seller.password)
      .then((response) => handleUser(response.user, seller))
      .then((_) => {
        console.log('sign in success');
        console.log(_);
        Router.push('/seller-dashboard');
      })
      .catch((err) => {
        console.log('sign in error');
        console.log(err);
        // pop up some kind of error
      });
  }

  const createUserWithEmailAndPassword = (seller: Seller) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(seller.email, seller.password)
      .then(async (_) => {
        await _.user?.updateProfile({
          displayName: seller.name
        });

        return _;
      })
      .then((response) => handleUser(response.user))
      .then((_) => {
        console.log('sign in success');
        console.log(_);
        if (_) {
          createUser(_.uid, {
            uid: _.uid,
            email: _.email,
            name: seller.name,
            provider: 'email',
            photoUrl: _.photoUrl,
            address: seller.address,
            phone: seller.phone
          });
        }
        

        Router.push('/seller-dashboard');
      })
    }

    const loginUserWithEmailAndPassword = (email: string, password: string) => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (_) => {
          
  
          return _;
        })
        .then((response) => handleUser(response.user))
        .then((_) => {
          
          
  
          Router.push('/seller-dashboard');
        });
      }

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(async () => {
        
        await handleUser(false);
        Router.push('/dashboard'); 
      }
      );
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGitHub,
    signinWithGoogle,
    signout,
    signinWithEmail,
    createUserWithEmailAndPassword,
    loginUserWithEmailAndPassword
  };
}

const formatUser = async (user) => {
  // let x = await user.getIdToken();
  // console.log(x);
  console.log('format user');
  console.log(user);
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: await user.getIdToken(),
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  };
};