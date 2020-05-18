import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [color, setColor] = useState('')
  const [image, setImage] = useState('')
  const [img, setImg] = useState('')

  /// Функция получения всех параметров
  function startSearch(event) { 
    event.preventDefault()
    if (name.trim()) {
      var animalname = null;
      var animalvalue = null;
      
      animalname = name;
      animalvalue = value;

      let animanlsJSON = {
        name: animalname, 
        value: animalvalue,
      };

      fetch('/api/findmuggers', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(animanlsJSON)
        })
        .then(response => {
          if(!response.ok) {
            throw new Error(response.statusText)
          }
          return response;
        })
            .then(response => response.json())
            .then(result => {
              console.log(result)
              if (result.error !== "Image not found")
              {
                setValue(result.value)
                setWidth(result.width)
                setHeight(result.height)
                setColor(result.color)
                setImage('')
              }
              else
              setImage('Nothing in DB')
            });
    }
  }

  /// Функция получения картинки
  function sendReq(event) {
    event.preventDefault()
    if (name.trim()) {
      var animalname = null;
      var animalvalue = null;
      var imgwidth = null;
      var imgheight = null;
      var imgcolor = null;
      
      animalname = name;
      animalvalue = value;
      imgwidth = width;
      imgheight = height;
      imgcolor = color;

      let animanlsJSON = {
        name: animalname, 
        value: animalvalue,
        width: imgwidth, 
				height: imgheight,
				color: imgcolor
      };

      fetch('/api/muggers', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(animanlsJSON)
        })
        .then(response => {
          if(!response.ok) {
            throw new Error(response.statusText)
          }
          return response;
        })
            .then(response => response.json())
            .then(result => {
              console.log(result)
              if (result.image != null)
              {
                setImage(result.image+'.jpg')
                ///src = '../images/'+ result.image + '.jpg'
                setImg('../images/'+ result.image + '.jpg')
              }
              else
              setImage('Image not found')
            });
    }
  }

  function reset() {
    setName('')
    setValue('')
    setWidth('')
    setHeight('')
    setColor('')
    setImage('')
    setImg('')
  }

  return (
    <div className="wrapper">
      <label>
          Animal Name: 
          <input 
            style={{marginLeft: 4}} 
            value={name} 
            onChange={event => setName(event.target.value)} 
          /><p></p>

          Value: 
          <input 
            style={{marginLeft: 15}} 
            value={value} 
            onChange={event => setValue(event.target.value)} 
          /><p></p>

          Width:
          <input 
            style={{marginLeft: 11}}
            value={width} 
            onChange={event => setWidth(event.target.value)} 
          ></input><p></p>

          Height:
          <input 
            style={{marginLeft: 6}}
            value={height} 
            onChange={event => setHeight(event.target.value)} 
          ></input><p></p>

          Color:
          <input 
            style={{marginLeft: 15}}
            value={color} 
            onChange={event => setColor(event.target.value)}             
          ></input><p></p>  

          Image:
          <input 
            style={{marginLeft: 10}}
            value={image} 
            onChange={event => setImage(event.target.value)}             
          ></input><p></p> 

          <input 
            type="submit" 
            value="Send request" 
            onClick={sendReq}
          />

          <input 
            style={{marginLeft: 20}}
            type="submit" 
            value="Find on server" 
            onClick={startSearch}
          /><p></p>

          <input
            type="submit" 
            value="Reset" 
            onClick={reset}
          /> <p></p>

        <img 
          src={img} 
          onChange={event => setImg(event.target.value)}
        />
      </label>
    </div>
  ); 
}

export default App;
