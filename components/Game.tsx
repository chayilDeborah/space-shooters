'use client'
import Phaser from 'phaser';
import { useEffect } from 'react';

// Import your scenes
import SplashScene from '../src/game/scenes/SplashScene';
import TitleScene from '../src/game/scenes/TitleScene';
import MenuScene from '../src/game/scenes/MenuScene';
import GameScene from '../src/game/scenes/GameScene';

const Game = () => {
  useEffect(() => {
    // Ensure Phaser is only initialized on the client
    if (typeof window !== 'undefined') {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 1920,
        height: 1080,
        physics: {
          default: 'arcade',
          arcade: {
            debug: false,
          },
        },
        backgroundColor: 0xffffff,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      };

      // Initialize the game
      const game = new Phaser.Game(config);

      // Add the scenes
      const splashScene = new SplashScene();
      const titleScene = new TitleScene();
      const menuScene = new MenuScene();
      const gameScene = new GameScene();

      game.scene.add('splashScene', splashScene);
      game.scene.add('titleScene', titleScene);
      game.scene.add('menuScene', menuScene);
      game.scene.add('gameScene', gameScene);

      // Start with splash scene
      game.scene.start('splashScene');

      // Cleanup game instance when the component unmounts
      return () => {
        game.destroy(true);
      };
    }
  }, []);

  return <div id="game-container" />;
};

export default Game;

