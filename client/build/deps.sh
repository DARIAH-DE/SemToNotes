#!/bin/bash

cd src
../lib/closure-library/closure/bin/build/depswriter.py --root_with_prefix=". ../../../../src" > deps.js
cd ..

