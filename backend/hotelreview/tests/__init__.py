import os
import sys

tests_path = os.path.dirname(__file__)
backend_path = os.path.join(tests_path, '..', '..', '..')

sys.path.append(backend_path)