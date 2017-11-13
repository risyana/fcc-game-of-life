import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import Button from './components/Button';
// DRAW TABLES/DIV/SVG 

// EACH TABLE CELL CAN HOLD STATUS EITHER LIVE OR DEAD



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      tableSize :40,
      tableContent: null,
      countDownInterval: null,
      frameID:null,

    }

    this.onClickCell = this.onClickCell.bind(this);
    this.getAdjacentCellsID = this.getAdjacentCellsID.bind(this);
    this.getAdjacentCellsObject = this.getAdjacentCellsObject.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.onClickStart = this.onClickStart.bind(this);
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
  
  onClickButton(){
    let tableContentTemp = [...this.state.tableContent];
    let _tableContentTemp = [];

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
    let _frameID = requestAnimationFrame(this.onClickButton);
    this.setState({ frameID: _frameID });
  }

  onClickStart(){
    this.onClickButton();
  }
  
  onClickPause() {
    let _frameID = this.state.frameID;
    cancelAnimationFrame(_frameID);
  }
 
  onClickReset() {
    let _frameID = this.state.frameID;
    cancelAnimationFrame(_frameID);
    this.setState({ _frameID: null });
    this.createTableContent();
  }

  onClickRandom() {
    let _frameID = this.state.frameID;
    cancelAnimationFrame(_frameID);
    this.setState({ _frameID: null });
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

  componentDidMount(){
    this.createTableContent();
  }

  render() {
    if(!this.state.tableContent) return null;
    return (
      <div className="header">
        <Table 
          tableContent = {this.state.tableContent} 
          tableSize = {this.state.tableSize} 
          onClickCell = {this.onClickCell}
        />
        <br/>
        {/* <Button onClickMe = {this.onClickButton} > Step </Button> */}
        <Button onClickMe = {this.onClickStart} > Start </Button>
        <Button onClickMe = {this.onClickPause} > Pause </Button>
        <Button onClickMe = {this.onClickReset} > Clear </Button>
        <Button onClickMe = {this.onClickRandom} > Random </Button>
      </div>
    );
  }
}

export default App;
