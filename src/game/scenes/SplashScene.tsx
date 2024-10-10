'use client'
import Phaser from 'phaser';

export default class SplashScene extends Phaser.Scene {
  public splashSceneBackgroundImage!: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: 'splashScene' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  init(data: any): void {
    this.cameras.main.setBackgroundColor('#ffffff');
  }

  preload(): void {
    console.log('Splash Scene');
    
    // Load splash screen background image
    this.load.image('splashSceneBackground', '/splashSceneImage.png');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  create(data: any): void {
    // Add background image and center it on the screen
    this.splashSceneBackgroundImage = this.add.sprite(1920 / 2, 1080 / 2, 'splashSceneBackground');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  update(time: number, delta: number): void {
    // Switch to the title scene after 3 seconds (3000 ms)
    if (time > 3000) {
      this.scene.switch('titleScene');
    }
  }
}
