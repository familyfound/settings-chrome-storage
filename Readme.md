
# chrome-storage

  Store angular settings for chrome extensions

## Installation

    $ component install familyfound/chrome-storage

## API

### load(settingsManager, next)

Load data from chrome.storage.sync for the given settingsManager. Next
is called on completion.

### save(settingsManager, next)

Save data from the settingsManager into chrome.storage.sync. Next is called
on completion.

## Angular Directives

### settings-chrome-storage

Restricted to attribute. Pass in the name of the settingsManager that
you want stored. This directive is to be used in conjunction with
`angular-settings`, as it watches the settings object there for
changes.

## License

  MIT
