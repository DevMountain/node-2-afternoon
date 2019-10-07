import React, { Component } from "react";
import './Message.css';

import FaTrash from "react-icons/lib/fa/trash";
import FaPencil from "react-icons/lib/fa/pencil";

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      text: this.props.text
    };

    this.handleChange = this.handleChange.bind( this );
    this.edit = this.edit.bind( this );
  }

  handleChange( event ) {
    this.setState({ text: event.target.value });
  }

  edit( event ) {
    const { text } = this.state;
    const { id, edit } = this.props;
    if( event.key === "Enter" && text.length !== 0 ) {
      edit( id, text );
      this.setState({ editting: false });
    }
  }

  render() {
    const { id, text, time, edit, remove } = this.props;
    const { editing } = this.state;
    console.log( id, text );
    return (
      <div className="Message__container">
        <span className="Message__time">{time}</span>
        {
          editting
          ?
            <input className="Message__input" value={ this.state.text } onChange={ this.handleChange } onKeyPress={ this.edit } />
          :
            <span className="Message__text">{text}</span>
        }
        <span className="Message__edit" onClick={ () => this.setState({ editing: !editing, text }) }> <FaPencil /> </span>
        <span className="Message__delete" onClick={ () => remove( id ) }> <FaTrash /> </span>
      </div>
    )
  }
}
