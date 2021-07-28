
class Socket {

    constructor(io) {

        this.io = io;

        this.dibujar();
    }

    dibujar(){

        this.io.on('dibujar', data =>{
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
}

export default Socket;