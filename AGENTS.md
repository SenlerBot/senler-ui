# AGENTS.md

Этот repository — единственный редактируемый source of truth для `@senler/ui`.
Не редактируй вручную копию в `aibot-cabinet/packages/senler-ui`: она обновляется
из этого repository командой Cabinet `npm run ui:sync`.

Перед изменением исходников, тестов, package scripts, CI или публикации полностью прочитай [`.cursor/rules/commands.mdc`](.cursor/rules/commands.mdc).

После изменения используй `check:fast`, затем один `npm run build`, который сам
выполняет `check:full → build:artifact → test:dist`. Не запускай отдельный full
до `build`, если после него код не менялся.
