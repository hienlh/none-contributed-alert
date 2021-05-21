# None contributed alert action

[![license](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
[![market](https://img.shields.io/badge/Get_it-on_the_Marketplace-informational.svg)](https://github.com/marketplace/actions/none-contributed-alert)

❗ This action will send an email to alert 📣  you when today you do not contribute to Github

## Inputs

### `email`

**Required** Your email address to be sent an alert email.

## Outputs

### `message`

The result message.

## Example usage

```yaml
uses: hienlh/none-contributed-alert@v1.0.0
with:
  email: "example@example.com"
```

## Full example

```yaml
name: None contributed alert

on:
  workflow_dispatch:
  schedule:
    # Runs at 12pm UTC => 19pm UTC+7
    - cron: "0 12 * * *"

jobs:
  none-contributed-alert:
    name: None contributed alert
    runs-on: ubuntu-latest
    steps:
      - uses: hienlh/none-contributed-alert@v1.0.0
        with:
          email: "example@example.com"
```
