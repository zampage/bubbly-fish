import { Scale } from '../util/scale';
import { GRAVITY } from '../main';
import { DialogType, DialogManager } from '../util/dialog-manager';

export class Fish extends Phaser.Physics.Arcade.Sprite {
  public body: Phaser.Physics.Arcade.Body;
  public spaceKey: Phaser.Input.Keyboard.Key;
  public upKey: Phaser.Input.Keyboard.Key;
  private isDead = false;
  private speed = 250;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    Scale.getInstance().scaleSprite(this, 0.2);
    this.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.depth = 1;
    this.setMaxVelocity(this.speed, 500);
    this.setX(x + this.displayWidth);

    // add controls
    this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.upKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    const onDown = () => this.setVelocityY(-(GRAVITY.y / 2));
    this.spaceKey.on('down', () => onDown());
    this.upKey.on('down', () => onDown());
  }

  protected preUpdate(): void {
    this.setVelocityX(this.speed);

    if (this.isDead) {
      this.setVelocityX(0);

      if (Math.abs(this.angle) !== 180) {
        this.angle += 5;
      } else if (this.y - this.displayWidth / 2 === 0) {
        this.scene.scene.pause();
      }
    }
  }

  public onCollision(): void {
    if (this.isDead) return;
    this.isDead = true;

    // remove all keyboard inputs
    this.spaceKey.removeAllListeners();
    this.upKey.removeAllListeners();

    // make swim up
    this.setVelocity(0, 0);
    this.setGravityY(0 - GRAVITY.y - 100);

    // open dialog
    DialogManager.openDialog(DialogType.GAMEOVER);
  }
}