import json
import os
import sys
import threading
import unittest
from http.server import ThreadingHTTPServer
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from scim_server import Store, handler_factory, PATCH_SCHEMA

TOKEN = "atlas-corp-laboratorio-token-123456"


class SCIMTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.store = Store(":memory:")
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), handler_factory(cls.store, TOKEN))
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.base = "http://127.0.0.1:%s" % cls.server.server_port

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()

    def request(self, method, path, obj=None, token=TOKEN):
        body = json.dumps(obj).encode("utf-8") if obj is not None else None
        headers = {"Content-Type": "application/scim+json"}
        if token is not None: headers["Authorization"] = "Bearer " + token
        req = Request(self.base + path, body, headers, method=method)
        try:
            with urlopen(req, timeout=3) as resp:
                return resp.status, json.load(resp)
        except HTTPError as e:
            return e.code, json.load(e)

    def test_health(self):
        status, data = self.request("GET", "/healthz", token=None)
        self.assertEqual((status, data["status"]), (200, "ok"))

    def test_requires_auth(self):
        status, _ = self.request("GET", "/scim/v2/Users", token=None)
        self.assertEqual(status, 401)

    def test_create_search_patch_and_conflict(self):
        import uuid
        name = "ana" + uuid.uuid4().hex[:8]
        external = "RH-" + uuid.uuid4().hex[:10]
        status, user = self.request("POST", "/scim/v2/Users", {"userName": name, "externalId": external, "active": True})
        self.assertEqual(status, 201)
        ident = user["id"]
        status, data = self.request("GET", "/scim/v2/Users?filter=externalId%20eq%20%22" + external + "%22")
        self.assertEqual(status, 200)
        self.assertEqual((data["totalResults"], data["Resources"][0]["id"]), (1, ident))
        status, patched = self.request("PATCH", "/scim/v2/Users/" + ident,
                                       {"schemas": [PATCH_SCHEMA], "Operations": [{"op": "replace", "path": "active", "value": False}]})
        self.assertEqual(status, 200)
        self.assertIs(patched["active"], False)
        status, _ = self.request("POST", "/scim/v2/Users", {"userName": name, "externalId": external})
        self.assertEqual(status, 409)

    def test_denies_invalid_changes(self):
        status, _ = self.request("PATCH", "/scim/v2/Users/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                                 {"schemas": [PATCH_SCHEMA], "Operations": [{"op": "replace", "path": "password", "value": "x"}]})
        self.assertIn(status, (400, 404))


if __name__ == "__main__":
    unittest.main()
