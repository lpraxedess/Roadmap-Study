import unittest
from sod_check import check

class SodTests(unittest.TestCase):
    def test_conflict(self):
        x=check([{"identity":"a","entitlement":"criar_pagamento"},{"identity":"a","entitlement":"aprovar_pagamento"}])
        self.assertEqual(len(x),1)
    def test_different_actors_no_conflict(self):
        x=check([{"identity":"a","entitlement":"criar_pagamento"},{"identity":"b","entitlement":"aprovar_pagamento"}])
        self.assertEqual(x,[])
    def test_missing_field(self):
        with self.assertRaises(ValueError):check([{"identity":"a"}])
if __name__=="__main__":unittest.main()
