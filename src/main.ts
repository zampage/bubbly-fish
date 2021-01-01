import { BootScene } from './scene/boot.scene';

export const GRAVITY = new Phaser.Math.Vector2(0, 750);

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
      gravity: GRAVITY,
    }
  },
  backgroundColor: '#ffffff',
  scene: BootScene,
};

const g = new Phaser.Game(gameConfig);