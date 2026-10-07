#!/usr/bin/env python3
"""Simulação didática de política PIM. Não altera permissões reais."""
from datetime import datetime, timedelta, timezone
import json


class PimLab:
    def __init__(self, eligible=None, max_minutes=30):
        self.eligible = set(eligible or {"analista-lab"})
        self.max_minutes = max_minutes
        self.active_until = {}
        self.events = []

    def log(self, action, user, now, reason):
        event = {"time": now.isoformat(), "action": action, "user": user, "reason": reason}
        self.events.append(event)
        return event

    def activate(self, user, minutes, justification, now):
        if user not in self.eligible:
            return self.log("activation_denied", user, now, "not_eligible")
        if not justification.strip():
            return self.log("activation_denied", user, now, "justification_required")
        if not isinstance(minutes, int) or not 1 <= minutes <= self.max_minutes:
            return self.log("activation_denied", user, now, "duration_exceeds_policy")
        self.active_until[user] = now + timedelta(minutes=minutes)
        return self.log("activated", user, now, "jit_granted")

    def authorize(self, user, now):
        allowed = user in self.eligible and now < self.active_until.get(user, now)
        return self.log("authorization_allowed" if allowed else "authorization_denied",
                        user, now, "active" if allowed else "not_active")


def demo():
    now = datetime(2026, 1, 1, 10, 0, tzinfo=timezone.utc)
    lab = PimLab()
    lab.activate("analista-lab", 30, "", now)
    lab.activate("analista-lab", 90, "INC-1042", now)
    lab.activate("analista-lab", 30, "INC-1042", now)
    lab.authorize("analista-lab", now + timedelta(minutes=5))
    lab.authorize("analista-lab", now + timedelta(minutes=31))
    for event in lab.events:
        print(json.dumps(event, ensure_ascii=False))


if __name__ == "__main__":
    demo()
