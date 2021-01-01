export class Scale {
  private static instance: Scale;

  public worldHeight: number;
  public worldWidth: number;
  public centerX: number;
  public centerY: number;

  constructor(width: number, height: number) {
    this.worldHeight = height;
    this.worldWidth = width;
    this.centerY = this.worldHeight / 2;
    this.centerX = this.worldWidth / 2;
  }

  public static getInstance(width?: number, height?: number): Scale {
    if (!Scale.instance) Scale.instance = new Scale(width, height);
    return Scale.instance;
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