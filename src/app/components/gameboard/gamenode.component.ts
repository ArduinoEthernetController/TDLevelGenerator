import { Component, Input, Output, EventEmitter } from '@angular/core';

import { GameNode } from './../../model/gamenode';

@Component({
  selector: 'gamenode',
  template: `
        <div class="gamenode-frame" [ngStyle]="node.nodeStyle">
            <div class="gamenode" [ngClass]="node.nodeClasses()" (mouseover)="handleHover()" (click)="handleClick()">
                {{node.id}}
            </div>
        </div>
    `
})
export class GameNodeComponent {
  @Input() public node: GameNode;
  @Output() public onClicked: EventEmitter<GameNode> = new EventEmitter<GameNode>();
  @Output() public onHover: EventEmitter<GameNode> = new EventEmitter<GameNode>();
  handleClick() {
    this.onClicked.emit(this.node);
  }
  handleHover() {
    this.onHover.emit(this.node);
  }
}
