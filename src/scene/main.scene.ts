import { Scale } from '../util/scale';
import { Fish } from '../gameobjects/fish';
import { LevelFactory } from '../util/level-factory';
import { ScoreManager } from '../util/score-manager';

const FISH = 'fish';
const BACKGROUND = 'background';

export class MainScene extends Phaser.Scene {
  private customScale: Scale;
  private fish: Fish;
  private obstacles: Phaser.Physics.Arcade.StaticGroup;
  private lvlFactory: LevelFactory;

  public init(): void {
    this.customScale = Scale.getInstance();
  }

  public preload(): void {
    this.load.image(FISH, 'assets/images/bubbly-fish.png');
    this.load.image(BACKGROUND, 'assets/images/background.jpg');
  }

  public create(): void {
    // fish
    this.fish = new Fish(this, 0, this.customScale.centerY, FISH);

    // obstacle collision
    this.obstacles = this.physics.add.staticGroup();
    this.physics.add.collider(this.fish, this.obstacles, () => this.fish.onCollision());

    // camera
    this.cameras.main.startFollow(this.fish);
    this.cameras.main.followOffset = new Phaser.Math.Vector2(this.fish.displayWidth - this.customScale.centerX, 0);

    // levels
    this.lvlFactory = new LevelFactory(this, BACKGROUND, this.obstacles);
    this.lvlFactory.generate();

    this.physics.world.on('worldbounds', ({ gameObject }: { gameObject: Phaser.GameObjects.GameObject }) => {
      if (gameObject === this.fish) this.fish.onCollision();
    });
  }

  public update(): void {
    if (this.fish.x + this.customScale.worldWidth > this.lvlFactory.width) this.lvlFactory.generate();
    ScoreManager.update(Math.floor(this.fish.x));
  }
}