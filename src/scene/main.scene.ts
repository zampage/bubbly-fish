import { Scale } from '../util/scale';
import { Fish } from '../gameobjects/fish';

const FISH = 'fish';
const BACKGROUND = 'background';

export class MainScene extends Phaser.Scene {
  private customScale: Scale;
  private fish: Fish;
  private obstacle: Phaser.Physics.Arcade.StaticGroup;
  private location = 0;

  public init(): void {
    this.customScale = Scale.getInstance();
  }

  public preload(): void {
    this.load.image(FISH, 'assets/images/bubbly-fish.png');
    this.load.image(BACKGROUND, 'assets/images/background.jpg');
  }

  public create(): void {
    this.generateLevel();

    // fish
    this.fish = new Fish(this, 0, this.customScale.centerY, FISH);

    // obstacle collision
    this.obstacle = this.physics.add.staticGroup();
    this.physics.add.collider(this.fish, this.obstacle, () => this.fish.onCollision());

    // generate obstacles
    const o = this.add.rectangle(this.customScale.centerX, 0, 100, this.customScale.worldHeight * 0.3, 0xFF9900);
    this.obstacle.add(o);

    // camera
    this.cameras.main.startFollow(this.fish);
    this.cameras.main.followOffset = new Phaser.Math.Vector2(this.fish.displayWidth - this.customScale.centerX, 0);
  }

  public update(): void {
    if (this.fish.x + this.customScale.worldWidth > this.location) this.generateLevel();
  }

  private generateLevel(): void {
    const background = this.add.sprite(this.location, 0, BACKGROUND);
    background.setOrigin(0, 0);
    this.location += background.width;

    // adjust bounds to new world size
    this.physics.world.setBounds(0, 0, this.location, this.customScale.worldHeight);
    this.cameras.main.setBounds(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height);
  }
}