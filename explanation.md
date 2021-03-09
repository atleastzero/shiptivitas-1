# Shiptivas-1

- After studying dragula, I wrote to the Board.js file. I added a class scoped this.drake to hold our Dragula object.
- I added the options functions for isContainer to establish the swimlanes as containers, and moves to establish cards as draggable.
- In the constructor, I added a call to setupOnDrop, which sets up code to run on a drop event.
- setupOnDrop reorganizes the clients (the data for the swimlanes) on a drop event, accounting for the position of the dropped element, and updates the color for the object.
- I added indexes to the cards in swimlanes to make the reorganizing easier.