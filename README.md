# local-docker-cd

A small Flask application that explains and demonstrates the repository's
GitHub Actions CD workflow.

## Run locally

```powershell
docker build -t local-cd-demo:latest .
docker run --rm -p 5000:5000 local-cd-demo:latest
```

Open <http://localhost:5000>. The page's health check calls `/health`; an `ok`
response means the Flask app is responding, not that a GitHub Actions run
succeeded.

## What the CD workflow does

Pushing to `main` starts `.github/workflows/cd-pipeline.yml` on a self-hosted
GitHub Actions runner. The runner checks out the code, builds the
`local-cd-demo:latest` Docker image, removes the existing container, starts a
new container on host port 5000, and checks the app with `curl`.

The runner machine needs Docker installed and running. This workflow deploys
to that machine; it does not publish an image to a registry or deploy to a
cloud host. It also removes the old container before verifying the new one, so
it does not provide an automatic rollback if the new deployment fails. Check
the repository's **Actions** tab to see whether a workflow run completed
successfully.