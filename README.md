# inthemesh

The webapp that distributes the stuff.

### Installation

1. Install [iojs](https://iojs.org/dist/v2.3.0/) (and npm) as well as nginx.
2. Install forever: `npm install forever -g`
3. Copy the nginx configuration over to the nginx `sites-available` directory.
4. Symlink the nginx configuration into nginx's `sites-enabled` directory.
5. Start the app with forever, preferrably on boot: `forever start index.js`
6. Restart nginx.
7. Drink beers.