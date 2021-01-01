import { Scale } from '../util/scale';
import { ScenerySprite } from '../gameobjects/scenery.sprite';

const FISH = 'fish';
const BACKGROUND = 'background';

export class MainScene extends Phaser.Scene {
  private customScale: Scale;
  private fish: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private obstacle: Phaser.Physics.Arcade.StaticGroup;
  private scenery: ScenerySprite;

  public init(): void {
    this.customScale = Scale.getInstance();
  }

  public preload(): void {
    this.load.image(FISH, 'assets/images/bubbly-fish.png');
    this.load.image(BACKGROUND, 'assets/images/background.jpg');
  }

  public create(): void {
    // background
    this.scenery = new ScenerySprite(this, 0, 0, BACKGROUND);
    this.add.existing(this.scenery);

    // fish
    this.fish = this.physics.add.sprite(this.customScale.centerX, this.customScale.centerY, FISH);
    this.customScale.scaleSprite(this.fish, 0.2);
    this.fish.setCollideWorldBounds(true);

    // obstacle collision
    this.obstacle = this.physics.add.staticGroup();
    this.physics.add.collider(this.fish, this.obstacle, () => {
      document.querySelector('#gameover').classList.add('active');
    });

    // generate obstacles
    const o = this.add.rectangle(this.customScale.centerX, 0, 100, this.customScale.worldHeight * 0.3, 0xFF9900);
    this.obstacle.add(o);

    // bounds
    this.physics.world.setBounds(0, 0, this.scenery.width * 2, this.customScale.worldHeight);
    this.cameras.main.setBounds(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height);
  }

  public update(): void {
    const { space, up, right, left } = this.input.keyboard.createCursorKeys();

    this.fish.setVelocityX(0);
    this.cameras.main.centerOnX(this.fish.x)

    if (this.fish.x > this.physics.world.bounds.width * 0.75) {
      this.fish.x = this.physics.world.bounds.width * 0.25;
    }

    if (space.isDown || up.isDown) this.fish.setVelocityY(-300);
    if (right.isDown) this.fish.setVelocityX(300);
    if (left.isDown) this.fish.setVelocityX(-300);
  }
}