import { Component } from '@angular/core';

import { GameSession } from "./model/gamesession";
import { GameNode } from './model/gamenode';
import { GameRoute } from "./model/gameroute";

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html'
})
export class MainComponent {
  private sessionKey: string = 'session';
  
  private session: GameSession;

  private _selectedNode: GameNode;
  private selectedRoute: GameRoute;

  set selectedNode(node: GameNode) {
    this._selectedNode = node;
    this.selectedRoute = node ? this.session.board.routeWithStartId(node.id) : null;
  }
  get selectedNode() { return this._selectedNode }

  constructor() {
    this.session = new GameSession().init(this.sessionKey);
  }

  handleNodeClicked(node: GameNode) {
    console.log('asd');
    
    this.selectedNode = node;
    this.session.toolbox.useTool(node, this.session.board);
    //TODO toolbox
  }

  handleNodeHover(node: GameNode) {
    //TODO hover
  }

  deselectNode() {
    this.selectedNode = null;
  }

}
