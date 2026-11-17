# AGENTS.md

Этот repository — единственный редактируемый source of truth для `@senlerio/ui`.
Не редактируй вручную копию в `aibot-cabinet/packages/senler-ui`: она обновляется
из этого repository командой Cabinet `npm run ui:sync`.

Перед изменением исходников, тестов, package scripts, CI или публикации полностью прочитай [`.cursor/rules/commands.mdc`](.cursor/rules/commands.mdc).

После изменения используй check:fast и необходимые test:source. Полный build,
check:full и build:artifact выполняются только в CI, для релиза или по явному запросу.
