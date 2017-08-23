import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MainComponent } from './main.component';

import { GameBoardComponent } from "./components/gameboard/gameboard.component";
import { GameNodeComponent } from "./components/gameboard/gamenode.component";

@NgModule({
  declarations: [
    MainComponent,
    GameBoardComponent,
    GameNodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
