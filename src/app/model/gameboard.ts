import { GameNode, GameNodeType } from './gamenode';
import { GameRoute } from 'app/model/gameroute';
export class GameBoard {
  public level: GameNode[][];
  public routes: GameRoute[];
  private boardStyle: any;

  constructor(public width: number = 20, public height: number = 20) {
    this.createLevel();
  }

  restore(level: number[][]) {
    this.createLevel(level);
    this.updateLevel();
    return this;
  }

  createLevel(restoredLevel?: number[][]) {
    this.level = [];
    this.routes = [];

    this.width = restoredLevel ? restoredLevel.length : this.width;
    this.height = restoredLevel ? restoredLevel[0].length : this.height;

    for (var r = 0; r < this.width; r++) {
      this.level[r] = [];
      for (var c = 0; c < this.height; c++) {
        let nodeType = restoredLevel ? restoredLevel[r][c] : undefined;
        let id = r + (c > 0 ? c : 0) * this.width;
        this.level[r][c] = new GameNode(id, nodeType, { x: r, y: c });
      }
    }

    let wpx = this.width * (GameNode.size + GameNode.gap * 2);
    let hpx = this.height * (GameNode.size + GameNode.gap * 2);
    this.boardStyle = {
      width: wpx + 'px',
      height: hpx + 'px'
    };
  }

  resetLevel() {
    this.createLevel();
  }

  updateLevel() {
    this.routes = [];
    this.resetBuildzones();
    this.iterateAll((node: GameNode) => {
      if (node.nodeType == GameNodeType.START) {
        let route = this.crawlRoute(node);
        this.setBuildzoneForRoute(route);
        this.routes.push(route);
      }
    });
  }

  routeWithStartId(id: number) {
    for (let route of this.routes) {
      if (route.startNode.id == id) {
        return route;
      }
    }
    return null;
  }

  crawlRoute(startNode: GameNode) {
    let route = new GameRoute(startNode);

    let lastNode = startNode;
    let currNode = startNode;
    let nextNode;
    let currStep = 0;
    let maxSteps = this.width * this.width;
    while (currStep++ < maxSteps) {
      if (currNode.nodeType == GameNodeType.END) {
        route.endNode = currNode;
        return route;
      }
      this.scanAround(currNode, false, (neighbour: GameNode) => {
        if (neighbour && neighbour != lastNode) {
          switch (neighbour.nodeType) {
            case GameNodeType.PATH:
            case GameNodeType.WAYPOINT:
            case GameNodeType.END:
              if (nextNode) {
                route.valid = false;
              } else {
                let inarow = lastNode && (lastNode.position.x == neighbour.position.x || lastNode.position.y == neighbour.position.y);
                if (currNode.nodeType != GameNodeType.START) {
                  if (inarow) {
                    currNode.nodeType = GameNodeType.PATH;
                  } else {
                    currNode.nodeType = GameNodeType.WAYPOINT;
                  }
                }
                nextNode = neighbour;
              }
              break;
            case GameNodeType.START:
              route.valid = false;
          }
        }
      });

      if (!nextNode) route.valid = false;
      if (!route.valid) return route;

      lastNode = currNode;
      currNode = nextNode;
      nextNode = null;
      route.addNode(currNode);
    }
    return route;
  }

  scanAround(node: GameNode, edges: boolean, callback) {
    if (!node) return null;
    let scanOffsets = [{ x: 0, y: -1 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }];
    let edgesOffsets = [{ x: -1, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: 1 }];
    if (edges) scanOffsets = scanOffsets.concat(edgesOffsets);
    for (let scan of scanOffsets) {
      let nextX = node.position.x + scan.x;
      let nextY = node.position.y + scan.y;
      if (nextX < 0 || nextX > this.width - 1 || nextY < 0 || nextY > this.height - 1) continue;
      let neighbour: GameNode = this.level[nextX][nextY];
      callback(neighbour);
    }
  }

  resetBuildzones() {
    this.iterateAll((node: GameNode) => {
      if (node.nodeType == GameNodeType.BUILDZONE) node.nodeType = GameNodeType.NORMAL;
    });
  }

  setBuildzoneForRoute(route: GameRoute) {
    if (route.valid) {
      route.nodes.forEach((node: GameNode) => {
        if (node.nodeType != GameNodeType.START && node.nodeType != GameNodeType.END) {
          this.scanAround(node, true, (neighbour: GameNode) => {
            if (neighbour.nodeType == GameNodeType.NORMAL) neighbour.nodeType = GameNodeType.BUILDZONE;
          });
        }
      });
    }
  }

  iterateAll(callback, width?: number, height?: number) {
    let w = width ? width : this.width;
    let h = height ? height : this.height;
    for (var row = 0; row < w; row++) {
      for (var col = 0; col < h; col++) {
        let currNode: GameNode = this.level[row][col];
        callback(currNode);
      }
    }
  }
}
