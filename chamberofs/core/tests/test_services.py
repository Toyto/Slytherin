from django.test import TestCase
from unittest.mock import MagicMock
from core.services import Coordinates


class TestServices(TestCase):

    def test_get_coordinates(self):
        coord = Coordinates()
        coord.get_coordinates = MagicMock(return_value=('12.123', '13.123'))

        def set_coordinates(x, y):
            coord.get_coordinates = MagicMock(return_value=(x, y))

        coord.set_coordinates = MagicMock(side_effect=set_coordinates)

        self.assertEqual(coord.get_coordinates(), ('12.123', '13.123'))
        coord.set_coordinates('234.234', '667.545')
        self.assertEqual(coord.get_coordinates(), ('LUL', '667.545'))
