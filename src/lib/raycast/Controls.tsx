// This can get a lot shorter. See the tricks hunter used in the Control class.
export class Controls {
    public left: boolean;
    public right: boolean;
    public forward: boolean;
    public back: boolean;

    constructor() {
        this.left = false;
        this.right = false;
        this.back = false;
        this.forward = false;

        document.addEventListener('keydown', this.keyEvent.bind(this, true));
        document.addEventListener('keyup', this.keyEvent.bind(this, false));
    }

    keyEvent = (isDown: boolean, event: KeyboardEvent) => {
        //console.log(`key event down=${isDown}`);
        //console.log(event);
        switch (event.key) {
            case 'a':
            case 'ArrowLeft':
                this.left = isDown;
                break;

            case 'd':
            case 'ArrowRight':
                this.right = isDown;
                break;
            
            case 's':
            case 'ArrowDown':
                this.back = isDown;
                break;
            
            case 'w':
            case 'ArrowUp':
                this.forward = isDown;
                break;
        }
    }

}