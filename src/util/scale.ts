export class Scale {
  public worldHeight: number;
  public worldWidth: number;
  public centerX: number;
  public centerY: number;

  constructor(scene: Phaser.Scene) {
    this.worldHeight = scene.game.canvas.height;
    this.worldWidth = scene.game.canvas.width;
    this.centerY = this.worldHeight / 2;
    this.centerX = this.worldWidth / 2;
  }

  public percentageY(assetHeight: number, targetPercentage: number): number {
    const scale = 1 / (assetHeight / this.worldHeight);
    return scale * targetPercentage;
  }

  public percentageX(assetWidth: number, targetPercentage: number): number {
    const scale = 1 / (assetWidth / this.worldWidth);
    return scale * targetPercentage;
  }

  public scaleSprite(sprite: Phaser.GameObjects.Image | Phaser.GameObjects.Sprite, targetPercentage: number, byWidth = false): void {
    const scale = byWidth ? this.percentageX(sprite.width, targetPercentage) : this.percentageY(sprite.height, targetPercentage);
    sprite.setScale(scale);
  }
}