/*
 *  eXist EXPath Geo Module Extension
 *  Copyright (C) 2015 Jochen Graf <jochen.graf@uni-koeln.de>
 *  
 *  This program is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public License
 *  as published by the Free Software Foundation; either version 2
 *  of the License, or (at your option) any later version.
 *  
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *  
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 *  
 *  $Id$
 */
package org.exist.xquery.modules.geo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

//import org.apache.logging.log4j.LogManager;
//import org.apache.logging.log4j.Logger;

import org.exist.xquery.AbstractInternalModule;
import org.exist.xquery.Cardinality;
import org.exist.xquery.FunctionDef;
import org.exist.xquery.value.FunctionParameterSequenceType;
import org.exist.xquery.value.FunctionReturnSequenceType;
import org.exist.xquery.value.SequenceType;
import org.exist.xquery.value.Type;

/**
 * @author Jochen Graf <jochen.graf@uni-koeln.de>
 * @version EXPath Geo Module Candidate 30 September 2010 http://expath.org/spec/geo/20100930
 */
public class GeoModule extends AbstractInternalModule {
    
    //private static final Logger LOG = LogManager.getLogger(GeoModule.class);

    public final static String NAMESPACE_URI = "http://exist-db.org/xquery/geo";

    public final static String PREFIX = "geo";
    public final static String INCLUSION_DATE = "2015-07-13";
    public final static String RELEASED_IN_VERSION = "3.0";

    /**
     * Recurring function parameter definitions
     */
    // $geometry as xs:string
    private final static FunctionParameterSequenceType PARAM_GEOMETRY1 =
        new FunctionParameterSequenceType("geometry", Type.STRING, Cardinality.EXACTLY_ONE, "The geometry");
    // $another-geometry as xs:string
    private final static FunctionParameterSequenceType PARAM_GEOMETRY2 =
        new FunctionParameterSequenceType("another-geometry", Type.STRING, Cardinality.EXACTLY_ONE, "The second geometry");
    // $intersection-matrix-pattern as xs:string
    private final static FunctionParameterSequenceType PARAM_MATRIX_PATTERN =
        new FunctionParameterSequenceType("intersection-matrix-pattern", Type.STRING, Cardinality.EXACTLY_ONE, "The intersection matrix pattern");
    // $distance as xs:double
    private final static FunctionParameterSequenceType PARAM_DISTANCE =
        new FunctionParameterSequenceType("distance", Type.DOUBLE, Cardinality.EXACTLY_ONE, "The distance");
    // $geometry-collection as xs:string
    private final static FunctionParameterSequenceType PARAM_GEOMETRY_COLL =
        new FunctionParameterSequenceType("geometry-collection", Type.STRING, Cardinality.EXACTLY_ONE, "The geometry collection");
    // $point as xs:string
    private final static FunctionParameterSequenceType PARAM_POINT =
        new FunctionParameterSequenceType("point", Type.STRING, Cardinality.EXACTLY_ONE, "The point");
    // $curve as xs:string
    private final static FunctionParameterSequenceType PARAM_CURVE =
        new FunctionParameterSequenceType("curve", Type.STRING, Cardinality.EXACTLY_ONE, "The curve");
    // $line-string as xs:string
    private final static FunctionParameterSequenceType PARAM_LINE_STRING =
        new FunctionParameterSequenceType("line-string", Type.STRING, Cardinality.EXACTLY_ONE, "The line-string");
    // $multi-line-string as xs:string
    private final static FunctionParameterSequenceType PARAM_MULTI_LINE_STRING =
        new FunctionParameterSequenceType("multi-line-string", Type.STRING, Cardinality.EXACTLY_ONE, "The multi-line-string");
    // $surface as xs:string
    private final static FunctionParameterSequenceType PARAM_SURFACE =
        new FunctionParameterSequenceType("surface", Type.STRING, Cardinality.EXACTLY_ONE, "The surface");
    // $polyhedral-surface as xs:string
    private final static FunctionParameterSequenceType PARAM_POLYHEDRAL_SURFACE =
        new FunctionParameterSequenceType("polyhedral-surface", Type.STRING, Cardinality.EXACTLY_ONE, "The polyhedral surface");
    // $polygon as xs:string
    private final static FunctionParameterSequenceType PARAM_POLYGON =
        new FunctionParameterSequenceType("polygon", Type.STRING, Cardinality.EXACTLY_ONE, "The polygon");
    // $n as xs:integer
    private final static FunctionParameterSequenceType PARAM_N =
        new FunctionParameterSequenceType("n", Type.INTEGER, Cardinality.EXACTLY_ONE, "The nth position");
    // $multi-surface as xs:string
    private final static FunctionParameterSequenceType PARAM_MULTI_SURFACE =
        new FunctionParameterSequenceType("multi-surface", Type.STRING, Cardinality.EXACTLY_ONE, "The multi-surface");
    
    /**
     * Recurring sequence type definitions
     */
    // func($geometry as xs:string)
    public final static SequenceType[] SEQ_1GEOMETRY = new SequenceType[]{PARAM_GEOMETRY1};
    // func($geometry as xs:string, $another-geometry as xs:string)
    public final static SequenceType[] SEQ_2GEOMETRY = new SequenceType[]{PARAM_GEOMETRY1, PARAM_GEOMETRY2};
    // func($geometry-collection as xs:string)
    public final static SequenceType[] SEQ_1GEOMETRY_COLL = new SequenceType[]{PARAM_GEOMETRY_COLL};
    // func($point as xs:string)
    public final static SequenceType[] SEQ_1POINT = new SequenceType[]{PARAM_POINT};
    // func($curve as xs:string)
    public final static SequenceType[] SEQ_1CURVE = new SequenceType[]{PARAM_CURVE};
    // func($multi-line-string as xs:string)
    public final static SequenceType[] SEQ_1MULTI_LINE_STRING = new SequenceType[]{PARAM_MULTI_LINE_STRING};
    // func($surface as xs:string)
    public final static SequenceType[] SEQ_1SURFACE = new SequenceType[]{PARAM_SURFACE};
    // func($polyhedral-surface as xs:string)
    public final static SequenceType[] SEQ_1POLYHEDRAL_SURFACE = new SequenceType[]{PARAM_POLYHEDRAL_SURFACE};
    // func($polygon as xs:string)
    public final static SequenceType[] SEQ_1POLYGON = new SequenceType[]{PARAM_POLYGON};
    // func($multi-surface as xs:string)
    public final static SequenceType[] SEQ_1MULTI_SURFACE = new SequenceType[]{PARAM_MULTI_SURFACE};

    /**
     * Helper Class to reduce Java formalisms
     */
    public static class Func {
        
        private final String description;
        private final SequenceType[] sequenceType;
        private final FunctionReturnSequenceType returnSequenceType;
        
        public Func(String d, SequenceType[] st, FunctionReturnSequenceType rst) {
            this.description = d;
            this.sequenceType = st;
            this.returnSequenceType = rst;
        }
        
        public String getDescription() {
            return this.description;
        }
        
        public SequenceType[] getSequenceType() {
            return this.sequenceType;
        }
        
        public FunctionReturnSequenceType getReturnSequenceType() {
            return this.returnSequenceType;
        }
        
    }
    
    public static Map<String, Func> FUNC = new HashMap<String, Func>();
    
    static {
        
        // ########################
        // 1 General Functions (12)
        // ########################

        FUNC.put("dimension", new Func(
                "Returns the number of dimensions of the geometry ie. -1 (null) 0 (point),1 (line)," +
                "2 (area). Always less than or equal to the dimension of the coordinate space.",
                SEQ_1GEOMETRY,
                new FunctionReturnSequenceType(Type.INTEGER, Cardinality.ZERO_OR_ONE, "The number of dimensions of the geometry")));

        FUNC.put("coordinate-dimension", new Func(
                "Returns the number of dimensions of the coordinate reference system of the geometry. " +
                "ie. 2,3,4 dimensional coordinate space; always greater than or equal to the value returned " +
                "by dimension($geometry).",
                SEQ_1GEOMETRY,
                new FunctionReturnSequenceType(Type.INTEGER, Cardinality.EXACTLY_ONE, "The number of dimensions of the coordinate reference system")));
        
        FUNC.put("geometry-type", new Func(
                "Returns the name of the geometry type in the GML namespace, or the empty sequence. " +
                "Must be one of gml:Point, gml:Curve, gml:LineString, gml:Surface, gml:Polygon, " +
                "gml:MultiPoint, gml:MultiCurve, gml:MultiLineString, gml:MultiSurface, or gml:MultiPolygon.",
                SEQ_1GEOMETRY,
                new FunctionReturnSequenceType(Type.STRING, Cardinality.ZERO_OR_ONE, "The name of the geometry type")));
        
        FUNC.put("srid", new Func(
                "Returns the URI of the CRS of the geometry, or the empty sequence if unknown.",
                SEQ_1GEOMETRY,
                new FunctionReturnSequenceType(Type.ANY_URI, Cardinality.ZERO_OR_ONE, "The URI of the CRS of the geometry")));
        
        FUNC.put("envelope", new Func(
                "Returns the gml:Envelope of the specified geometry.",
                SEQ_1GEOMETRY,
                new FunctionReturnSequenceType(Type.STRING, Cardinality.ZERO_OR_ONE, "The envelope of the geometry")));
        
        FUNC.put("as-text", new Func(
                "Returns the WKT representation of the geometry.",
                SEQ_1GEOMETRY,
                new FunctionReturnSequenceType(Type.STRING, Cardinality.ZERO_OR_ONE, "The WKT representation of the geometry")));
        
        FUNC.put("as-binary", new Func(
                "Returns the base64-encoded Well Known Binary (WKB) representation of the geometry.",
                SEQ_1GEOMETRY,
                new FunctionReturnSequenceType(Type.BASE64_BINARY, Cardinality.ZERO_OR_ONE, "The WKB representation of the geometry")));
        
        FUNC.put("is-empty", new Func(
                "Returns whether the geometry is empty.",
                SEQ_1GEOMETRY,
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether the geometry is empty")));
        
        FUNC.put("is-simple", new Func(
                "Returns whether the geometry is simple (ie. does not self-intersect and does not " +
                "pass through the same point more than once (may be a ring)).",
                SEQ_1GEOMETRY,
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether the geometry is simple")));
        
        FUNC.put("is-3d", new Func(
                "Returns whether the geometry has z values.",
                SEQ_1GEOMETRY,
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether the geometry has z values")));
        
        FUNC.put("is-measured", new Func(
                "Returns whether the geometry has m values.",
                SEQ_1GEOMETRY,
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether the geometry has m values")));
        
        FUNC.put("boundary", new Func(
                "Returns the boundary of the geometry, in GML. The return value is a sequence of " +
                "either gml:Point or gml:LinearRing elements.",
                SEQ_1GEOMETRY,
                new FunctionReturnSequenceType(Type.STRING, Cardinality.ZERO_OR_ONE, "The boundary of the geometry")));

        // ########################
        // 2 Spatial predicate functions ()
        // ########################
        
        FUNC.put("equals", new Func(
                "Returns whether $geometry is spatially equal to $another-geometry.",
                SEQ_2GEOMETRY,
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether $geometry is spatially equal to $another-geometry")));
        
        FUNC.put("disjoint", new Func(
                "Returns whether $geometry is spatially disjoint from $another-geometry.",
                SEQ_2GEOMETRY,
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether $geometry is spatially disjoint from $another-geometry")));
        
        FUNC.put("intersects", new Func(
                "Returns whether $geometry spatially intersects $another-geometry.",
                SEQ_2GEOMETRY,
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether $geometry spatially intersects $another-geometry")));
        
        FUNC.put("touches", new Func(
                "Returns whether $geometry spatially touches $another-geometry.",
                SEQ_2GEOMETRY,
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether $geometry spatially touches $another-geometry")));
        
        FUNC.put("crosses", new Func(
                "Returns whether $geometry spatially crosses $another-geometry.",
                SEQ_2GEOMETRY,
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether $geometry spatially crosses $another-geometry")));
        
        FUNC.put("within", new Func(
                "Returns whether $geometry is spatially within $another-geometry.",
                SEQ_2GEOMETRY,
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether $geometry is spatially within $another-geometry")));
        
        FUNC.put("contains", new Func(
                "Returns whether $geometry spatially contains $another-geometry.",
                SEQ_2GEOMETRY,
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether $geometry spatially contains $another-geometry")));
        
        FUNC.put("overlaps", new Func(
                "Returns whether $geometry spatially overlaps $another-geometry.",
                SEQ_2GEOMETRY,
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether $geometry spatially overlaps $another-geometry")));
        
        FUNC.put("relate", new Func(
                "Returns whether relationships between the boundaries, interiors and exteriors of " +
                "$geometry and $another-geometry match the pattern specified in $intersection-matrix-pattern.",
                new SequenceType[]{PARAM_GEOMETRY1, PARAM_GEOMETRY2, PARAM_MATRIX_PATTERN},
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether $intersection-matrix-pattern matches")));

        // ########################
        // 3 Analysis functions (7)
        // ########################
        
        FUNC.put("distance", new Func(
                "Returns the shortest distance, in the units of the spatial reference system of " +
                "$geometry, between the geometries, where that distance is the distance between a " +
                "point on each of the geometries.",
                SEQ_2GEOMETRY,
                new FunctionReturnSequenceType(Type.DOUBLE, Cardinality.EXACTLY_ONE, "The shortest distance between the geometries")));
        
        FUNC.put("buffer", new Func(
                "Returns a sequence of zero or more polygonal geometries representing the buffer by " +
                "$distance of $geometry, in the spatial reference system of $geometry. The returned " +
                "elements must be either gml:Polygon or gml:MultiPolygon.",
                new SequenceType[]{PARAM_GEOMETRY1, PARAM_DISTANCE},
                new FunctionReturnSequenceType(Type.STRING, Cardinality.ZERO_OR_MORE, "A sequence of zero or more polygonal geometries representing the buffer")));
        
        FUNC.put("convex-hull", new Func(
                "Returns the convex hull geometry of $geometry in GML, or the empty sequence. The " +
                "returned element must be either gml:Polygon, gml:LineString or gml:Point.",
                SEQ_1GEOMETRY,
                new FunctionReturnSequenceType(Type.STRING, Cardinality.ZERO_OR_ONE, "The convex hull geometry or the empty sequence")));
        
        FUNC.put("intersection", new Func(
                "Returns the intersection geometry of $geometry with $another-geometry, in GML. " +
                "The returned element must be either gml:Point, gml:LineString, gml:Polygon, " +
                "gml:MultiPoint, gml:MultiLineString or gml:MultiPolygon.",
                SEQ_2GEOMETRY,
                new FunctionReturnSequenceType(Type.STRING, Cardinality.ZERO_OR_ONE, "The intersection geometry or the empty sequence")));
        
        FUNC.put("union", new Func(
                "Returns the union geometry of $geometry with $another-geometry, in GML. The " +
                "returned element must be either gml:Point, gml:Curve, gml:LineString, gml:Surface, " +
                "gml:Polygon, gml:MultiPoint, gml:MultiCurve, gml:MultiLineString or gml: MultiPolygon.",
                SEQ_2GEOMETRY,
                new FunctionReturnSequenceType(Type.STRING, Cardinality.ZERO_OR_ONE, "The union geometry or the empty sequence")));
        
        FUNC.put("difference", new Func(
                "Returns the difference geometry of $geometry with $another-geometry, in GML. The " +
                "returned element must be either gml:Point, gml:Curve, gml:LineString, gml:Surface, " +
                "gml:Polygon, gml:MultiPoint, gml:MultiCurve, gml:MultiLineString or gml:MultiPolygon.",
                SEQ_2GEOMETRY,
                new FunctionReturnSequenceType(Type.STRING, Cardinality.ZERO_OR_ONE, "The difference geometry or the empty sequence")));
        
        FUNC.put("sym-difference", new Func(
                "Returns the symmetric difference geometry of $geometry with $another-geometry, in " +
                "GML. The returned element must be either gml:Point, gml:Curve, gml:LineString, " +
                "gml:Surface, gml:Polygon, gml:MultiPoint, gml:MultiCurve, gml:MultiLineString or " +
                "gml:MultiPolygon.",
                SEQ_2GEOMETRY,
                new FunctionReturnSequenceType(Type.STRING, Cardinality.ZERO_OR_ONE, "The symmetric difference geometry or the empty sequence")));

        // ########################
        // 4 Functions specific to geometry type
        // ########################

        // 4.1 GeometryCollection (2)
        FUNC.put("num-geometries", new Func(
                "Returns the number of geometries in $geometry-collection.",
                SEQ_1GEOMETRY_COLL,
                new FunctionReturnSequenceType(Type.INTEGER, Cardinality.EXACTLY_ONE, "The number of geometries")));
        
        FUNC.put("geometry-n", new Func(
                "Returns the Nth geometry in $geometry-collection, in GML.",
                new SequenceType[]{PARAM_GEOMETRY_COLL, PARAM_N},
                new FunctionReturnSequenceType(Type.STRING, Cardinality.EXACTLY_ONE, "The Nth geometry")));
        
        // 4.2 Point (4)
        FUNC.put("x", new Func(
                "Returns the x-coordinate value for $point.",
                SEQ_1POINT,
                new FunctionReturnSequenceType(Type.DOUBLE, Cardinality.EXACTLY_ONE, "The x-coordinate")));
        
        FUNC.put("y", new Func(
                "Returns the y-coordinate value for $point.",
                SEQ_1POINT,
                new FunctionReturnSequenceType(Type.DOUBLE, Cardinality.EXACTLY_ONE, "The y-coordinate")));
        
        FUNC.put("z", new Func(
                "Returns the z-coordinate value for $point, or the empty sequence.",
                SEQ_1POINT,
                new FunctionReturnSequenceType(Type.DOUBLE, Cardinality.ZERO_OR_ONE, "The z-coordinate")));
        
        FUNC.put("m", new Func(
                "Returns the m-coordinate value for $point, or the empty sequence.",
                SEQ_1POINT,
                new FunctionReturnSequenceType(Type.DOUBLE, Cardinality.ZERO_OR_ONE, "The m-coordinate")));
        
        // 4.3 Curve (5)
        FUNC.put("length", new Func(
                "Returns the length of $curve.",
                SEQ_1CURVE,
                new FunctionReturnSequenceType(Type.DOUBLE, Cardinality.EXACTLY_ONE, "The length of $curve")));
        
        FUNC.put("start-point", new Func(
                "Returns the starting point of $curve.",
                SEQ_1CURVE,
                new FunctionReturnSequenceType(Type.STRING, Cardinality.EXACTLY_ONE, "The starting point")));
        
        FUNC.put("end-point", new Func(
                "Returns the end point of $curve.",
                SEQ_1CURVE,
                new FunctionReturnSequenceType(Type.STRING, Cardinality.EXACTLY_ONE, "The end point")));
        
        FUNC.put("is-closed", new Func(
                "Returns true if the curve is closed (start point equals end point).",
                SEQ_1CURVE,
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether the curve is closed")));
        
        FUNC.put("is-ring", new Func(
                "Returns true if the curve is closed and simple (start point equals end point and " +
                "does not pass through the same point more than once.",
                SEQ_1CURVE,
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether the curve is closed and simple")));
        
        // 4.3.1 LineString, Line, LinearRing (2)
        FUNC.put("num-points", new Func(
                "Returns the number of points in the $line-string. A Line is a LineString with " +
                "exactly two points. See above for definition of LinearRing.",
                new SequenceType[]{PARAM_LINE_STRING},
                new FunctionReturnSequenceType(Type.INTEGER, Cardinality.EXACTLY_ONE, "The number of points")));
        
        FUNC.put("point-n", new Func(
                "Returns the Nth point in $line-string, as a gml:Point.",
                new SequenceType[]{PARAM_LINE_STRING, PARAM_N},
                new FunctionReturnSequenceType(Type.STRING, Cardinality.EXACTLY_ONE, "The Nth point")));
        
        // 4.4 MultiLineString (2)
        FUNC.put("is-closed", new Func(
                "Returns true if the start point = end point for each gml:LineString in $line-string.",
                SEQ_1MULTI_LINE_STRING,
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether $line-string is closed")));
        
        FUNC.put("length", new Func(
                "Returns the length of $multi-line-string which is equal to the sum of the lengths " +
                "of the component gml:LineStrings.",
                SEQ_1MULTI_LINE_STRING,
                new FunctionReturnSequenceType(Type.DOUBLE, Cardinality.EXACTLY_ONE, "The length of $multi-line-string")));
        
        // 4.5 Surface ()
        FUNC.put("area", new Func(
                "Returns the area of $surface in units of its spatial reference system.",
                SEQ_1SURFACE,
                new FunctionReturnSequenceType(Type.DOUBLE, Cardinality.EXACTLY_ONE, "The area of $surface")));
        
        FUNC.put("centroid", new Func(
                "Returns the mathematical centroid of $surface as a gml:Point. The point is not " +
                "guaranteed to be on the $surface.",
                SEQ_1SURFACE,
                new FunctionReturnSequenceType(Type.STRING, Cardinality.EXACTLY_ONE, "The centroid of $surface")));
        
        FUNC.put("point-on-surface", new Func(
                "Returns a gml:Point guaranteed to be on $surface.",
                SEQ_1SURFACE,
                new FunctionReturnSequenceType(Type.STRING, Cardinality.EXACTLY_ONE, "A point guaranteed to be on $surface")));
        
        FUNC.put("num-patches", new Func(
                "Returns the number of component polygons in $polyhedral-surface.",
                SEQ_1POLYHEDRAL_SURFACE,
                new FunctionReturnSequenceType(Type.INTEGER, Cardinality.EXACTLY_ONE, "The number of component polygons")));
        
        FUNC.put("patch-n", new Func(
                "Returns the $n-th gml:Polygon in the $polyhedral-surface.",
                new SequenceType[]{PARAM_POLYHEDRAL_SURFACE, PARAM_N},
                new FunctionReturnSequenceType(Type.STRING, Cardinality.EXACTLY_ONE, "The $n-th polygon")));
        
        FUNC.put("bounding-polygons", new Func(
                "Returns a sequence of polygons in $polyhedral-surface that bound the given " +
                "$polygon, where $polygon is any polygon in the surface.",
                new SequenceType[]{PARAM_POLYHEDRAL_SURFACE, PARAM_POLYGON},
                new FunctionReturnSequenceType(Type.STRING, Cardinality.ZERO_OR_MORE, "A sequence of bounding polygons")));
        
        FUNC.put("is-closed", new Func(
                "Returns true if the $polyhedral-surface closes on itself, and thus has no " +
                "boundary and encloses a solid.",
                SEQ_1POLYHEDRAL_SURFACE,
                new FunctionReturnSequenceType(Type.BOOLEAN, Cardinality.EXACTLY_ONE, "Whether $polyhedral-surface closes on itself")));
        
        // 4.6 Polygon (3)
        FUNC.put("exterior-ring", new Func(
                "Returns the outer ring of $polygon, in GML.",
                SEQ_1POLYGON,
                new FunctionReturnSequenceType(Type.STRING, Cardinality.EXACTLY_ONE, "The outer ring of $polygon")));
        
        FUNC.put("num-interior-ring", new Func(
                "Returns the number of interior rings in $polygon.",
                SEQ_1POLYGON,
                new FunctionReturnSequenceType(Type.INTEGER, Cardinality.EXACTLY_ONE, "The number of interior rings")));
        
        FUNC.put("interior-ring-n", new Func(
                "Returns the $n-th interior ring of $polygon, in GML.",
                new SequenceType[]{PARAM_POLYGON, PARAM_N},
                new FunctionReturnSequenceType(Type.STRING, Cardinality.EXACTLY_ONE, "The $n-th interior ring")));
        
        // 4.7 MultiSurface, MultiPolygon (3)
        FUNC.put("area", new Func(
                "Returns the area of $multi-surface in units of its spatial reference system.",
                SEQ_1MULTI_SURFACE,
                new FunctionReturnSequenceType(Type.DOUBLE, Cardinality.EXACTLY_ONE, "The area of $multi-surface")));
        
        FUNC.put("centroid", new Func(
                "Returns the mathematical centroid of $multi-surface as a gml:Point. The point is " +
                "not guaranteed to be on the $multi-surface.",
                SEQ_1MULTI_SURFACE,
                new FunctionReturnSequenceType(Type.STRING, Cardinality.EXACTLY_ONE, "The centroid of $multi-surface")));
        
        FUNC.put("point-on-surface", new Func(
                "Returns a point guaranteed to be on $multi-surface, in GML.",
                SEQ_1MULTI_SURFACE,
                new FunctionReturnSequenceType(Type.STRING, Cardinality.EXACTLY_ONE, "A point guaranteed to be on $multi-surface")));
    }

    private final static FunctionDef[] functions = new FunctionDef[FUNC.size()];
    
    static {
        for (int i = 0; i < FUNC.size(); i++) {
            functions[i] = new FunctionDef(GeoFunctions.signatures[i], GeoFunctions.class);
        }
    }

    public GeoModule(Map<String, List<? extends Object>> parameters) {
        super(functions, parameters);
    }

    public String getNamespaceURI() {
        return NAMESPACE_URI;
    }

    public String getDefaultPrefix() {
        return PREFIX;
    }

    public String getDescription() {
        return "XQuery Geo Module http://exist-db.org/xquery/geo";
    }

    public String getReleaseVersion() {
        return RELEASED_IN_VERSION;
    }
}
