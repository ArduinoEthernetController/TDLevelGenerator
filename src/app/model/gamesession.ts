import { Toolbox } from './toolbox';
import { GameBoard } from './gameboard';
import { GameNode } from './gamenode';
import { GameRoute } from "./gameroute";

export class GameSession {
    public board: GameBoard;
    public routes: GameRoute[];
    public toolbox: Toolbox = new Toolbox();
    public settings: GameSessionSettings;
    constructor() {}
    
    init(sessionKey: string) {
        if (sessionKey) {
            let data = sessionStorage[sessionKey];
            if (data) {
                let info: GameSessionData = JSON.parse(data);
                return this.restore(info);
            } else {
                console.log('No session in storage.');
            }
        }
        this.board = new GameBoard();
        this.routes = [];
        this.settings = {
            sessionKey: 'session'
        }
        return this;
    }

    restore(data: GameSessionData) {
        this.board = new GameBoard().restore(data.level);
        this.settings = data.settings;
        return this;
    }

    save() {
        let info = {
            level: this.board.level.map(
                (row: any[]) => {
                    return row.map(
                        (node: GameNode) => node.nodeType
                    )
                }
            ),
            settings: this.settings
        }
        sessionStorage[this.settings.sessionKey] = JSON.stringify(info);
    }
}

export interface GameSessionData {
    level: number[][];
    settings: GameSessionSettings;
}

export interface GameSessionSettings {
    sessionKey: string;
}