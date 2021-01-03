import { Scale } from './scale';

export class LevelFactory {
  public width = 0;

  constructor(
    private scene: Phaser.Scene,
    private background: string,
    private obstacles: Phaser.Physics.Arcade.StaticGroup
  ) { }

  public generate(background = this.background): void {
    const startX = this.width;
    const hasObstacles = this.width > 0;
    const scenery = this.scene.add.sprite(this.width, 0, background);
    scenery.setOrigin(0, 0);
    this.width += scenery.width;
    this.adjustBounds();

    if (!hasObstacles) return;
    const barWidth = 75;
    const afterSpace = 350;

    let size = barWidth + afterSpace;
    while (size < scenery.width) {
      const x = startX + size;
      const h = Math.round(Math.max(0.2, Math.min(0.6, Math.random())) * 100) / 100;
      const o = this.scene.add.rectangle(x, Scale.getInstance().worldHeight, barWidth, Scale.getInstance().worldHeight * h, 0xFF9900);
      o.setOrigin(1, 1);
      o.depth = 1;
      this.obstacles.add(o);

      size += barWidth + afterSpace;
    }
  }

  private adjustBounds(): void {
    this.scene.physics.world.setBounds(0, 0, this.width, Scale.getInstance().worldHeight);
    this.scene.cameras.main.setBounds(0, 0, this.scene.physics.world.bounds.width, this.scene.physics.world.bounds.height);
  }
}