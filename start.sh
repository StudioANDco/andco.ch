#!/bin/bash


BUNDLE=$(which bundle)
RBENV=$(which rbenv)
NPM=$(which npm)

if [[ -z "$BUNDLE" ]]; then
    echo "Please install bundler"
    exit 1
fi

if [[ -z "$NPM" ]]; then
    echo "Please install npm"
    exit 1
fi

BROWSERSYNC="./node_modules/.bin/browser-sync"
if [[ ! -x "$BROWSERSYNC" ]]; then
    ${COMMAND} install
fi

COMMAND="bundle exec jekyll serve"
if [[ -n "$RBENV" ]]; then
    COMMAND="$RBENV exec $COMMAND"
fi

${COMMAND} &
${BROWSERSYNC} start --files "_site/" --proxy "localhost:4000" --reload-debounce 600