import { Scale } from './scale';
import { Fish } from '../gameobjects/fish';

export class LevelFactory {
  public width = 0;
  private barWidth = 75;
  private startThreshold = 850;
  private difficulty = 1;
  private baseSpaceBetween = 500;

  private get spaceBetween(): number {
    return this.baseSpaceBetween * this.difficulty;
  }

  private get passageSize(): number {
    return 0.5 * this.difficulty;
  }

  constructor(
    private scene: Phaser.Scene,
    private background: string,
    private obstacles: Phaser.Physics.Arcade.StaticGroup,
    private obstacleRays: Phaser.Physics.Arcade.StaticGroup,
    fish: Fish,
  ) {
    this.startThreshold = fish.displayWidth * 5;
    this.baseSpaceBetween = fish.displayWidth * 5;
  }

  public generate(background = this.background): void {
    const scenery = this.generateScenery(background);
    this.generateObstacles(scenery.width);
    this.width += scenery.width;
    this.adjustBounds();
  }

  private generateObstacles(sceneryWidth: number): void {
    const maxHeight = Scale.getInstance().worldHeight;
    const maxWidth = this.width + sceneryWidth;
    const lastObstacleX = (this.obstacles.getLast(true)?.x ?? 0) + this.barWidth + this.spaceBetween;
    let x = Math.max(this.startThreshold, lastObstacleX);

    while (x + this.barWidth < maxWidth) {
      // generate obstacle sizes
      const leftover = 1 - this.passageSize;
      const cutPoint = Math.random();
      const h1 = leftover * cutPoint;
      const h2 = leftover * (1 - cutPoint);

      // generate obstacles
      const o1 = this.scene.add.rectangle(x, 0, this.barWidth, maxHeight * h1, 0xFF9900);
      o1.setOrigin(0, 0);
      o1.depth = 1;
      this.obstacles.add(o1);
      const o2 = this.scene.add.rectangle(x, maxHeight, this.barWidth, maxHeight * h2, 0xFF9900);
      o2.setOrigin(0, 1);
      o2.depth = 1;
      this.obstacles.add(o2);

      // generate ray
      const ray = this.scene.add.zone(x + this.barWidth / 2, 0, 1, maxHeight);
      ray.setOrigin(0.5, 0);
      this.obstacleRays.add(ray);

      // increase x and difficulty
      x += this.barWidth + this.spaceBetween;
      this.difficulty -= 0.01;
    }
  }

  private generateScenery(background: string): Phaser.GameObjects.Sprite {
    const scenery = this.scene.add.sprite(this.width, 0, background);
    scenery.setOrigin(0, 0);
    return scenery;
  }

  private adjustBounds(): void {
    this.scene.physics.world.setBounds(0, 0, this.width, Scale.getInstance().worldHeight);
    this.scene.cameras.main.setBounds(0, 0, this.scene.physics.world.bounds.width, this.scene.physics.world.bounds.height);
  }
}