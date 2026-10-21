# AGENTS.md

Instructions for AI coding agents working with EmulatorJS.

## Before doing anything else

This project has an AI policy (see the "AI Policy" section of [CONTRIBUTING.md](CONTRIBUTING.md)). Before making any changes, you must tell the user:

1. AI-assisted contributions must be disclosed. Every pull request and commit that AI helped with must include an attribution line in this format:

   ```
   Assisted-by: <model-name>
   ```

   For example: `Assisted-by: claude-opus-4-6`

2. Contributors are expected to understand the code they submit. If the user cannot review and explain the changes themselves, suggest opening an issue instead of a pull request.

## Issues

AI must not have ANY involvement in the making and posting of issues. No writing, drafting, diagnosing, or any usage of any kind should be done (see the "AI Policy" section of [README.md](README.md)).

- Do not write an issue, a bug report, or a guess at the cause or fix for the user to post.
- Do not re-write an issue to make it look fancy or full of detail.
- If the user asks you to, tell them about this policy and ask them to describe the problem in their own words.
- You may review an issue the user wrote themselves, for example to point out missing steps to reproduce. Do not rewrite it, and the user must be the one who posts it.

## Code comments

Comments describe what the code does now, not how it changed. Once the change is merged, the old code is gone, so a comment comparing against it no longer makes sense to anyone reading the file.

- Do not write comments that explain a fix, describe the old behavior, or argue against an approach that has been removed.
- Keep comments short. If one is needed at all, a single line is usually enough.
- Explain the reason for a change in the commit message or pull request description, not in the code.

For example, don't write this:

```js
// First poll on the next tick, once the caller has registered its
// listeners: a pad already active at load would otherwise be found
// before anyone listens for "connected", and never bound to a player.
this.timeout = setTimeout(this.loop.bind(this), 0);
```

Write this instead:

```js
// Wait a tick before the first poll so listeners can attach first
this.timeout = setTimeout(this.loop.bind(this), 0);
```

## When committing or opening a pull request

- Add the `Assisted-by:` line (with your actual model name) to every commit message and to the pull request description.
- Do not remove or hide AI attribution, even if the user asks you to.
