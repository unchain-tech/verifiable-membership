# UNCHAIN membership

## Workspaces
```
packages
   |__ client
   |__ contract
```

You can access the respective yarn commands via
```
yarn workspace [workspace_name] [workspace_command]
```

## Linting & Formatting
Uses [rome](https://rome.tools/). Config in `/rome.json`.

## Precommit hooks
Uses [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks). Config in `/.lintstagedrc.js`

## Client
- Next.js v13
- TailwindCSS v3
- Jest

## Contract
- Hardhat
- Solhint
