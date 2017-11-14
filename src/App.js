import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import Button from './components/Button';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      tableSize :40,
      tableContent: null,
      frameID:null,
      generation: 0 ,
      paused: "no",
    }

    this.onClickCell = this.onClickCell.bind(this);
    this.getAdjacentCellsID = this.getAdjacentCellsID.bind(this);
    this.getAdjacentCellsObject = this.getAdjacentCellsObject.bind(this);
    this.runGame = this.runGame.bind(this);
    this.onClickPlay = this.onClickPlay.bind(this);
    this.onClickPause = this.onClickPause.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.onClickRandom = this.onClickRandom.bind(this);
    this.checkLiveCell = this.checkLiveCell.bind(this);
    this.checkDeadCell = this.checkDeadCell.bind(this);

  }

  createTableContent(random){
    let arrTableContent = [];
    for(let x = 0 ; x < Math.pow(this.state.tableSize,2); x++){
      let num = Math.floor(Math.random() * 2) + 1;
      let status = (num===1)?"live":"dead";
      status = (random)?status:"dead";
      arrTableContent.push({x:status, index:x});
    }
    this.setState({tableContent:arrTableContent});
  }

  getAdjacentCellsID(id){
    id = Number(id);
    let adjacentCell = [];
    let tableContentTemp = [...this.state.tableContent];

    let tableSize = this.state.tableSize;

    /**
     * CORNER : TOP-LEFT, BOTTOM-RIGHT, TOP-RIGHT, BOTTOM-LEFT
     */
    if(id === 0){
      adjacentCell.push(tableContentTemp[Math.pow(tableSize,2) - 1]);
      adjacentCell.push(tableContentTemp[Math.pow(tableSize,2) - tableSize]);
      adjacentCell.push(tableContentTemp[Math.pow(tableSize, 2) - tableSize + 1]);
      adjacentCell.push(tableContentTemp[tableSize - 1]);
      adjacentCell.push(tableContentTemp[id + 1]);
      adjacentCell.push(tableContentTemp[tableSize * (2 - 1)]);
      adjacentCell.push(tableContentTemp[id + tableSize]);
      adjacentCell.push(tableContentTemp[id + tableSize + 1]);
      return adjacentCell;
    }

    if (id === Math.pow(tableSize,2) - 1 ) {
      adjacentCell.push(tableContentTemp[id - tableSize + 1]);
      adjacentCell.push(tableContentTemp[id - tableSize]);
      adjacentCell.push(tableContentTemp[Math.pow(tableSize,2) - (tableSize * 2)]);
      adjacentCell.push(tableContentTemp[id - 1]);
      adjacentCell.push(tableContentTemp[Math.pow(tableSize,2) - tableSize - 2]);
      adjacentCell.push(tableContentTemp[tableSize - 2]);
      adjacentCell.push(tableContentTemp[tableSize - 1]);
      adjacentCell.push(tableContentTemp[0]);
      return adjacentCell;
    }

    if (id === tableSize - 1) { 
      adjacentCell.push(tableContentTemp[Math.pow(tableSize, 2) - 1]); //
      adjacentCell.push(tableContentTemp[Math.pow(tableSize, 2) - 2]); //
      adjacentCell.push(tableContentTemp[Math.pow(tableSize, 2) - tableSize]);//
      adjacentCell.push(tableContentTemp[id - 1]); //
      adjacentCell.push(tableContentTemp[0]);//
      adjacentCell.push(tableContentTemp[id + tableSize - 1]); //
      adjacentCell.push(tableContentTemp[id + tableSize]); //
      adjacentCell.push(tableContentTemp[tableSize]); //
      return adjacentCell;
    }

    if (id === Math.pow(tableSize, 2) - tableSize) { //600
      adjacentCell.push(tableContentTemp[id - 1]);//
      adjacentCell.push(tableContentTemp[id - tableSize + 1]);//
      adjacentCell.push(tableContentTemp[id - tableSize ]);//
      adjacentCell.push(tableContentTemp[Math.pow(tableSize, 2) - 1]); //
      adjacentCell.push(tableContentTemp[id + 1]);//
      adjacentCell.push(tableContentTemp[tableSize - 1 ]);//
      adjacentCell.push(tableContentTemp[0]);
      adjacentCell.push(tableContentTemp[1]); 
      return adjacentCell;
    }

     /**
     * EDGE : TOP, BOTTOM, RIGHT, LEFT
     */
    
    if (id >= 1 && id <= tableSize - 2){
      adjacentCell.push(tableContentTemp[Math.pow(tableSize, 2) - tableSize + id + 1]);
      adjacentCell.push(tableContentTemp[Math.pow(tableSize, 2) - tableSize + id]);
      adjacentCell.push(tableContentTemp[Math.pow(tableSize, 2) - tableSize + id - 1]);
      adjacentCell.push(tableContentTemp[id - 1]);
      adjacentCell.push(tableContentTemp[id + 1]);
      adjacentCell.push(tableContentTemp[id + tableSize - 1]);
      adjacentCell.push(tableContentTemp[id + tableSize]);
      adjacentCell.push(tableContentTemp[id + tableSize + 1]); 
      return adjacentCell;
    }
    
    if (id >= Math.pow(tableSize, 2) - tableSize + 1 && id <= Math.pow(tableSize, 2) - 2  ){
      adjacentCell.push(tableContentTemp[id - tableSize + 1]);
      adjacentCell.push(tableContentTemp[id - tableSize]);
      adjacentCell.push(tableContentTemp[id - tableSize - 1]);
      adjacentCell.push(tableContentTemp[id - 1]);
      adjacentCell.push(tableContentTemp[id + 1]);
      adjacentCell.push(tableContentTemp[id - Math.pow(tableSize, 2) + tableSize - 1]);
      adjacentCell.push(tableContentTemp[id - Math.pow(tableSize, 2) + tableSize]);
      adjacentCell.push(tableContentTemp[id - Math.pow(tableSize, 2) + tableSize + 1]);
      return adjacentCell;
    }
    
    if ((id) % tableSize === tableSize-1){
      adjacentCell.push(tableContentTemp[id - tableSize - 1]);
      adjacentCell.push(tableContentTemp[id - tableSize]);
      adjacentCell.push(tableContentTemp[id - (tableSize*2) + 1]);
      adjacentCell.push(tableContentTemp[id - 1]);
      adjacentCell.push(tableContentTemp[id - tableSize + 1]);
      adjacentCell.push(tableContentTemp[id + tableSize - 1]);
      adjacentCell.push(tableContentTemp[id + tableSize]);
      adjacentCell.push(tableContentTemp[id + 1]); 
      return adjacentCell;
    }
    
    if (id % tableSize === 0){
      adjacentCell.push(tableContentTemp[id - 1]);
      adjacentCell.push(tableContentTemp[id - tableSize]);
      adjacentCell.push(tableContentTemp[id - tableSize + 1]);
      adjacentCell.push(tableContentTemp[id + 1]);
      adjacentCell.push(tableContentTemp[id + tableSize]);
      adjacentCell.push(tableContentTemp[id + tableSize - 1]);
      adjacentCell.push(tableContentTemp[id + (tableSize*2) - 1]);
      adjacentCell.push(tableContentTemp[id + tableSize + 1]); 
      return adjacentCell;
    }
    
    /**
     * CENTER
     */
    adjacentCell.push(tableContentTemp[id - tableSize+1]);
    adjacentCell.push(tableContentTemp[id - tableSize]);
    adjacentCell.push(tableContentTemp[id - tableSize-1]);
    adjacentCell.push(tableContentTemp[id - 1]);
    adjacentCell.push(tableContentTemp[id + 1]);
    adjacentCell.push(tableContentTemp[id + tableSize-1]);
    adjacentCell.push(tableContentTemp[id + tableSize]);
    adjacentCell.push(tableContentTemp[id + tableSize+1]); 
    return adjacentCell;
    
  }


  getAdjacentCellsObject(adjacentCell){
    var cellcount = (query) => {
      return adjacentCell.filter((elm) => elm.x === query);
    }
    return ({"dead": cellcount("dead") ,  "live": cellcount("live") } )
  }

  onClickCell(e){
    let id = e.target.id;
    let cls = e.target.className;
    let newCls = (cls === "live") ? "dead" : "live";

    let tableContentTemp = [...this.state.tableContent];
    tableContentTemp[id] = {x : newCls, index: Number(id)};

    this.setState({tableContent:tableContentTemp});

    let a = this.getAdjacentCellsID(id);
    //this.setAdjacentColor(a);
    console.log(a);
    console.log(this.getAdjacentCellsObject(a)); 
  }


  /**
   * Debugging purpose : change color of adjacent cell
   */
  setAdjacentColor(arr){
    let tableContentTemp = [...this.state.tableContent];
    let newCls = "adjacent";
    arr.map((elm,idx)=>{
      tableContentTemp[elm.index] = { x: newCls, index: Number(elm.index) };
    })
    //this.setState({ tableContent: tableContentTemp });
  }
  
  runGame(){
    let tableContentTemp = [...this.state.tableContent];
    let _tableContentTemp = [];
    let _generation = this.state.generation;

    tableContentTemp.map((elm,idx)=>{
      if(elm.x === "dead"){
        let result = this.checkDeadCell(elm.index);
        _tableContentTemp.push({ x: result, index : elm.index })
      }else{
        let result = this.checkLiveCell(elm.index);
        _tableContentTemp.push({x : result, index : elm.index })
      }
    });
    this.setState({ tableContent: _tableContentTemp});
    let _frameID = requestAnimationFrame(this.runGame);
    this.setState({ frameID: _frameID, generation: _generation + 1 });
  }

  onClickPlay(){
    if(this.state.generation === 0 || this.state.paused ==="yes"){
      this.setState({paused:"no"})
      this.runGame();
    }
  }
  
  onClickPause() {
    let _frameID = this.state.frameID;
    cancelAnimationFrame(_frameID);
    this.setState({paused:"yes"})
  }
 
  onClickReset() {
    let _frameID = this.state.frameID;
    cancelAnimationFrame(_frameID);
    this.setState({ frameID: null, generation: 0, paused: "no" });
    this.createTableContent();
  }

  onClickRandom() {
    let _frameID = this.state.frameID;
    cancelAnimationFrame(_frameID);
    this.setState({ frameID: null, generation: 0, paused: "no" });
    this.createTableContent("random");
  }
  

  checkLiveCell(id){
    //console.log(id);
    let adjacentCellID = this.getAdjacentCellsID(id);
    //console.log(id,adjacentCellID);
    let adjacentCellObject = this.getAdjacentCellsObject(adjacentCellID);
    if (adjacentCellObject.live.length === 2 || adjacentCellObject.live.length === 3){
      return "live";
    } else{
      return "dead";
    }
  }
  
  checkDeadCell(id) {
    //console.log(id);
    let adjacentCellID = this.getAdjacentCellsID(id);
    //console.log(id,adjacentCellID);
    let adjacentCellObject = this.getAdjacentCellsObject(adjacentCellID);
    if (adjacentCellObject.live.length === 3) {
      return "live"
    } else {
      return "dead"
    }
  }

  componentWillMount(){
    this.createTableContent("random");
     
  }

  componentDidMount(){
    if (this.state.tableContent) {
      this.runGame();
    }
  }


  render() {
    if(!this.state.tableContent) return null;
    return (
      <div className="container">
        <div className="head">
          <h1>Conway's Game of Life</h1>
        </div>
        <div className="container-board">
          <Table
            tableContent={this.state.tableContent}
            tableSize={this.state.tableSize}
            onClickCell={this.onClickCell}
          />
        </div>
        <div className="container-button">
          {/* <Button onClickMe = {this.runGame} > Step </Button> */}
          <Button onClickMe={this.onClickPlay} > Play </Button> <br />
          <Button onClickMe={this.onClickPause} > Pause </Button> <br />
          <Button onClickMe={this.onClickReset} > Clear </Button> <br />
          <Button onClickMe={this.onClickRandom} > Random </Button> <br />
          <br/>
          <div className="generation">
            <strong>Generation</strong>
            <br />
            <br />
            {this.state.generation}
          </div>
        </div>
        <div className="container-footer">
          <p>
            Created by : Eka ( 
            <a href='https://codepen.io/risyana/'>Codepen</a> - 
            <a href='https://www.freecodecamp.org/risyana'> FCC</a> )
          </p>
        </div>
      </div>
    );
  }
}

export default App;
