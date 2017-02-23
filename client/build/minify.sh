
./lib/closure-library/closure/bin/build/closurebuilder.py \
  --root=./lib/closure-library/ \
  --root=./src \
  --namespace="xrx.api.drawing" \
  --output_mode=compiled \
  --compiler_jar=./lib/closure-compiler/compiler.jar \
  --compiler_flags="--compilation_level=SIMPLE_OPTIMIZATIONS" \
  > ./xrx.api.drawing.min.js

  ./lib/closure-library/closure/bin/build/closurebuilder.py \
  --root=./lib/closure-library/ \
  --root=./src \
  --namespace="xrx.demo" \
  --output_mode=compiled \
  --compiler_jar=./lib/closure-compiler/compiler.jar \
  --compiler_flags="--compilation_level=SIMPLE_OPTIMIZATIONS" \
  > ./xrx.demo.min.js