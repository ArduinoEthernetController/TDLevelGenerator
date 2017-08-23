import { GameNode, GameNodeType } from './gamenode';
export class GameRoute {
  public endNode: GameNode;
  public nodes: GameNode[] = [];
  public valid: boolean;
  constructor(public startNode: GameNode) {
    this.valid = true;
  }
  addNode(node: GameNode) {
    this.nodes.push(node);
  }
  waypoints() {
    let wp = [];
    this.nodes.forEach((node: GameNode) => {
      if (node.nodeType == GameNodeType.WAYPOINT) wp.push(node);
    });
    return wp;
  }
}
