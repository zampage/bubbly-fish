import * as Phaser from 'phaser';
import { MainScene } from './scene/main.scene';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Bubbly Fish',
  type: Phaser.AUTO,
  parent: 'bubbly-fish',
  scale: {
    mode: Phaser.Scale.RESIZE,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: new Phaser.Math.Vector2(0, 300),
    }
  },
  backgroundColor: '#ffffff',
  scene: MainScene,
};

const g = new Phaser.Game(gameConfig);