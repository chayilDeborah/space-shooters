'use client'
import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  private titleSceneBackgroundImage!: Phaser.GameObjects.Sprite;
  private titleSceneText!: Phaser.GameObjects.Text;
  private titleSceneTextStyle = { font: '200px Times', fill: '#fde4b9', align: 'center' };

  constructor() {
    super({ key: 'titleScene' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  init(data: any): void {
    this.cameras.main.setBackgroundColor('#ffffff');
  }

  preload(): void {
    console.log('Title Scene');

    // Load background image
    this.load.image('titleSceneBackground', '/aliens_screen_image.jpg');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  create(data: any): void {
    // Add and position the background image, scaling it
    this.titleSceneBackgroundImage = this.add.sprite(1920 / 2, 1080 / 2, 'titleSceneBackground').setScale(2.75);

    // Add and position the title text
    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, 'Space Aliens', this.titleSceneTextStyle).setOrigin(0.5);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  update(time: number, delta: number): void {
    // Switch to the menu scene after 6 seconds (6000 ms)
    if (time > 6000) {
      this.scene.switch('menuScene');
    }
  }
}
