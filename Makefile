npm-install-%: ## install specified % npm package
	npm install $* --save-dev
	git add package.json

TURBO = TURBO_TELEMETRY_DISABLED=1 turbo --dangerously-disable-package-manager-check

NPM_TESTS=build i18n_extract lint test

.PHONY: test
test: $(addprefix test.npm.,$(NPM_TESTS))  ## validate ci suite

.PHONY: test.npm.*
test.npm.%: validate-no-uncommitted-package-lock-changes
	test -d node_modules || $(MAKE) requirements
	npm run $(*)

.PHONY: requirements
requirements:  ## install ci requirements
	npm ci

# turbo.site.json is the standalone turbo config for this package.  It is
# renamed to avoid conflicts with turbo v2's workspace validation, which
# rejects root task syntax (//#) and requires "extends" in package-level
# turbo.json files, such as when running in a site repository. The targets
# below copy it into place before running turbo and clean up after.
turbo.json: turbo.site.json
	cp $< $@

# NPM doesn't bin-link workspace packages during install, so it must be done manually.
bin-link:
	[ -f packages/frontend-base/package.json ] && npm rebuild --ignore-scripts @openedx/frontend-base || true

build-packages: turbo.json
	$(TURBO) run build; rm -f turbo.json
	$(MAKE) bin-link

clean-packages: turbo.json
	$(TURBO) run clean; rm -f turbo.json

dev-packages: turbo.json
	$(TURBO) run watch:build dev:site; rm -f turbo.json

dev-site: bin-link
	npm run dev

clean:
	rm -rf dist

build:
	tsc --project tsconfig.build.json
	find src -type f \( -name '*.scss' -o \( \( -name '*.png' -o -name '*.svg' \) -path '*/assets/*' \) \) -exec sh -c '\
	  for f in "$$@"; do \
	    d="dist/$${f#src/}"; \
	    mkdir -p "$$(dirname "$$d")"; \
	    cp "$$f" "$$d"; \
	  done' sh {} +
	tsc-alias -p tsconfig.build.json

build-ci:
	SITE_CONFIG_PATH=site.config.ci.tsx openedx build

i18n.extract:
	# Pulling display strings from .jsx files into .json files...
	npm run-script i18n_extract

extract_translations: | requirements i18n.extract

pull_translations: | requirements
	npm run translations:pull -- --atlas-options="$(ATLAS_OPTIONS)"

# This target is used by CI.
validate-no-uncommitted-package-lock-changes:
	# Checking for package-lock.json changes...
	git diff --exit-code package-lock.json
