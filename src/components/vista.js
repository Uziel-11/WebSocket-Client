import React from "react"
import {io} from "socket.io-client"
import css from "../assets/index.css"

class Vista extends React.Component {


    static socket = null;

    static mouse = {
        click: false,
        move: false,
        post: {x:0, y:0},
        postpre: false
    }

    componentDidMount() {
        Vista.socket = io('ws://localhost:3000')
        Vista.socket.on('connect', () =>{
            // console.log(Vista.socket.id);
        });

        Vista.socket.on('dibujar', data =>{
            let line = data.line;
            var canvas = document.getElementById('canvas')


            var context = canvas.getContext('2d');

            console.log('recibiendo del Servidor: ', data.line)

            context.beginPath();
            context.lineWidth = 2;
            context.moveTo(line[0].x * window.innerWidth, line[0].y * window.innerHeight);
            context.lineTo(line[1].x * window.innerWidth, line[1].y * window.innerHeight);
            context.stroke();

        })
    };

    cambiarClick (e) {
        Vista.mouse.click = true
       // console.log(Vista.mouse.click)
    }

    cambiarMove (e) {
        Vista.mouse.post.x = e.clientX / innerWidth
        Vista.mouse.post.y = e.clientY / innerHeight
        Vista.mouse.move = true
        //console.log(Vista.mouse)

        if (Vista.mouse.click && Vista.mouse.move && Vista.mouse.postpre){
            // console.log(Vista.mouse)
            Vista.socket.emit('trazo', {line:[Vista.mouse.post, Vista.mouse.postpre]});
            Vista.mouse.move = false;
        }
        Vista.mouse.postpre = {x: Vista.mouse.post.x, y:Vista.mouse.post.y}

        Vista.socket.on('dibujar', data =>{
            let line = data.line;
            var canvas = document.getElementById('canvas')


                var context = canvas.getContext('2d');

                // console.log('recibiendo del Servidor: ', data.line)

                context.beginPath();
                context.lineWidth = 2;
                context.moveTo(line[0].x * window.innerWidth, line[0].y * window.innerHeight);
                context.lineTo(line[1].x * window.innerWidth, line[1].y * window.innerHeight);
                context.stroke();

        })

    }

    cambiarClick2 (e) {
        Vista.mouse.click = false
        // console.log(Vista.mouse.click)
    }


    render() {
        return(
            <canvas
                id='canvas'
                width='3000'
                height='2500'
                onMouseDown={this.cambiarClick}
                onMouseMove={this.cambiarMove}
                onMouseUp={this.cambiarClick2}
            />
        )
    }
}

export default Vista;