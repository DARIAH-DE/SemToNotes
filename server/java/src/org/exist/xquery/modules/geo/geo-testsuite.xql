xquery version "3.0";

import module namespace test="http://exist-db.org/xquery/xqsuite" 
    at "resource:org/exist/xquery/lib/xqsuite/xqsuite.xql";

declare option exist:serialize "method=xml media-type=application/xml";

test:suite(
    inspect:module-functions(xs:anyURI('geo-test.xql'))
)