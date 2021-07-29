import React, { useState } from 'react';
import '../App.css';
import '../utilities/zoomChatParser';
import { zoomChatParser } from '../utilities/zoomChatParser';

function InputBox (props: any) {

     const [input, setInput] = useState('Insert Zoom Chat Here');
      
     const handleChange = (event: any) => {
          setInput(event.target.value);
     }
     const handleSubmit = (event: any) => {
          alert(JSON.stringify(zoomChatParser(input)));
          event.preventDefault();
     }
          return (
               <form onSubmit={handleSubmit}>
               <label>
                    Zoom Chat:
               </label>
               <br/>
               <textarea 
                    value={input} 
                    onChange={handleChange} />
               <br/>
               <input type="submit" value="Submit" />
          </form>
          )
}
export default InputBox;