#!/usr/bin/env bash
# Launches both the Express backend and CRA frontend, waits for them,
# smoke-tests both, then optionally tears them down.
#
# Usage:
#   bash .claude/skills/run-choiceroute/smoke.sh          # launch + verify + leave running
#   bash .claude/skills/run-choiceroute/smoke.sh --stop   # kill processes started by this script

set -e
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
BACKEND="$ROOT/react-backend"
CLIENT="$ROOT/react-backend/client"
BACKEND_LOG=/tmp/choiceroute-backend.log
CLIENT_LOG=/tmp/choiceroute-client.log
PIDS_FILE=/tmp/choiceroute.pids

stop() {
  if [ -f "$PIDS_FILE" ]; then
    while read -r pid; do
      kill "$pid" 2>/dev/null && echo "Killed $pid"
    done < "$PIDS_FILE"
    rm -f "$PIDS_FILE"
  fi
  exit 0
}

[ "${1:-}" = "--stop" ] && stop

# --- Backend ---
echo "==> Starting backend on :3001"
(cd "$BACKEND" && PORT=3001 node bin/www > "$BACKEND_LOG" 2>&1) &
BACKEND_PID=$!
echo "$BACKEND_PID" >> "$PIDS_FILE"

# Wait up to 10s for backend
for i in $(seq 1 10); do
  curl -sf http://localhost:3001/users > /dev/null 2>&1 && break
  [ "$i" -eq 10 ] && { echo "Backend failed to start"; cat "$BACKEND_LOG"; exit 1; }
  sleep 1
done
echo "   Backend up — /users OK"
curl -s http://localhost:3001/users

# --- Frontend ---
echo ""
echo "==> Starting frontend on :3000 (Node 10 required)"
source "${NVM_DIR:-$HOME/.nvm}/nvm.sh"
nvm use 10 --silent

(cd "$CLIENT" && BROWSER=none npm start > "$CLIENT_LOG" 2>&1) &
CLIENT_PID=$!
echo "$CLIENT_PID" >> "$PIDS_FILE"

# Wait up to 60s for CRA to compile
for i in $(seq 1 60); do
  curl -sf http://localhost:3000 > /dev/null 2>&1 && break
  [ "$i" -eq 60 ] && { echo "Frontend failed to start"; tail -30 "$CLIENT_LOG"; exit 1; }
  sleep 1
done
echo "   Frontend up — HTML shell OK"
curl -s http://localhost:3000 | grep -q 'bundle.js' && echo "   bundle.js referenced in HTML: OK"

echo ""
echo "Both processes running. PIDs in $PIDS_FILE"
echo "  Backend log:  $BACKEND_LOG"
echo "  Frontend log: $CLIENT_LOG"
echo ""
echo "Stop with: bash .claude/skills/run-choiceroute/smoke.sh --stop"
