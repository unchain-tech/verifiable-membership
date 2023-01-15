# UNCHAIN membership

## Workspaces

```
packages
   |__ client
   |__ contract
   |__ vc
```

You can access the respective yarn commands via

```
yarn workspace [workspace_name] [workspace_command]
```

## Linting & Formatting

Uses [rome](https://rome.tools/). Config in `/rome.json`.

## Precommit hooks

Uses [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks). Config in `/.lintstagedrc.js`.

Initialize with

```
yarn simple-git-hooks
```

## Client

- Next.js v13
- TailwindCSS v3
- Jest

## Contract

- Hardhat
- Solhint

## Referrences

1. [BlockCerts® Core API](https://team.iam.api.blockcerts.com/docs/index.html)
