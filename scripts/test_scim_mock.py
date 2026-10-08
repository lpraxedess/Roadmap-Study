import json
import threading
import unittest
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from http.server import ThreadingHTTPServer
import scim_mock

class ScimTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server=ThreadingHTTPServer(("127.0.0.1",0),scim_mock.Handler)
        cls.url="http://127.0.0.1:"+str(cls.server.server_port)
        cls.thread=threading.Thread(target=cls.server.serve_forever,daemon=True)
        cls.thread.start()
    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join(timeout=3)
    def setUp(self):
        scim_mock.USERS.clear()
        scim_mock.SEQUENCE=0
    def call(self,path,method="GET",payload=None):
        data=json.dumps(payload).encode() if payload is not None else None
        req=Request(self.url+path,data=data,method=method,headers={"Content-Type":"application/scim+json"})
        with urlopen(req,timeout=3) as response:
            return response.status,json.load(response)
    def test_jml_create_deactivate(self):
        status,doc=self.call("/Users","POST",{"userName":"alice.lab","active":True})
        self.assertEqual(status,201)
        uid=doc["id"]
        status,doc=self.call("/Users/"+uid,"PATCH",{"schemas":[scim_mock.PATCH],"Operations":[{"op":"replace","path":"active","value":False}]})
        self.assertEqual(status,200)
        self.assertFalse(doc["active"])
    def test_duplicate_rejected(self):
        self.call("/Users","POST",{"userName":"alice.lab"})
        with self.assertRaises(HTTPError) as context:
            self.call("/Users","POST",{"userName":"alice.lab"})
        self.assertEqual(context.exception.code,409)
    def test_invalid_username(self):
        with self.assertRaises(HTTPError) as context:
            self.call("/Users","POST",{"active":True})
        self.assertEqual(context.exception.code,400)
if __name__=="__main__": unittest.main()
