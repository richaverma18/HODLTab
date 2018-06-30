import decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';


import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-config';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const SCOPE = 'openid profile email';
const AUDIENCE = 'AUDIENCE_ATTRIBUTE';

var auth = new auth0.WebAuth({
  clientID: AUTH_CONFIG.clientId,
  domain: AUTH_CONFIG.domain
});

export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.callbackUrl,
    //audience: AUDIENCE,
    scope: SCOPE
  });
}

export function logout() {
  clearIdToken();
  clearAccessToken();

}

export function getProfile() {
  var accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    console.log('Access Token must exist to fetch profile');
  }

  return auth.client.userInfo(accessToken, function(err, profile) {
      console.log("profile");
      console.log(profile);
      if (profile) {
        return profile;

      }
    });
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/'});
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function getUserInfo(){
  let idToken = getIdToken();

  if (!idToken) {
    // console.log('Access Token must exist to fetch profile');
    return null;
  }else{
      return decode(idToken);
  }
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);
  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
