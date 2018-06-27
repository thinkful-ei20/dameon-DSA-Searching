import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state={
    numbers: [ 89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 
               32, 26, 2 , 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46,
               87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9 , 70, 81, 27, 97, 82, 6 , 88, 3 , 7 ,
               46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1 , 6 , 7 ,
               64, 43, 9 , 73, 80, 98, 46, 27, 22, 87, 49, 83, 6 , 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5 ],
    count: 0,  

  }

  findValueLinear(number){
    let operations = 1;
    for(let i =0;i<this.state.numbers.length;i++){
      if(number !== this.state.numbers[i] ){
        operations+=1;}
      if(number === this.state.numbers[i]){
        return this.setState({
          count:operations,
        }) ;
      }
    }
    this.setState({
      count:operations,
    })
}

  binarySearch(array, value, start=0, end=array.length-1,operationCount=1) {
    if (start > end) return this.setState({
      count:operationCount,
    });
    let index = Math.floor((start + end) / 2);
    let item = array[index];
    if (item === value) {
      return this.setState({
        count:operationCount,
      });
  }       
    else if (item < value) {
            return this.binarySearch(array, value, index + 1, end,operationCount+1);
        }
    else return this.binarySearch(array, value, start, index - 1,operationCount+1);
  }

  handleSubmitLinear(e){
    e.preventDefault();
    this.setState({
      count:0,
    })
    let value = parseInt(this.input.value,10);
    this.findValueLinear(value);
    this.input.value='';
  }

  handleSubmitBinary(e){
    e.preventDefault();
    this.setState({
      count:0,
    })
    console.log(this.input.value);
    let value = parseInt(this.input.value,10);
    this.binarySearch(this.state.numbers.sort(function compareNumbers(a, b) {
      return a - b;
    }),value);
    this.input.value='';
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
         <form className="form" 
              onSubmit={e=>e.preventDefault(e)}>
          <input type="text" ref={ input => (this.input = input) }/><br/>
          
          <button onClick={(e)=>this.handleSubmitLinear(e)} className='button'>Run Function Linear</button>
          <button onClick={(e)=>this.handleSubmitBinary(e)} className='button'>Run Function Binary</button>
        </form> 

        <p>The operation count is {this.state.count}</p>
      </div>
    );
  }
}

export default App;
