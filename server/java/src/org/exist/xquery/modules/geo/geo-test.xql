xquery version "3.0";



module namespace geo-test="http://expath.org/ns/geo-test";

declare namespace test="http://exist-db.org/xquery/xqsuite";
declare namespace geo="http://expath.org/ns/geo";



declare
    %test:arg('geometry', 'PPOINT (30 10)') %test:assertError('')
    %test:arg('geometry', 'UNKNOWN (30 10)') %test:assertError('Unknown Geometry')
function geo-test:error-unknown-geometry($geometry as xs:string) {
    geo:dimension($geometry)
};



declare
function geo-test:error-invalid-matrix($geometry as xs:string) {
    (: TODO :)
    ()
};


(:~
 :  ########################
 :  1 General functions (12)
 :  ########################
:)



declare
    %test:arg('geometry', 'POINT (30 10)') %test:assertEquals(0)
    %test:arg('geometry', 'LINESTRING (30 10, 10 30, 40 40)') %test:assertEquals(1)
    %test:arg('geometry', 'POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))') %test:assertEquals(2)
function geo-test:dimension($geometry as xs:string) as xs:integer {
    geo:dimension($geometry)
};


declare
function geo-test:coordinate-dimension($geometry as xs:string) as xs:integer {
  (: function not implemented :)
  ()
};



declare
    %test:arg('geometry', 'POINT (30 10)') %test:assertEquals('Point')
    %test:arg('geometry', 'LINESTRING (30 10, 40 40, 20 40)') %test:assertEquals('LineString')
function geo-test:geometry-type($geometry as xs:string) as xs:string? {
    geo:geometry-type($geometry)
};



declare
function geo-test:srid($geometry as xs:string) as xs:anyURI? {
  (: always returns 0, what do we test here? :)
  ()
};



declare
    %test:arg('geometry', 'LINESTRING (30 10, 10 30, 40 40)')
    %test:assertEquals('POLYGON ((10 10, 40 10, 40 40, 10 40, 10 10))')
    %test:arg('geometry', 'POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))')
    %test:assertEquals('POLYGON ((10 10, 40 10, 40 40, 10 40, 10 10))')
function geo-test:envelope($geometry as xs:string) as xs:string? {
  geo:envelope($geometry)
};



declare
    %test:arg('geometry', 'POINT (30 10)') %test:assertEquals('POINT (30 10)')
function geo-test:as-text($geometry as xs:string) as xs:string? {
    geo:as-text($geometry)
};



declare
function geo-test:as-binary($geometry as xs:string) as xs:boolean {
    (: TODO :)
    ()
};



declare
    %test:arg('geometry', 'POINT EMPTY')
    %test:assertTrue
    %test:arg('geometry', 'POLYGON EMPTY')
    %test:assertTrue
    %test:arg('geometry', 'POINT (30 10)')
    %test:assertFalse
    %test:arg('geometry', 'POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))')
    %test:assertFalse
function geo-test:is-empty($geometry as xs:string) as xs:boolean {
    geo:is-empty($geometry)
};



declare
    %test:arg('geometry', 'LINESTRING (0 0, 1 1)')
    %test:assertTrue
    %test:arg('geometry', 'LINESTRING (30 10, 10 30, 40 40, 50 50, 10 30)')
    %test:assertFalse
function geo-test:is-simple($geometry as xs:string) as xs:boolean {
    geo:is-simple($geometry)
};



declare
function geo-test:is-3d($geometry as xs:string) as xs:boolean {
  (: function not implemented :)
  ()
};



declare
function geo-test:is-measured($geometry as xs:string) as xs:boolean {
  (: function not implemented :)
  ()
};



declare
    %test:arg('geometry', 'LINESTRING (30 10, 10 30, 40 40)')
    %test:assertEquals('MULTIPOINT (30 10, 40 40)')
function geo-test:boundary($geometry as xs:string) as xs:string {
    geo:boundary($geometry)
};



(:~
 :  ########################
 :  2 Spatial predicate functions (9)
 :  ########################
:)



declare
    %test:args('MULTIPOINT (80 70, 20 20, 200 170, 140 120)', 'MULTIPOINT (80 170, 140 120, 200 80, 80 70)')
    %test:assertFalse
function geo-test:equals($geometry1 as xs:string, $geometry2 as xs:string) as xs:boolean {
    geo:equals($geometry1, $geometry2)
};



declare
    %test:args('MULTIPOINT (80 70, 20 20, 200 170, 140 120)', 'MULTIPOINT (80 170, 140 120, 200 80, 80 70)')
    %test:assertFalse
function geo-test:disjoint($geometry1 as xs:string, $geometry2 as xs:string) as xs:boolean {
    geo:disjoint($geometry1, $geometry2)
};



declare
    %test:args('MULTIPOINT (80 70, 20 20, 200 170, 140 120)', 'MULTIPOINT (80 170, 140 120, 200 80, 80 70)')
    %test:assertTrue
function geo-test:intersects($geometry1 as xs:string, $geometry2 as xs:string) as xs:boolean {
    geo:intersects($geometry1, $geometry2)
};



declare
    %test:args('MULTIPOINT (80 70, 20 20, 200 170, 140 120)', 'MULTIPOINT (80 170, 140 120, 200 80, 80 70)')
    %test:assertFalse
function geo-test:touches($geometry1 as xs:string, $geometry2 as xs:string) as xs:boolean {
    geo:touches($geometry1, $geometry2)
};



declare
    %test:args('MULTIPOINT (80 70, 20 20, 200 170, 140 120)', 'MULTIPOINT (80 170, 140 120, 200 80, 80 70)')
    %test:assertFalse
function geo-test:crosses($geometry1 as xs:string, $geometry2 as xs:string) as xs:boolean {
    geo:crosses($geometry1, $geometry2)
};



declare
    %test:args('MULTIPOINT (80 70, 20 20, 200 170, 140 120)', 'MULTIPOINT (80 170, 140 120, 200 80, 80 70)')
    %test:assertFalse
function geo-test:within($geometry1 as xs:string, $geometry2 as xs:string) as xs:boolean {
    geo:within($geometry1, $geometry2)
};



declare
    %test:args('MULTIPOINT (80 70, 20 20, 200 170, 140 120)', 'MULTIPOINT (80 170, 140 120, 200 80, 80 70)')
    %test:assertFalse
function geo-test:contains($geometry1 as xs:string, $geometry2 as xs:string) as xs:boolean {
    geo:contains($geometry1, $geometry2)
};



declare
    %test:args('MULTIPOINT (80 70, 20 20, 200 170, 140 120)', 'MULTIPOINT (80 170, 140 120, 200 80, 80 70)')
    %test:assertTrue
function geo-test:overlaps($geometry1 as xs:string, $geometry2 as xs:string) as xs:boolean {
    geo:overlaps($geometry1, $geometry2)
};



declare
    %test:args('MULTIPOINT (80 70, 20 20, 200 170, 140 120)',
        'MULTIPOINT (80 170, 140 120, 200 80, 80 70)',
        '0F0FFF0F2')
    %test:assertTrue
    %test:args('MULTIPOINT (80 70, 20 20, 200 170, 140 120)',
        'MULTIPOINT (80 170, 140 120, 200 80, 80 70)',
        '000000000')
    %test:assertFalse
function geo-test:relate($geometry1 as xs:string, $geometry2 as xs:string, $intersection-matrix-pattern) as xs:boolean {
    geo:relate($geometry1, $geometry2, $intersection-matrix-pattern)
};



(:~
 :  ########################
 :  3 Analysis functions (7)
 :  ########################
:)



declare
    %test:args('POINT (10 20)', 'POINT (10 30)')
    %test:assertEquals(10)
function geo-test:distance($geometry1 as xs:string, $geometry2 as xs:string) as xs:double {
    geo:distance($geometry1, $geometry2)
};



declare
function geo-test:buffer($geometry as xs:string, $distance as xs:double) as xs:string* {
    (: TODO :)
    ()
};



declare
    %test:args('LINESTRING (120 230, 120 200, 150 180, 180 220, 160 260, 90 250, 80 190, 140 110, 230 150, 240 230, 180 320, 60 310, 40 160, 140 50, 280 140)')
    %test:assertEquals('POLYGON ((140 50, 40 160, 60 310, 180 320, 240 230, 280 140, 140 50))')
function geo-test:convex-hull($geometry as xs:string) as xs:string? {
    geo:convex-hull($geometry)
};



declare
    %test:args('POLYGON ((10 10, 100 10, 100 100, 10 100, 10 10))', 'POLYGON ((50 50, 200 50, 200 200, 50 200, 50 50))')
    %test:assertEquals('POLYGON ((50 100, 100 100, 100 50, 50 50, 50 100))')
function geo-test:intersection($geometry1 as xs:string, $geometry2 as xs:string) as xs:string? {
    geo:intersection($geometry1, $geometry2)
};



declare
    %test:args('POLYGON ((10 10, 100 10, 100 100, 10 100, 10 10))', 'POLYGON ((50 50, 200 50, 200 200, 50 200, 50 50))')
    %test:assertEquals('POLYGON ((100 50, 100 10, 10 10, 10 100, 50 100, 50 200, 200 200, 200 50, 100 50))')
function geo-test:union($geometry1 as xs:string, $geometry2 as xs:string) as xs:string? {
    geo:union($geometry1, $geometry2)
};



declare
    %test:args('POLYGON ((10 10, 100 10, 100 100, 10 100, 10 10))', 'POLYGON ((50 50, 200 50, 200 200, 50 200, 50 50))')
    %test:assertEquals('POLYGON ((100 50, 100 10, 10 10, 10 100, 50 100, 50 50, 100 50))')
function geo-test:difference($geometry1 as xs:string, $geometry2 as xs:string) as xs:string? {
    geo:difference($geometry1, $geometry2)
};



declare
    %test:args('POLYGON ((10 10, 100 10, 100 100, 10 100, 10 10))', 'POLYGON ((50 50, 200 50, 200 200, 50 200, 50 50))')
    %test:assertEquals('MULTIPOLYGON (((100 50, 100 10, 10 10, 10 100, 50 100, 50 50, 100 50)), ((100 50, 100 100, 50 100, 50 200, 200 200, 200 50, 100 50)))')
function geo-test:sym-difference($geometry1 as xs:string, $geometry2 as xs:string) as xs:string? {
    geo:sym-difference($geometry1, $geometry2)
};



(:~
 :  ########################
 :  4 Functions specific to geometry type
 :  ########################
:)



(: 4.1 geometry collection (2) :)
declare
    %test:args('GEOMETRYCOLLECTION (POINT (4 6), LINESTRING (4 6,7 10))')
    %test:assertEquals(2)
function geo-test:num-geometries($geometry-collection as xs:string) as xs:integer {
    geo:num-geometries($geometry-collection)
};



declare
    %test:args('GEOMETRYCOLLECTION (POINT (4 6), LINESTRING (4 6,7 10))', 0)
    %test:assertEquals('POINT (4 6)')
function geo-test:geometry-n($geometry-collection as xs:string, $n as xs:integer) as xs:string {
    geo:geometry-n($geometry-collection, $n)
};



(: 4.2 Point (4) :)
declare
    %test:args('POINT (1 2 3)')
    %test:assertEquals(1)
function geo-test:x($point as xs:string) as xs:double {
    geo:x($point)
};



declare
    %test:args('POINT (1 2 3)')
    %test:assertEquals(2)
function geo-test:y($point as xs:string) as xs:double {
    geo:y($point)
};



declare
    %test:args('POINT (1 2 3)')
    %test:assertEquals(3)
function geo-test:z($point as xs:string) as xs:double? {
    geo:z($point)
};



declare
function geo-test:m($point as xs:string) as xs:double? {
    (: function not implemented :)
    ()
};



(: 4.3 Curve (5) :)
declare
function geo-test:length_curve($curve as xs:string) as xs:double {
    (: function not implemented for this type :)
    ()
};



declare
function geo-test:start-point($curve as xs:string) as xs:string {
    (: function not implemented :)
    ()
};



declare
function geo-test:end-point($curve as xs:string) as xs:string {
    (: function not implemented :)
    ()
};



declare
function geo-test:is-closed_curve($curve as xs:string) as xs:string {
    (: function not implemented :)
    ()
};



declare
function geo-test:is-ring($curve as xs:string) as xs:string {
    (: function not implemented :)
    ()
};


(: 4.3.1 LineString, Line, LinearRing (2) :)
declare
    %test:args('LINESTRING (30 10, 10 30, 40 40)')
    %test:assertEquals(3)
function geo-test:num-points($line-string as xs:string) as xs:integer {
    geo:num-points($line-string)
};



declare
    %test:args('LINESTRING (30 10, 10 30, 40 40)', 1)
    %test:assertEquals('POINT (10 30)')
function geo-test:point-n($line-string as xs:string, $n as xs:integer) as xs:string {
    geo:point-n($line-string, $n)
};



(: 4.4 MultiLineString (2) :)
declare
function geo-test:is-closed-multi-line-string($multi-line-string as xs:string) as xs:boolean {
    geo:is-closed($multi-line-string)
};



declare
function geo-test:length-multi-line-string($multi-line-string as xs:string) as xs:double {
    geo:length($multi-line-string)
};



(: 4.5 Surface (7) :)
declare
function geo-test:area-surface($surface as xs:string) as xs:double {
    (: TODO :)
    ()
};



declare
function geo-test:centroid-surface($surface as xs:string) as xs:string {
    (: TODO :)
    ()
};



declare
function geo-test:point-on-surface-surface($surface as xs:string) as xs:string {
    (: TODO :)
    ()
};



declare
function geo-test:num-patches($surface as xs:string) as xs:string {
    (: function not implemented :)
    ()
};



declare
function geo-test:centroid-surface($polyhedral-surface as xs:string) as xs:integer {
    (: function not implemented :)
    ()
};



declare
function geo-test:centroid-surface($polyhedral-surface as xs:string, $n as xs:integer) as xs:string {
    (: function not implemented :)
    ()
};



declare
function geo-test:bounding-polygons($polyhedral-surface as xs:string, $polygon as xs:string) as xs:string* {
    (: function not implemented :)
    ()
};



declare
function geo-test:is-closed-surface($polyhedral-surface as xs:string) as xs:string* {
    (: TODO :)
    ()
};



(: 4.6 Polygon (3) :)
declare
    %test:args('POLYGON ((20 35, 10 30, 10 10, 30 5, 45 20, 20 35), (30 20, 20 15, 20 25, 30 20))')
    %test:assertEquals('LINEARRING (20 35, 10 30, 10 10, 30 5, 45 20, 20 35)')
function geo-test:exterior-ring($polygon as xs:string) as xs:string {
    geo:exterior-ring($polygon)
};



declare
    %test:args('POLYGON ((20 35, 10 30, 10 10, 30 5, 45 20, 20 35), (30 20, 20 15, 20 25, 30 20))')
    %test:assertEquals(1)
function geo-test:num-interior-ring($polygon as xs:string) as xs:integer {
    geo:num-interior-ring($polygon)
};



declare
    %test:args('POLYGON ((20 35, 10 30, 10 10, 30 5, 45 20, 20 35), (30 20, 20 15, 20 25, 30 20))', 0)
    %test:assertEquals('LINEARRING (30 20, 20 15, 20 25, 30 20)')
function geo-test:interior-ring-n($polygon as xs:string, $n as xs:integer) as xs:string {
    geo:interior-ring-n($polygon, $n)
};



(: 4.7 MultiSurface, MultiPolygon (3) :)
declare
function geo-test:area-multi-surface($multi-surface as xs:string) as xs:double {
    (: TODO :)
    ()
};



declare
function geo-test:centroid-multi-surface($multi-surface as xs:string) as xs:string {
    (: TODO :)
    ()
};



declare
function geo-test:point-on-surface-multi-surface($multi-surface as xs:string) as xs:string {
    (: TODO :)
    ()
};
