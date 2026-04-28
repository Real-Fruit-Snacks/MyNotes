
Pretty small migration — here's what changes:

**1. Replace the workflow.** Delete `.github/workflows/deploy.yml`, add `.gitlab-ci.yml` at the repo root. GitLab Pages publishes whatever is in `public/` from a job named `pages`, so the build target changes from `site/` (mkdocs default) to `public/`:

```yaml
image: python:3-slim

pages:
  stage: deploy
  script:
    - pip install mkdocs-material mkdocs-glightbox
    - mkdocs build -d public
  artifacts:
    paths:
      - public
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
  cache:
    key: mkdocs-material
    paths:
      - .cache
```

**2. Drop `mkdocs gh-deploy`.** That command pushes to a `gh-pages` branch — GitHub-specific. GitLab Pages serves from CI artifacts instead, which is what the `artifacts.paths: public` line above does.

**3. Update `.gitignore`:** add `public/` alongside `site/` (or replace it).

**4. Add `site_url` to `mkdocs.yml`:** set it to your GitLab Pages URL — `https://<username>.gitlab.io/<projectname>/` for gitlab.com, or whatever your self-hosted instance uses. Material uses this for canonical links and the sitemap.

**5. Repoint the git remote** (not a file change): `git remote set-url origin git@gitlab.com:<user>/<repo>.git`.

That's it — no mkdocs config or CSS changes needed. The build is identical; only the deploy mechanism differs.