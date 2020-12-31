import { Scale } from '../util/scale';
const FISH = 'fish';

export class MainScene extends Phaser.Scene {
  private customScale: Scale;
  private fish: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  public preload(): void {
    this.customScale = new Scale(this);

    this.load.image(FISH, 'assets/images/bubbly-fish.png');
  }

  public create(): void {
    this.fish = this.physics.add.sprite(this.customScale.centerX, this.customScale.centerY, FISH);
    this.customScale.scaleSprite(this.fish, 0.2);
    this.fish.setCollideWorldBounds(true);
  }

  public update(): void {
    const { space } = this.input.keyboard.createCursorKeys();

    if (space.isDown) {
      this.fish.setVelocityY(-300);
    }
  }
}