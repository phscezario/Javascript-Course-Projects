import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import * as S from './styles';

function App() {

  const url = 'http://localhost:5000/message';

  const [ messages, setMessages ] = useState([]);
  const [ currentInfos, setCurrentInfos ] = useState([]);
  const [ formName, setFormName ] = useState('');
  const [ formOrigin, setFormOrigin ] = useState('');
  const [ formQuote, setFormQuote ] = useState('');
  const [ render, setRender ] = useState(false);
  
 
  useEffect(async () => {
      const response = await fetch(url);
      const data = await response.json();
      setMessages(data);
      changeMessage(data);
    }, [render]);

     function changeMessage(data) {
      const index = data[Math.floor(Math.random() * data.length)];
      setCurrentInfos(index);
    }

    const sendMessage = () => {
      if(formName.length <= 0 || formOrigin.length <= 0 || formQuote <= 0) {
        alert('Please, fill all fields');
      }
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          characterName: formName,
          characterOrigin: formOrigin,
          message: formQuote
        }),        
      })
      .then(response => response.json())
      .then(data => {
        if(data.id) {
          alert('Your message are registered!');
          setFormName('');
          setFormOrigin('');
          setFormQuote('');
          setRender(true);
          
        }
      });
    }
  
    return (
      <S.Wrapper>
        <S.Container>
          <S.Title>Insert Quote</S.Title>
          <S.Label>Name:</S.Label>
          <S.Input id="name" value={formName} onChange={e => {setFormName(e.target.value)}}></S.Input>
          <S.Label>Origin:</S.Label>
          <S.Input id="origin" value={formOrigin} onChange={e => {setFormOrigin(e.target.value)}}></S.Input>
          <S.Label>Quote:</S.Label>
          <S.Textarea id="textarea" value={formQuote} onChange={e => {setFormQuote(e.target.value)}}></S.Textarea>
          <S.RowLeft>
            <S.Button onClick={sendMessage}>Insert Quote</S.Button>
          </S.RowLeft>
          <S.Title>Read Character Quotes</S.Title>
          <Card 
            title={currentInfos.characterName}
            subtitle={currentInfos.characterOrigin}
            text={currentInfos.message}
          />
          <S.RowRight>
            <S.Button onClick={() => changeMessage(messages)}>Reload</S.Button>
          </S.RowRight>
        </S.Container>
      </S.Wrapper>    
    );
  }

  export default App;
