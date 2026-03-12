npm-install-%: ## install specified % npm package
	npm install $* --save-dev
	git add package.json

intl_imports = ./node_modules/.bin/intl-imports.js
i18n = ./src/i18n

TURBO = TURBO_TELEMETRY_DISABLED=1 turbo --dangerously-disable-package-manager-check

NPM_TESTS=build i18n_extract lint test

# Variables for additional translation sources and imports (define in edx-internal if needed)
ATLAS_EXTRA_SOURCES ?=
ATLAS_EXTRA_INTL_IMPORTS ?=
ATLAS_OPTIONS ?=

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

i18n.extract:
	# Pulling display strings from .jsx files into .json files...
	npm run-script i18n_extract

extract_translations: | requirements i18n.extract

# Despite the name, we actually need this target to detect changes in the incoming translated message files as well.
detect_changed_source_translations:
	# Checking for changed translations...
	git diff --exit-code $(i18n)

pull_translations:
	rm -rf src/i18n/messages
	mkdir src/i18n/messages
	cd src/i18n/messages \
      && atlas pull $(ATLAS_OPTIONS) \
               translations/frontend-base/src/i18n/messages:frontend-base \
               translations/paragon/src/i18n/messages:paragon \
               translations/frontend-app-learner-dashboard/src/i18n/messages:frontend-app-learner-dashboard \
               $(ATLAS_EXTRA_SOURCES)

	$(intl_imports) frontend-base paragon frontend-app-learner-dashboard $(ATLAS_EXTRA_INTL_IMPORTS)

# This target is used by CI.
validate-no-uncommitted-package-lock-changes:
	# Checking for package-lock.json changes...
	git diff --exit-code package-lock.json
