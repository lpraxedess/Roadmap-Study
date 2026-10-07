import unittest
from jml_dry_run import plan

class JMLTests(unittest.TestCase):
    def test_joiner(self):
        self.assertEqual(plan([{"employeeId":"001","department":"TI","action":"joiner"}])[0]["operation"],"PROPOSE_CREATE")

    def test_duplicate(self):
        row={"employeeId":"001","department":"TI","action":"mover"}
        with self.assertRaisesRegex(ValueError,"duplicado"):
            plan([row,row])

    def test_invalid_action(self):
        with self.assertRaises(ValueError):
            plan([{"employeeId":"001","department":"TI","action":"drop"}])

    def test_privileged_leaver(self):
        with self.assertRaisesRegex(ValueError,"revisao manual"):
            plan([{"employeeId":"001","department":"breakglass","action":"leaver"}])

if __name__ == "__main__":
    unittest.main()
