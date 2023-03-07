# draftDay

A fantasy draft-esque client for Pokemon Showdown.

Developed for groups of two or more.

## How To Run

Because past Zach apparently thought it was so straight forward to figure out and never made any directions.

- First time:
 - `yarn` from root
 - `npm install -g bower` if bower is not installed
 - `bower install` from `/public`

- `node server.js` from root
- navigate to `localhost:9999` in browser and get draftin'

## Dockerfile
- `docker build . -t draftDay`
- `docker run -p <host_port>:9999 -d draftDay`

## How To Play

- User creates or joins room

- Room leader adjusts preferences that the other players can see in real time. Players will then ready up if they agree with the preferences the leader has selected. <b>The leader cannot start the draft until all players have readied up.</b>

- Once the draft has started, players will take turns selecting their teams out of the pokemon draft pool that was randomly generated based on the preferences.

- When the draft is over, each team's pokemon will be shown and ready to be copied right into pokemon showdown.

## Future Improvements/Additions

- Gen 7, Gen 8, Gen 9 = DONE
    - Need to update pokemon.js to pokedex.js cause how did I not do that before

- Automatic feedback (How many pokemon are possible with the selected parameters -> whether it's feasible with the amount of teams
selected)

- 'Copy to clipboard' button for teams when draft is over. DONE

- Option to generate pokemon with moves and items.

- Leader can set cap to number of people in draft?

- Private rooms?

## Known Bugs

- Linear draft doesn't seem to be working right now

- Start over doesn't clear drafted players for other users besides host

- Something weird with the host being set if user opens webpage first, instead of user creating room
    - hmmm not exactly apparently, but something weird is happening here
    - something with assigning player numbers
    - could be joining a room for the second time

- Ensure that all filters still work with update from updated pokemon list