import unittest
from datetime import datetime, timedelta, timezone
from pim_simulator import PimLab


class PimPolicyTests(unittest.TestCase):
    def setUp(self):
        self.now = datetime(2026, 1, 1, tzinfo=timezone.utc)
        self.lab = PimLab()

    def test_requires_justification(self):
        self.assertEqual(self.lab.activate("analista-lab", 10, "", self.now)["reason"], "justification_required")

    def test_duration_limit(self):
        self.assertEqual(self.lab.activate("analista-lab", 31, "INC-1042", self.now)["reason"], "duration_exceeds_policy")

    def test_eligibility(self):
        self.assertEqual(self.lab.activate("intruso", 10, "INC-1042", self.now)["reason"], "not_eligible")

    def test_activation_and_expiry(self):
        self.assertEqual(self.lab.activate("analista-lab", 30, "INC-1042", self.now)["action"], "activated")
        self.assertEqual(self.lab.authorize("analista-lab", self.now + timedelta(minutes=5))["action"], "authorization_allowed")
        self.assertEqual(self.lab.authorize("analista-lab", self.now + timedelta(minutes=30))["action"], "authorization_denied")


if __name__ == "__main__":
    unittest.main()
