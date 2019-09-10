import React, { Component } from 'react';


function Pending(props) {
  return (
    <div>
      <p>Pending</p>
      <a id="blackHref" data-toggle="collapse" href={"#collapseSubmit" + props.index} aria-expanded="false" aria-controls={"#collapseSubmit" + props.index}>&#10004;</a>
      <div className="collapse" id={"collapseSubmit" + props.index}>
        <div className="card card-body">
          <textarea type="text" 
                  className="form-control" 
                  name="description" 
                  value={props.submitMessage}
                  onChange={props.handleChange}
                  placeholder="Enter a message to display on your completed block."></textarea>
          <input onClick={props.completeBlock} type="submit" id="completeButton" className="btn btn-primary" value="Complete"/>
        </div>
      </div>
    </div>
  );
}
  


function Complete(props) {
  return (
    <div>
      <a id="blackHref" data-toggle="collapse" href={"#collapseMessage" + props.index} aria-expanded="false" aria-controls={"#collapseMessage" + props.index}>Completed</a>
      <div className="collapse" id={"collapseMessage" + props.index}>
        <div className="card card-body">
          {props.completionMessage}
        </div>
      </div>
    </div>
  )
}

function PartiallyComplete(props) {
  return (
    <div>
      <a id="blackHref" data-toggle="collapse" href={"#collapsePartialMessage" + props.index} aria-expanded="false" aria-controls={"#collapsePartialMessage" + props.index}>Waiting for collaborator's completion</a>
      <div className="collapse" id={"collapsePartialMessage" + props.index}>
        <div className="card card-body">
          {props.completionMessage}
        </div>
      </div>
    </div>
  )
}


export default class Status extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submitMessage : '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.completeBlock = this.completeBlock.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({submitMessage: value});
  }

  completeBlock() {
    this.props.completeBlock(this.props.id, this.state.submitMessage);
    this.setState({submitMessage: ''});
  }
  

  render() {
    let status;
    const { completionLevel, owner, collaborator } = this.props.block.attrs;
    if (completionLevel === 3) {
      status = <Complete index={this.props.index} completionMessage={this.props.completionMessage} />;
    } else if ((completionLevel === 1 && this.props.username === owner) || (completionLevel === 2 && this.props.username === collaborator)) {
      status = <PartiallyComplete completionMessage = {this.props.completionMessage} />
    } else {   
      status = <Pending index={this.props.index} 
                        submitMessage={this.state.submitMessage}
                        completeBlock = {this.completeBlock}
                        handleChange = {this.handleChange} />
    }

    return (
      <div> 
        {status}
      </div>
    );
  }

 
}
