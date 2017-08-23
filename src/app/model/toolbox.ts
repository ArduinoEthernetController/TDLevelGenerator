import { GameBoard } from './gameboard';
import { GameNodeType, GameNode } from "./gamenode";

export class Toolbox {
    public activeTool: NodeTool;
    public tools: NodeTool[];
    constructor() {
        this.tools = [
            new NodeTool(GameNodeType.X, 'Select', '#ffaa00'),
            new NodeTool(GameNodeType.START, 'Start', 'lightgreen'),
            new NodeTool(GameNodeType.END, 'End', 'red'),
            new NodeTool(GameNodeType.PATH, 'Path', 'orange'),
            new NodeTool(GameNodeType.NORMAL, 'Normal', 'gray'),
        ]
    }
    toolSelected() {
        return Boolean(this.activeTool);
    }
    setActiveTool(tool: NodeTool) {
        this.activeTool = tool.nodeType == GameNodeType.X ? null : tool;
    }

    useTool(node: GameNode, board: GameBoard) {
        if (this.activeTool) {
            node.setNodeType(this.activeTool.nodeType);
            board.updateLevel();
        }
    }
}
export class NodeTool {
    constructor(public nodeType: GameNodeType, public title: string, public color: string) {}
}