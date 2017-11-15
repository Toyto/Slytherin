#!/bin/sh

echo "Yo, man"
export VERSION="$(git describe --tags)"
echo "Version="$VERSION
