import { Scale } from '../util/scale';
import { GRAVITY } from '../main';

export class Fish extends Phaser.Physics.Arcade.Sprite {
  public body: Phaser.Physics.Arcade.Body;
  private isDead = false;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    Scale.getInstance().scaleSprite(this, 0.2);
    this.setCollideWorldBounds(true);
    this.depth = 1;
  }

  protected preUpdate(): void {
    const { space, up } = this.scene.input.keyboard.createCursorKeys();
    this.setVelocityX(250);

    if (this.isDead) {
      if (Math.abs(this.angle) === 180) {
        this.scene.scene.pause();
      } else {
        this.angle += 5;
      }
    } else if (space.isDown || up.isDown) {
      this.setVelocityY(-500);
    }
  }

  public onCollision(): void {
    if (this.isDead) return;
    this.isDead = true;

    document.querySelector('#gameover').classList.add('active');
    this.setVelocity(0, 0);
    this.setGravityY(0 - GRAVITY.y - 100);
  }
}