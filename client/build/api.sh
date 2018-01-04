
./lib/jsdoc/jsdoc -r -p \
-d ./api/drawing/full ./src \
-c ./build/api.linux.conf

cp -a -r ./api/drawing/full ./api/drawing/simple

./lib/jsdoc/jsdoc -r \
-d ./api/drawing/simple ./src \
-c ./build/api.linux.conf
