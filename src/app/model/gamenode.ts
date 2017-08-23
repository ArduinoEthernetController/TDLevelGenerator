export class GameNode {
    public static size: number = 30;
    public static gap: number = 1;

    //des soll (adolf hitler sagt witte) so funktionieren, dass der wert immer geupdated wird, sodass sich das objekt nicht ändert
    private nodeStyle;
    constructor(public id: number = -1, public nodeType: GameNodeType = GameNodeType.NORMAL, public position: {x: number, y: number}) {
        this.nodeStyle = {
            width: GameNode.size + GameNode.gap * 2 + 'px',
            height: GameNode.size + GameNode.gap * 2 + 'px',
            left: this.position.y * (GameNode.size + GameNode.gap * 2) + 'px',
            top: this.position.x * (GameNode.size + GameNode.gap * 2) + 'px',
            padding: GameNode.gap + 'px'
        }
    }
    public setNodeType(nodeType: GameNodeType) {
        this.nodeType = nodeType && nodeType != this.nodeType ? nodeType : GameNodeType.NORMAL;
    }
    public nodeClasses() {
        let s = GameNodeType[this.nodeType];
        return s;
    }
}

export enum GameNodeType {
    X = 0,
    NORMAL,
    BUILDZONE,
    START,
    PATH,
    WAYPOINT,
    END
}