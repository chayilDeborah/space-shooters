'use client'
import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  public menuSceneBackgroundImage!: Phaser.GameObjects.Sprite;
  private startButton!: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: 'menuScene' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  init(data: any): void {
    this.cameras.main.setBackgroundColor('#ffffff');
  }

  preload(): void {
    console.log('Menu Scene');

    // Load assets
    this.load.image('menuSceneBackground', '/aliens_screen_image2.jpg');
    this.load.image('startButton', '/start.png');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  create(data: any): void {
    // Add and position the background image
    this.menuSceneBackgroundImage = this.add.sprite(1920 / 2, 1080 / 2, 'menuSceneBackground');

    // Add and position the start button
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton');
    this.startButton.setInteractive({ useHandCursor: true });

    // Add click event to start the game
    this.startButton.on('pointerdown', () => this.clickButton());
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  update(time: number, delta: number): void {
    // You can handle any updates you want in the menu here if needed
  }

  private clickButton(): void {
    // Switch to the game scene
    this.scene.start('gameScene');
  }
}
