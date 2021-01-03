import { BootScene } from './scene/boot.scene';
import { DialogManager, DialogType } from './util/dialog-manager';

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

DialogManager.addDialog({
  type: DialogType.GAMEOVER,
  onOpen: element => element.querySelector<HTMLButtonElement>('button').focus(),
  onInit: (element: HTMLElement, scene: Phaser.Scene, sceneKey: string) => {
    element.querySelector('button').addEventListener('click', () => {
      DialogManager.closeDialog(DialogType.GAMEOVER);
      scene.scene.start(sceneKey);
    })
  }
});

const g = new Phaser.Game(gameConfig);