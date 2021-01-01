import * as Phaser from 'phaser';
import { BootScene } from './scene/boot.scene';

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
  scene: BootScene,
};

const g = new Phaser.Game(gameConfig);