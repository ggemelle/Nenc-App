import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const AndroidSmall = () => {
  return (
    <View style={styles.androidSmall1}>
      <Image
        style={styles.designSemNome21}
        resizeMode="cover"
        source={require('./Design sem nome (2) 1.png')}
      />
      <Text style={styles.noTypo}>SIM</Text>
      <Text style={styles.noTypo}>NÃO</Text>
      <Image
        style={[styles.androidSmall1Child, styles.androidLayout]}
        resizeMode="cover"
        source={require('./Ellipse 3.png')}
      />
      <Image
        style={[styles.androidSmall1Item, styles.androidLayout]}
        resizeMode="cover"
        source={require('./Ellipse 4.png')}
      />
      <Text style={[styles.no1, styles.no1Typo]}>NÃO</Text>
      <Text style={[styles.sim1, styles.no1Typo]}>SIM</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  androidLayout: {
    height: 135,
    width: 135,
    top: 196,
    position: 'absolute',
  },
  no1Typo: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    color: '#000',
    fontSize: 40,
    left: 229,
    height: 70,
    width: 140,
    textAlign: 'center',
    fontFamily: 'BakbakOne-Regular',
    textTransform: 'uppercase',
    position: 'absolute',
  },
  designSemNome21: {
    top: 20,
    left: -345,
    width: 50,
    height: 50,
    position: 'absolute',
  },
  noTypo: {
    height: 70,
    width: 140,
    textAlign: 'center',
    color: '#7834c4',
    fontFamily: 'BakbakOne-Regular',
    textTransform: 'uppercase',
    fontSize: 50,
    left: 126,
    top: 390,
    position: 'absolute',
  },
  androidSmall1Child: {
    left: -577,
  },
  androidSmall1Item: {
    left: -193,
  },
  no1: {
    top: 579,
  },
  sim1: {
    top: 195,
  },
  androidSmall1: {
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    height: 640,
    overflow: 'hidden',
  },
});

export default AndroidSmall;