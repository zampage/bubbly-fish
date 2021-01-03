import { Scale } from '../util/scale';
import { GRAVITY } from '../main';
import { DialogType, DialogManager } from '../util/dialog-manager';

export class Fish extends Phaser.Physics.Arcade.Sprite {
  public body: Phaser.Physics.Arcade.Body;
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
  }

  protected preUpdate(): void {
    const { space, up } = this.scene.input.keyboard.createCursorKeys();
    this.setVelocityX(this.speed);

    if (this.isDead) {
      this.setVelocityX(0);

      if (Math.abs(this.angle) !== 180) {
        this.angle += 5;
      } else if (this.y - this.displayWidth / 2 === 0) {
        this.scene.scene.pause();
      }
    } else {
      if (space.isDown || up.isDown) {
        this.setVelocityY(this.body.velocity.y - 40);
      }
    }
  }

  public onCollision(): void {
    if (this.isDead) return;
    this.isDead = true;

    DialogManager.openDialog(DialogType.GAMEOVER);
    this.setVelocity(0, 0);
    this.setGravityY(0 - GRAVITY.y - 100);
  }
}