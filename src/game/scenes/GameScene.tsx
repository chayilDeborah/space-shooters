'use client'
import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  private ship!: Phaser.Physics.Arcade.Sprite;
  private fireMissile: boolean = false;
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private scoreTextStyle: Phaser.Types.GameObjects.Text.TextStyle = { font: '65px Arial', align: 'center' };
  private gameOverText!: Phaser.GameObjects.Text;
  private gameOverTextStyle: Phaser.Types.GameObjects.Text.TextStyle = { font: '65px Arial', align: 'center' };
  private missileGroup!: Phaser.Physics.Arcade.Group;
  private alienGroup!: Phaser.GameObjects.Group;

  constructor() {
    super({ key: 'gameScene' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  init(data: any): void {
    this.cameras.main.setBackgroundColor('#0x5f6e7a');
  }

  preload(): void {
    console.log('Game Scene');

    // images
    this.load.image('starBackground', '/starBackground.png');
    this.load.image('ship', '/spaceship.png');
    this.load.image('missile', '/missile.png');
    this.load.image('alien', '/alien.png');
    // sound
    this.load.audio('laser', '/laser1.wav');
    this.load.audio('explosion', '/barrelExploding.wav');
    this.load.audio('bomb', '/bomb.wav');
  }

  create(): void {
    this.add.image(0, 0, 'starBackground').setScale(17.0).setOrigin(0, 0);
    
    this.scoreText = this.add.text(10, 10, `Score: ${this.score.toString()}`, this.scoreTextStyle);

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship');

    // create a group for the missiles
    this.missileGroup = this.physics.add.group();

    // create a group for the aliens
    this.alienGroup = this.add.group();
    this.createAlien();
// Check if the object is a GameObject and a Sprite
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isSprite(obj: any): obj is Phaser.Physics.Arcade.Sprite {
  return obj instanceof Phaser.Physics.Arcade.Sprite;
}

 // Collisions between missiles and aliens
this.physics.add.collider(this.missileGroup, this.alienGroup, (missileCollide, alienCollide) => {
  if (isSprite(missileCollide) && isSprite(alienCollide)) {
    alienCollide.destroy();
    missileCollide.destroy();
    this.sound.play('explosion');
    this.score = this.score + 1;
    this.scoreText.setText('Score: ' + this.score.toString());
    this.createAlien();
    this.createAlien();
  }
});

   // Collisions between ship and aliens
this.physics.add.collider(this.ship, this.alienGroup, (shipCollide, alienCollide) => {
  if (isSprite(shipCollide) && isSprite(alienCollide)) {
    this.sound.play('bomb');
    this.physics.pause();
    alienCollide.destroy();
    shipCollide.destroy();
    this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5);
    this.gameOverText.setInteractive({ useHandCursor: true });
    this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'));
  }
});
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(time: number, delta: number): void {
    // Handle input
    const keyLeftObj = this.input.keyboard?.addKey('LEFT');
const keyRightObj = this.input.keyboard?.addKey('RIGHT');
const keySpaceObj = this.input.keyboard?.addKey('SPACE');


    if (keyLeftObj?.isDown) {
      this.ship.x -= 15;
      if (this.ship.x < 0) {
        this.ship.x = 0;
      }
    }

    if (keyRightObj?.isDown) {
      this.ship.x += 15;
      if (this.ship.x > 1920) {
        this.ship.x = 1920;
      }
    }

    if (keySpaceObj?.isDown) {
      if (!this.fireMissile) {
        // fire missile
        this.fireMissile = true;
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile');
        this.missileGroup.add(aNewMissile);
         this.sound.play('laser');
      }
    }

    if (keySpaceObj?.isUp) {
      this.fireMissile = false;
    }

    // Move missiles up and remove when out of bounds
    this.missileGroup.children.each((item: Phaser.GameObjects.GameObject) => {
      const missile = item as Phaser.Physics.Arcade.Sprite;
      missile.y -= 15;

    
      if (missile.y < 50) {
        missile.destroy();
      }
    
      return null;  // Add this return statement to make TypeScript happy
    });
    
  }

  private createAlien(): void {
    const alienXLocation = Math.floor(Math.random() * 1920) + 1;
    let alienXVelocity = Math.floor(Math.random() * 50) + 1;
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1;
    const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien');
    anAlien.body.velocity.y = 200;
    anAlien.body.velocity.x = alienXVelocity;
    this.alienGroup.add(anAlien);
  }
}
 