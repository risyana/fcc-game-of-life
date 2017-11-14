import React, { Component } from 'react'

class Table extends Component {
    render(){
        return(
            <div className='tableContainer'>
                {
                    this.props.tableContent.map((elm, idx) => {
                        if(idx % (this.props.tableSize * 1) ===  0 ){
                            return <div 
                                    onClick = {this.props.onClickCell}
                                    key={idx} 
                                    className={elm.x} 
                                    id={idx} 
                                    style={{"clear":"both"}}
                                    >
                                    </div>
                        }else{
                            return <div 
                                    onClick = {this.props.onClickCell}
                                    key={idx} 
                                    className={elm.x} 
                                    id={idx}
                                    >
                                    </div>
                        }
                    })
                }
            </div>
        );
    }

}

export default Table;