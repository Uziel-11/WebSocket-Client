import React, {useRef} from "react";
import CanvasDraw from "react-canvas-draw";
import {io} from "socket.io-client";

function App(){

    console.log('Componente')
    // this.socket = io('ws://localhost:3000');
    // this.socket.on('connection', () =>{
    //     console.log(this.socket.id);
    // });

    const width = window.innerWidth;
    const height = window.innerHeight;

    const linea = useRef(null);

    function guardar(){
       console.log(linea)
    }
    guardar()
    return(
        <div>

            <CanvasDraw
                brushRadius={1}
                hideGrid={true}
                style={{border: '1px solid #579242'}}
                ref={linea}
                saveData={guardar()}
                loadTimeOffset={1}
            />
        </div>
    );

    function dibujando(){
        if (this.mouse.click && this.mouse.moved && this.mouse.postprev){
            io.emit('dibujar', {line: [this.mouse.post, this.mouse.postprev]});
            this.mouse.moved = false;
        };
        this.mouse.postprev = {x: this.mouse.post.x, y: this.mouse.post.y};
        setTimeout(dibujando, 25);
    };

    dibujando();
}

export default App;