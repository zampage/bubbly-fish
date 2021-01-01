import { Scale } from '../util/scale';
import { MainScene } from './main.scene';

export class BootScene extends Phaser.Scene {
  public init(): void {
    // setup singletons
    Scale.getInstance(this.game.canvas.width, this.game.canvas.height);

    // proceed to main scene
    this.scene.add('main', MainScene, true);

    document.querySelector('#gameover button').addEventListener('click', () => {
      document.querySelector('#gameover').classList.remove('active');
      this.scene.start('main');
    })
  }
}