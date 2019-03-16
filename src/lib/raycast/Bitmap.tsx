//*TODO: Seems like we should be able to get rid of this class.
// Regular HTMLImageElement has a width and height...
export class Bitmap {
    public image: HTMLImageElement;
    constructor(url: string, public width: number, public height: number) {
        this.image = new Image();
        this.image.src = url;
        this.width = width;
        this.height = height;
    }
}