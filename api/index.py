# Vercel Python serverless entry point.
# Imports the FastAPI app from /backend/server.py so the existing
# backend code runs under Vercel's Python runtime.
#
# When Vercel sees /api/index.py it auto-mounts it as a serverless
# function. `app` must be a WSGI/ASGI callable — FastAPI qualifies.
#
# Requires: /backend/requirements.txt to be reachable from Vercel's
# builder. Since we're loading from a sibling folder, we prepend it
# to sys.path.

import sys
from pathlib import Path

# Make /backend importable from /api
BACKEND_DIR = Path(__file__).resolve().parent.parent / "backend"
sys.path.insert(0, str(BACKEND_DIR))

# Re-export the FastAPI app
from server import app  # noqa: E402,F401
