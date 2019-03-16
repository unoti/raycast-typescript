import React, { Component, createRef } from 'react';
import {Raycast} from '../lib/raycast/raycast';

interface Props {

}

interface State {

}

export class Viewer extends Component<Props, State> {
    private raycast: Raycast | null;
    private canvasRef = createRef<HTMLCanvasElement>();

    public constructor(props: Props) {
        super(props);
        this.state = {
            // initial state
        };
        this.raycast = null;    // It'll be set it componentDidMount().
    }

//        this.raycast = new Raycast(this.canvasRef.current);

    public componentDidMount() {
        console.log('component did mount');
        if (this.canvasRef.current) {
            this.raycast = new Raycast(this.canvasRef.current);
            this.raycast.renderFrame();
        }
    }

    public render() {
        return (
            <div>
                <div className="controls">
                    <button onClick={this.startClicked}>Start</button>
                    <button onClick={this.stopClicked}>Stop</button>
                </div>
                <canvas id="viewport" ref={this.canvasRef} width="1000" height="500"/>
            </div>
        );
    }

     stopClicked = () => {
        console.log('stop clicked');
        if (this.raycast != null)
            this.raycast.stop();
    }

    startClicked = () => {
        if (this.raycast != null)
            this.raycast.start();
    }
}