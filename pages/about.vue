<template>
  <!-- ToDo Prerender this for different locales -->

  <div class="mx-auto max-w-screen-xl w-full h-full p-2">
    <h1 class="text-center mb-4">Welcome to the about page</h1>
    <p class="mb-4 italic text-center">
      Note: This page is currently only available in english. Sorry for any
      inconvenience.
    </p>
    <h2 class="mb-4">1. About Klondike Solitaire</h2>
    <p class="mb-4">
      Klondike Solitaire, often simply called Solitaire, is one of the most
      popular single-player card games in the world. Its classic design involves
      organizing a shuffled deck of 52 cards into four foundation piles in
      ascending order, each pile corresponding to one suit (Hearts, Diamonds,
      Clubs, and Spades). Players build these foundations starting with Aces and
      progressing up to Kings. The game combines strategy, skill, and a bit of
      luck, offering a relaxing yet engaging experience for players of all ages.
    </p>
    <h2 class="mb-4">2. Rules of Klondike Solitaire</h2>
    <ol class="list-decimal list-inside mb-4">
      <li>
        <b>Setup</b>: The game begins with seven tableau piles, each containing
        an increasing number of cards from one to seven. Only the top card in
        each pile is face up; the rest are face down. The remaining cards form
        the stockpile.
      </li>
      <li>
        <b>Objective</b>: Move all 52 cards to the four foundation piles,
        arranged by suit and in ascending order from Ace to King.
      </li>
      <li>
        <b>Gameplay</b>: Cards in the tableau can be moved in descending order
        and must alternate in color (e.g., a red 7 can only be placed on a black
        8).
      </li>
      <li>
        <b>Stockpile</b>: Players draw from the stockpile, either one card at a
        time or three, depending on the chosen variation. Unplayable cards are
        moved to the waste pile, but they can be cycled through again.
      </li>
      <li>
        <b>Empty piles</b>: Only Kings (or stacks starting with a King) can be
        moved into an empty tableau pile.
      </li>
      <li>
        <b>Winning</b>: The game is won when all cards are successfully moved to
        the foundation piles.
      </li>
    </ol>
    <h2 class="mb-4">3. Controls for Klondike Solitaire</h2>
    <p class="mb-2">
      Playing Klondike Solitaire in your web browser is fairly simple, with
      controls designed to suit both mouse and keyboard users. Here's how you
      can interact with the game:
    </p>
    <ul class="list-disc list-inside mb-2">
      <li>
        <b>Mouse Controls</b>: Use your mouse to click on a card to select it.
        Once selected, click on another card or a pile where you want to move
        the selected card. The game will only allow valid moves, so if a move
        isn't allowed, the card will remain in its original position.
      </li>
      <li>
        <b>Keyboard Controls</b>: For keyboard navigation, use the Tab key to
        cycle through selectable cards and piles. When your desired card or pile
        is highlighted, press Enter to select or confirm the action. This
        ensures accessibility for players who prefer not to use a mouse.
      </li>
      <li>
        <b>Game Management</b>:
        <ul class="list-disc list-inside ml-4">
          <li>
            <b>Reset Button</b>: If you want to start a fresh game, click the
            "Reset" button. This will shuffle the cards and set up a new game,
            erasing all progress from the current session.
          </li>
          <li>
            <b>Undo/Redo</b>: Made a mistake or want to reconsider a move? Use
            the Undo button to reverse your last action, or the Redo button to
            reinstate a previously undone move. This allows you to experiment
            with strategies and refine your play.
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
