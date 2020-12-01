# CS1300 Development React App
## Baseball Lineup/Player Aggregator

This app allows the user to create a baseball lineup from a preset list of historical players. Players can be added and removed from the lineup, or swapped within the lineup, which contains exactly 9 ordered slots. The user may filter the available players by handedness and/or position, and/or sort them by name or amount of home runs. The lineup serves as an aggregator, summing the total amount of home runs by the players added to it.

Note that this differs from the plant shop example in several ways:
1. The aggregator is ordered and fixed-size. It can become full, at which point adding to it is disabled.
2. The players are unique, so unlike plants you cannot add more than one of the same player to the aggregator.

I made both of these choices for the purpose of keeping the baseball theme intact, but they could easily be changed to more closely resemble the plant shop example by representing the `Lineup` as a growing list rather than a fixed-size array with `null` placeholders, and by associating a quantity with each player in the lineup by which their home runs are multiplied.

The components are arranged as follows:

* `App`: the main component. It contains one child component:
  * `PlayerManager` uses its state to manage the lists of players who are either in the lineup or are available to be inserted into the lineup. It provides callbacks to its child components (listed below) which allow the child components to indicate when a player is removed from one section and added to the other, or the order of the lineup has changed. This triggers a state change.
    * `AvailablePlayers` is the section representing the players who are available to be added into the lineup. This contains a simple list of players, as well as sorting and filtering functionality. It maps over the sorted, filtered, list of players and produces for each one a child component, provided with callbacks which themselves refer to the callbacks from the `PlayerManager`, which will change the state of the app when certain buttons are pressed.
      * `AvailablePlayerCard` is the component which displays the information representing a player. It also displays a button for adding the player in question into the lineup, which when clicked triggers a callback which causes the `PlayerManager` to update its state to include the player in the `Lineup`, and remove them from the `AvailablePlayers`. This button becomes disabled when the lineup is full, which is indicated via data passed from the `PlayerManager` into the `props` of the `AvailablePlayers` and eventually the `PlayerCard`.
    * `Lineup` is similar to `AvailablePlayers`, except that it begins empty, and it fixed-size. It has 9 ordered slots, and displays them as empty when `null`. It provides functionality via callbacks to its child components to not only remove themselves, but also to change their ordering. It also displays the aggregated sum total of the players' home runs.
      * `LineupPlayerCard` is nearly the same as `AvailablePlayerCard`, and is rendered for non-empty lineup slots. The difference is that it provides a "remove from lineup" button rather than "add to lineup," and also provides up and down buttons so that the players can swap spaces. The `LineupPlayerCard` is aware of its own position, and so it does not provide an up arrow in the first slot or a down arrow in the last slot.

So, the data is all managed by the `PlayerManager` and flows downwards along with callbacks, which the child components use to trigger state changes in the `PlayerManager`.
