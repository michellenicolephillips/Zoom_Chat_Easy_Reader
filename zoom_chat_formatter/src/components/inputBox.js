import React from 'react';
import '../App.css';

<h1>Hello</h1>

class InputBox extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               value: 'Insert Zoom Chat Here'
          };

          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
     }
      
     handleChange(event) {
          this.setState({value: event.target.value});
     }
     handleSubmit(event) {
          alert('A Zoom Chat Was Submitted: ' + this.state.value);
          event.preventDefault();
     }
     render() {
          return (
               <form onSubmit={this.handleSubmit}>
               <label>
                    Zoom Chat:
               </label>
               <br/>
               <textarea value={this.state.value} onChange={this.handleChange} />
               <br/>
               <input type="submit" value="Submit" />
          </form>
          )
     }
}
export default InputBox;