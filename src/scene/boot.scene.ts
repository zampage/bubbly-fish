import { Scale } from '../util/scale';
import { MainScene } from './main.scene';
import { DialogType, DialogManager } from '../util/dialog-manager';

const MAIN_SCENE = 'main';

export class BootScene extends Phaser.Scene {
  public init(): void {
    // setup
    Scale.getInstance(this.game.canvas.width, this.game.canvas.height);
    DialogManager.initDialog(DialogType.GAMEOVER, this, MAIN_SCENE);

    // proceed to main scene
    this.scene.add(MAIN_SCENE, MainScene, true);
  }
}