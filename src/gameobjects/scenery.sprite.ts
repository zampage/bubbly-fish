export class ScenerySprite extends Phaser.GameObjects.Sprite {
  public nextFrame: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture, 0);
    this.setOrigin(0, 0);
    this.nextFrame = new Phaser.GameObjects.Sprite(scene, this.width, y, texture, 0);
    this.nextFrame.setOrigin(0, 0);
    scene.add.existing(this.nextFrame);
  }
}