## LostGrid Contributing Guide

First off, thanks for wanting to help!

If this is your first time contributing to an Open Source Project, welcome!

## Pre-requisites
1. Ensure what you're writing has test coverage.
2. Lint before you commit *([Yes, Peter's still working on this](https://github.com/peterramsing/lost/commit/293cd9254ce44c28c0a742c62b4e441ce6d07b5b))*
  - Don't be like Peter...use the [Git Hook](#git-hooks-for-lostgrid) like he does now. 🤓
  - Lint by running `npm run lint`
  - Don't worry–the Continuous Integration will enforce this if you forget.

## Notes
- If this is your first commit/contribution to an open-source project, you got this far and you should feel epic! 
- Whenever a PR is submitted, Peter's phone chirps and he does a little dance. 🕺 


Thanks, and don't hesitate to reach out if you have any questions!

## Git Hooks for LostGrid

LostGrid requires linting in order for PR's to be accepted.

Having a pre-commit hook is a great way to enforce this before CI catches it.

This was taken from Angular's Material project nearly wholesale. Thanks to them for the great docs!
Read how: [Material2's Wiki](https://github.com/angular/material2/wiki/Pre-commit-hook-for-linters)

`pre-commit` code for LostGrid's linter
```bash
#!/bin/sh

pass=true
RED='\033[1;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo "Running Linter:"

# Run elsint and get the output and return code
eslint=$(npm run lint)
ret_code=$?

# If it didn't pass, announce it failed and print the output
if [ $ret_code != 0 ]; then
	printf "\n${RED}eslint failed:${NC}"
	echo "$eslint\n"
	pass=false
else
	printf "${GREEN}eslint passed.${NC}\n"
fi

# If there were no failures, it is good to commit
if $pass; then
	exit 0
fi

exit 1
```
