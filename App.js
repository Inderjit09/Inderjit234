import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';

export default class App extends React.Component {

  constructor(props){
      super(props);

      this.state = {
        gameState: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
        currentPlayer: 1,
        playerName: 1,
      }
      
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({gameState:
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],currentPlayer: 1,
  });
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch(value)
    {
      case 1:
        return <Icon name="close" style={styles.tileX}></Icon>

      case -1:
        return <Icon name="circle-outline" style={styles.tileO}></Icon>

      default: return <View/>
    }
  }


  onTilePress = (row, col) => {

    //don't allow value to change
      var value = this.state.gameState[row][col];
      if(value !== 0) {return; }

      // grab current player
      var currentPlayer = this.state.currentPlayer;

      //set the correct tile
      var array = this.state.gameState.slice();
      array[row][col] = currentPlayer;
      this.setState({gameState: array});

      //swich to other player
      var nextPlayer = (currentPlayer == 1) ? -1 : 1;
      this.setState({currentPlayer: nextPlayer});

      // var playerName = (currentPlayer == 1);
      if(currentPlayer == 1)
      {this.setState({playerName: 2}); }
      else if(currentPlayer == -1)
      {this.setState({playerName: 1}); }


      //check winner
      var winner = this.getWinner();

      if(winner === 1) {
        Alert.alert("Player 1 is the winner");
        this.initializeGame();
      }
      else if(winner === -1) {
        Alert.alert("Player 2 is the winner");
        this.initializeGame();
      }
  }

  getWinner = () => {
    const NUM_TILES = 3;
    var array = this.state.gameState;
    var sum;

    //check rows
    for(var i=0; i<NUM_TILES; i++){
        sum = array[i][0] + array[i][1] + array[i][2];
        if(sum == 3) { return 1; }
        else if(sum == -3) { return -1; }
    }

    //check columns
    for(var i=0; i<NUM_TILES; i++){
        sum = array[0][i] + array[1][i] + array[2][i];
        if(sum == 3) { return 1; }
        else if(sum == -3) { return -1; }
    }

    // check diagonally
    sum = array[0][0] + array[1][1] + array[2][2];
    if(sum == 3) { return 1; }
    else if(sum == -3) { return -1; }

    sum = array[0][2] + array[1][1] + array[2][0];
    if(sum == 3) { return 1; }
    else if(sum == -3) { return -1; }

    // if no winner
    return 0;
   

  }

  onNewGamePress = () =>
  {
    this.initializeGame();
  }
 
  render()
  {

  return (
    <View style={styles.container}>
  
      <Text style={[ {fontSize: 24,}]}>Player {this.state.playerName} 's turn</Text>
    
      <View style={{paddingTop:40}}/>

        <View style={{flexDirection: "row", alignItems:"center", justifyContent:"center"}}>

          <TouchableOpacity onPress={() => this.onTilePress(0,0)} 
            style={[styles.tile, {borderTopWidth: 0, borderLeftWidth: 0}]}>
              {this.renderIcon(0, 0)}
          </TouchableOpacity>

          <TouchableOpacity  onPress={() => this.onTilePress(0,1)} 
            style={[styles.tile, {borderTopWidth: 0 }]}>
              {this.renderIcon(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity  onPress={() => this.onTilePress(0,2)} 
            style={[styles.tile, {borderTopWidth: 0, borderRightWidth: 0}]}>
              {this.renderIcon(0, 2)}
          </TouchableOpacity>

      </View>

      <View style={{flexDirection: "row"}}>

           <TouchableOpacity onPress={() => this.onTilePress(1,0)} 
            style={[styles.tile, {borderLeftWidth: 0,}]}>
              {this.renderIcon(1, 0)}
           </TouchableOpacity>

           <TouchableOpacity onPress={() => this.onTilePress(1,1)}  
            style={[styles.tile, { }]}>
              {this.renderIcon(1, 1)}
           </TouchableOpacity>

           <TouchableOpacity onPress={() => this.onTilePress(1,2)}  
            style={[styles.tile, {borderRightWidth: 0, }]}>
              {this.renderIcon(1, 2)} 
           </TouchableOpacity>

      </View>

      <View style={{flexDirection: "row"}}>

           <TouchableOpacity onPress={() => this.onTilePress(2,0)}  
            style={[styles.tile, {borderBottomWidth: 0, borderLeftWidth: 0}]}>
              {this.renderIcon(2, 0)}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onTilePress(2,1)}  
              style={[styles.tile, {borderBottomWidth: 0 }]}>
              {this.renderIcon(2, 1)}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onTilePress(2,2)}  
              style={[styles.tile, {borderBottomWidth: 0, borderRightWidth: 0}]}>
              {this.renderIcon(2, 2)}
            </TouchableOpacity>

      </View>

      <View style={{paddingTop:70}}/>

      <Button title="New Game" onPress={this.onNewGamePress}>New Game</Button>

    </View>
  );
  
  }}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile: { 
    borderWidth: 3,
    width: 100, 
    height: 100,
  },

  tileX: {
      color: "red",
      fontSize: 90,
  },

  tileO: {
    color: "green",
    fontSize: 90,
}

});
